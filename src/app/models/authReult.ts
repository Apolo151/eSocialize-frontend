export interface AuthResult {
    idToken: string;
    expiresIn: number;
    refreshToken?: string;
  }