import { DomainError } from "src/core/errors/domain.errors";
import { loginDto } from "../auth.types";


// export class EmailNotFoundsError extends DomainError {
//     // dpublic readonly fields: Record<string, string[]>;
//     // dpublic readonly details: Record<string, unknown>;

//     constructor(
//         fields?: any,
//         details?: any,
// ) {
//         super({
//             code: 'EMAIL_ALREADY_IN_USE',
//             message: 'Email already in use',
//             statusCode: 400,
//             fields: { email: ['Email already in use'] },
//             details

//         })
//         // this.fields = params.fields;
//         // this.details = params.details;
//         // Object.setPrototypeOf(this, new.target.prototype);
//     }

// }

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
      fields: fields ?? { email: ['Invalid email or password'] },
      details,
    });
  }
}