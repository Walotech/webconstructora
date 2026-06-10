import { NextResponse } from 'next/server';
import { generateDesignReview, buildInvestmentPrompt } from '@/lib/ai-orchestrator';

/**
 * POST /api/ai/review
 * Genera análisis de viabilidad técnica y presupuestaria usando IA.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      prompt,
      propertyType,
      area,
      materialLevel,
      automation,
      estimatedMin,
      estimatedMax,
      location,
    } = body;

    let finalPrompt = prompt;

    // Si nos pasan los campos sueltos de la cotización, construimos el prompt estructurado
    if (!finalPrompt && propertyType && area) {
      finalPrompt = buildInvestmentPrompt({
        propertyType,
        area: Number(area),
        materialLevel,
        automation,
        estimatedMin: Number(estimatedMin),
        estimatedMax: Number(estimatedMax),
        location,
      });
    }

    if (!finalPrompt) {
      return NextResponse.json(
        { error: 'Debe proveer un prompt o los parámetros del simulador.' },
        { status: 450 }
      );
    }

    const hasGeminiKey = !!process.env.GEMINI_API_KEY;

    // Si no hay API keys configuradas en el entorno local, devolvemos un mock estático premium
    if (!hasGeminiKey) {
      console.log('Simulating AI assessment response (no GEMINI_API_KEY found)');
      const simulatedText = `### Evaluación de Viabilidad Técnica — AURA Habitats

El proyecto configurado para una **${propertyType || 'obra'}** de **${area || 450} m²** presenta una viabilidad excelente. El rango de inversión estimado de **${(estimatedMin || 1000000).toLocaleString('es-ES')}€ – ${(estimatedMax || 1300000).toLocaleString('es-ES')}€** es realista y se alinea con los estándares de construcción de alta gama actuales.

#### Recomendaciones de Materiales
1. **Piedra Tecnológica de Gran Formato:** Excelente para el revestimiento exterior continuo, ofreciendo alta resistencia y nulo mantenimiento.
2. **Carpinterías de Madera Termotratada:** Ideal para interiores y techos flotantes, aportando calidez y un comportamiento acústico óptimo.
3. **Mármol Calacatta Pulido o Travertino:** Para zonas húmedas y pavimentos principales, asegurando una estética atemporal e irrepetible.

#### Plazos y Riesgos
* **Plazo estimado:** El periodo estimado de construcción es viable, pero se sugiere contemplar 2 meses adicionales para acabados especiales y domótica.
* **Mitigación de riesgo:** El principal factor a vigilar es el suministro de materiales importados de gran formato; se recomienda realizar acopios tempranos en obra.`;

      return NextResponse.json({
        recommendation: simulatedText,
        provider: 'gemini', // Simulado
      });
    }

    // Llamar al orquestador real (Gemini + OpenAI Fallback)
    const result = await generateDesignReview(finalPrompt);

    return NextResponse.json({
      recommendation: result.text,
      provider: result.provider,
    });
  } catch (err: any) {
    console.error('Error en POST /api/ai/review:', err);
    return NextResponse.json(
      { error: err.message || 'Error procesando la consulta de IA.' },
      { status: 500 }
    );
  }
}
