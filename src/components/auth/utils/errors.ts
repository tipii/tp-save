import { z } from 'zod';

// Custom error types for better error handling
export const RegisterError = z.enum([
  'INVALID_EMAIL',
  'WEAK_PASSWORD',
  'USER_EXISTS',
  'TERMS_NOT_ACCEPTED',
  'RATE_LIMITED',
  'REGISTRATION_FAILED',
  'INTERNAL_ERROR',
]);

/**
 * Maps error messages to comprehensive French messages
 * @param errorMessage - The error message to translate
 * @returns Comprehensive French error message
 */
export function getComprehensiveFrenchErrorMessage(errorMessage: string): string {
  const errorMap: Record<string, string> = {
    // Better Auth specific errors
    'User already exists':
      'Un compte avec cette adresse e-mail existe déjà. Veuillez vous connecter ou utiliser une autre adresse e-mail.',
    'Invalid email':
      "L'adresse e-mail fournie n'est pas valide. Veuillez vérifier le format de votre adresse e-mail.",
    'Password too weak':
      'Le mot de passe choisi est trop faible. Il doit contenir au moins 8 caractères avec des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.',
    'Invalid password':
      "Le mot de passe ne respecte pas les critères de sécurité requis. Assurez-vous qu'il contient au moins 8 caractères.",
    'Rate limit exceeded':
      "Trop de tentatives d'inscription. Veuillez patienter quelques minutes avant de réessayer.",
    'Email verification required':
      'Un e-mail de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation.',
    'Invalid email or password':
      "L'adresse e-mail ou le mot de passe est incorrect. Veuillez vérifier vos identifiants et réessayer.",
    'Account not verified':
      "Votre compte n'est pas encore vérifié. Veuillez vérifier votre boîte e-mail et cliquer sur le lien de confirmation.",
    'Account is banned':
      "Votre compte a été suspendu. Veuillez contacter notre support client pour plus d'informations.",
    'Account is locked':
      'Votre compte a été temporairement verrouillé pour des raisons de sécurité. Veuillez réessayer dans quelques minutes.',

    // Custom error types
    INVALID_EMAIL:
      "L'adresse e-mail fournie n'est pas valide. Veuillez vérifier le format de votre adresse e-mail.",
    WEAK_PASSWORD:
      'Le mot de passe choisi est trop faible. Il doit contenir au moins 8 caractères avec une combinaison de lettres, chiffres et caractères spéciaux.',
    USER_EXISTS:
      'Un compte avec cette adresse e-mail existe déjà. Veuillez vous connecter ou utiliser une autre adresse e-mail.',
    TERMS_NOT_ACCEPTED: "Vous devez accepter les conditions d'utilisation pour créer votre compte.",
    RATE_LIMITED:
      "Trop de tentatives d'inscription. Veuillez patienter quelques minutes avant de réessayer.",
    REGISTRATION_FAILED:
      'Échec de la création du compte. Veuillez vérifier vos informations et réessayer.',
    LOGIN_FAILED: 'Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.',
    INTERNAL_ERROR:
      "Une erreur technique s'est produite. Veuillez réessayer dans quelques instants ou contacter le support si le problème persiste.",
    INVALID_CREDENTIALS:
      "L'adresse e-mail ou le mot de passe est incorrect. Veuillez vérifier vos identifiants et réessayer.",
    ACCOUNT_NOT_VERIFIED:
      "Votre compte n'est pas encore vérifié. Veuillez vérifier votre boîte e-mail et cliquer sur le lien de confirmation.",
    ACCOUNT_SUSPENDED:
      "Votre compte a été suspendu. Veuillez contacter notre support client pour plus d'informations.",

    // Network and connectivity errors
    'Network error':
      'Erreur de connexion réseau. Veuillez vérifier votre connexion internet et réessayer.',
    'Connection timeout':
      'La connexion a expiré. Veuillez vérifier votre connexion internet et réessayer.',
    'Server error':
      'Erreur du serveur. Nos équipes techniques ont été notifiées. Veuillez réessayer dans quelques instants.',

    // Validation errors
    'Invalid phone number':
      "Le numéro de téléphone fourni n'est pas valide. Veuillez vérifier le format.",
    'Invalid name':
      'Le nom fourni contient des caractères non autorisés. Veuillez utiliser uniquement des lettres.',
    'Missing required field':
      "Certains champs obligatoires n'ont pas été renseignés. Veuillez compléter tous les champs marqués d'un astérisque.",

    // Session and authentication errors
    'Session expired': 'Votre session a expiré. Veuillez vous reconnecter.',
    'Invalid session': 'Session invalide. Veuillez vous reconnecter.',
    Unauthorized: "Vous n'êtes pas autorisé à accéder à cette ressource. Veuillez vous connecter.",
  };

  // Check for exact matches first
  if (errorMap[errorMessage]) {
    return errorMap[errorMessage];
  }

  // Check for partial matches (case-insensitive)
  const lowerErrorMessage = errorMessage.toLowerCase();
  for (const [key, value] of Object.entries(errorMap)) {
    if (
      lowerErrorMessage.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerErrorMessage)
    ) {
      return value;
    }
  }

  // Default message for unknown errors
  return "Une erreur inattendue s'est produite. Veuillez vérifier vos informations et réessayer. Si le problème persiste, contactez notre support client.";
}
