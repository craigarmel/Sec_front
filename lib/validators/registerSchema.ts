/**
 * Registration form validation schema
 * Enforces strong password requirements:
 * - Minimum 12 characters
 * - At least 3 of: uppercase, lowercase, digits, special characters
 */

import { z } from 'zod';

/**
 * Password validation function
 * Checks for at least 3 of the 4 criteria:
 * - Uppercase letters
 * - Lowercase letters
 * - Digits
 * - Special characters
 */
function validatePasswordStrength(password: string): boolean {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const criteriaCount = [
    hasUpperCase,
    hasLowerCase,
    hasDigits,
    hasSpecial,
  ].filter(Boolean).length;

  return criteriaCount >= 3;
}

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères')
      .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
    email: z
      .string()
      .min(1, 'L\'email est requis')
      .email('Format d\'email invalide')
      .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
    password: z
      .string()
      .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
      .refine(
        validatePasswordStrength,
        'Le mot de passe doit contenir au moins 3 des critères suivants : majuscules, minuscules, chiffres, caractères spéciaux'
      ),
    confirmPassword: z.string().min(1, 'La confirmation du mot de passe est requise'),
    consent: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Vous devez accepter les conditions d\'utilisation',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
