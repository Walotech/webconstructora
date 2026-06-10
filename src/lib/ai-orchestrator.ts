import { GoogleGenAI } from '@google/genai';

// ─── Inicializar proveedores de IA ─────────────────────────────────────────────

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// OpenAI es OPCIONAL — solo se instancia si la variable de entorno está configurada
let openai: import('openai').default | null = null;
if (process.env.OPENAI_API_KEY) {
  // Importación dinámica para evitar error si el paquete no tiene la key
  import('openai').then(({ default: OpenAI }) => {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  });
}

// ─── Orquestador Principal ──────────────────────────────────────────────────────

/**
 * Genera un análisis de diseño o revisión de presupuesto usando IA.
 *
 * Flujo:
 * 1. Intenta con Google Gemini (gemini-2.5-flash) — proveedor principal
 * 2. Si Gemini falla Y hay OPENAI_API_KEY configurada → intenta con OpenAI (gpt-4o-mini)
 * 3. Si ambos fallan → lanza error controlado
 *
 * @param prompt   Texto del prompt con el contexto del proyecto/presupuesto
 * @returns        Texto de la recomendación generada
 */
export async function generateDesignReview(prompt: string): Promise<{
  text: string;
  provider: 'gemini' | 'openai';
}> {
  // ── Intento 1: Google Gemini ─────────────────────────────────────────────────
  try {
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text ?? '';
    if (!text) throw new Error('Respuesta vacía de Gemini');

    return { text, provider: 'gemini' };

  } catch (geminiError) {
    console.error('[AI Orchestrator] Gemini falló:', geminiError);

    // ── Intento 2: OpenAI Fallback (solo si está configurado) ─────────────────
    if (openai) {
      try {
        console.log('[AI Orchestrator] Cambiando a OpenAI como fallback...');

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto asesor de arquitectura de lujo y presupuestos de construcción premium. Responde siempre en español, de manera profesional y detallada.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 1024,
        });

        const text = completion.choices[0]?.message?.content ?? '';
        if (!text) throw new Error('Respuesta vacía de OpenAI');

        return { text, provider: 'openai' };

      } catch (openaiError) {
        console.error('[AI Orchestrator] OpenAI también falló:', openaiError);
      }
    } else {
      console.log('[AI Orchestrator] OpenAI no configurado — sin fallback disponible.');
    }

    // Ambos proveedores fallaron
    throw new Error(
      'El servicio de IA no está disponible en este momento. Por favor intenta de nuevo en unos minutos.'
    );
  }
}

/**
 * Genera un prompt estructurado para el Planificador de Inversión.
 * Se usa para formatear la solicitud antes de enviarla al orquestador.
 */
export function buildInvestmentPrompt(params: {
  propertyType: string;
  area: number;
  materialLevel: string;
  automation: string;
  estimatedMin: number;
  estimatedMax: number;
  location?: string;
}): string {
  return `Eres un consultor senior de arquitectura de lujo de AURA Habitats.

Un cliente ha usado nuestro Planificador de Inversión y ha configurado lo siguiente:
- Tipo de Propiedad: ${params.propertyType}
- Superficie: ${params.area} m²
- Nivel de Acabados: ${params.materialLevel}
- Domótica: ${params.automation}
- Presupuesto estimado: ${params.estimatedMin.toLocaleString('es-ES')}€ – ${params.estimatedMax.toLocaleString('es-ES')}€
${params.location ? `- Ubicación preferida: ${params.location}` : ''}

Por favor proporciona:
1. Una evaluación breve de viabilidad técnica de este proyecto (2-3 oraciones)
2. 3 recomendaciones específicas de materiales de alta gama para este tipo de proyecto
3. Un consejo sobre el timing óptimo de construcción
4. Una advertencia sobre el factor de riesgo más importante a considerar

Responde en español, en un tono profesional y elegante acorde con una firma de arquitectura premium. Máximo 300 palabras.`;
}
