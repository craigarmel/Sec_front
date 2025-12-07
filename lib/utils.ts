import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import sanitizeHtml from "sanitize-html"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitise une chaîne HTML pour prévenir les attaques XSS
 * @param html - La chaîne HTML à sanitizer
 * @param options - Options personnalisées pour la sanitisation (optionnel)
 * @returns La chaîne HTML sanitizée
 */
export function sanitizeInput(
  html: string,
  options?: sanitizeHtml.IOptions
): string {
  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [], // Par défaut, on supprime tous les tags HTML
    allowedAttributes: {},
    allowedSchemes: [],
  }

  const sanitizeOptions = options || defaultOptions

  // Si aucune option n'est fournie, on utilise un mode strict qui supprime tout HTML
  if (!options) {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    })
  }

  return sanitizeHtml(html, sanitizeOptions)
}

/**
 * Sanitise une chaîne de texte simple (supprime tout HTML)
 * @param text - Le texte à sanitizer
 * @returns Le texte sanitizé sans HTML
 */
export function sanitizeText(text: string): string {
  return sanitizeInput(text)
}

/**
 * Sanitise une chaîne HTML avec des tags basiques autorisés (pour les commentaires)
 * @param html - La chaîne HTML à sanitizer
 * @returns La chaîne HTML sanitizée avec tags basiques autorisés
 */
export function sanitizeComment(html: string): string {
  return sanitizeInput(html, {
    allowedTags: ["p", "br", "strong", "em", "u", "a"],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https"],
  })
}

/**
 * Format a date string or Date object to a localized French date string
 * Returns empty string if date is invalid
 */
export function formatDate(dateString: string | Date | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return "";
  
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Vérifier si la date est valide
  if (isNaN(date.getTime())) {
    return "";
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  return date.toLocaleDateString("fr-FR", options || defaultOptions);
}

/**
 * Format a date string or Date object to a localized French date and time string
 * Returns empty string if date is invalid
 */
export function formatDateTime(dateString: string | Date | null | undefined, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return "";
  
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Vérifier si la date est valide
  if (isNaN(date.getTime())) {
    return "";
  }
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  
  return date.toLocaleDateString("fr-FR", options || defaultOptions);
}
