import { DomainError } from "src/core/errors/domain.errors";
import { loginDto } from "../auth.types";


export class AuthRegisterError extends DomainError {
  constructor(
    fields?: { referralCode?: string[] },
    details?: { referralCode?: string },

  ) {
    super({
      code: 'AUTH_REGISTER_ERROR',
      message: 'Registration error',
      statusCode: 400,
      fields: fields ?? { referralCode: ['Registration error'] },
      details,
    });
  }
}

export class AuthCredentialsError extends DomainError {
  constructor(
    fields?: { email?: string[] },
    details?: { email?: string },

  ) {
    super({
      code: 'AUTH_CREDENTIALS_ERROR',
      message: 'Invalid credentials',
      statusCode: 400,
      fields: fields ?? { email: ['Invalid email'] },
      details,
    });
  }
}


// Erreur pour email invalide (mauvais format)
export class InvalidEmailFormatError extends DomainError {
  constructor(
    fields?: { email?: string[] },
    details?: { email?: string },
  ) {
    super({
      code: 'INVALID_EMAIL_FORMAT',
      message: 'Invalid email format',
      statusCode: 400,
      fields: fields ?? { email: ['Invalid email format'] },
      details,
    });
  }
}

// Erreur pour mot de passe trop faible
export class WeakPasswordError extends DomainError {
  constructor(
    fields?: { password?: string[] },
    details?: { password?: string },
  ) {
    super({
      code: 'WEAK_PASSWORD',
      message: 'Password is too weak',
      statusCode: 400,
      fields: fields ?? { password: ['Password is too weak'] },
      details,
    });
  }
}

// Erreur pour mot de passe incorrect
export class InvalidPasswordError extends DomainError {
  constructor(
    fields?: { password?: string[] },
    details?: { password?: string },
  ) {
    super({
      code: 'INVALID_PASSWORD',
      message: 'Incorrect password',
      statusCode: 400,
      fields: fields ?? { password: ['Incorrect password'] },
      details,
    });
  }
}