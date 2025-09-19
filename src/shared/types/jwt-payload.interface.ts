export interface JwtPayload {
  id: string;
  email: string;
  role: string;
  tokenVersion: number;
  iat?: number;
  exp?: number; 
}