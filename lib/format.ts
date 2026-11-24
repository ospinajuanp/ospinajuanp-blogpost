const SHORT_DATE = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
});

const LONG_DATE = new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
});

/**
 * Convierte la fecha cruda del frontmatter (YYYY-MM-DD) en texto legible
 * en español. Si la fecha no es válida devuelve el valor original.
 */
export function formatDate(date: string, style: 'short' | 'long' = 'short'): string {
    if (!date) {
        return '';
    }

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return style === 'long' ? LONG_DATE.format(parsed) : SHORT_DATE.format(parsed);
}

/**
 * Los tags se guardan como slugs ("proceso-de-seleccion") pero se muestran
 * como etiquetas legibles ("proceso de seleccion").
 */
export function formatTag(tag: string): string {
    return tag.replace(/-/g, ' ').trim();
}
