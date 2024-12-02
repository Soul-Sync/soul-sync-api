import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Gunakan string seperti '1h' atau '3600'

interface JwtPayload {
  id: string;
  email: string;
  exp?: number;
}

/**
 * Generate a JWT token
 * @param payload - Payload to be signed
 * @returns JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  // Cek jika payload.exp ada dan merupakan angka
  const expiresIn = payload.exp ? payload.exp : JWT_EXPIRES_IN;
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token
 * @returns Decoded payload if the token is valid
 * @throws Error if the token is invalid or expired
 */
export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload; // Cast ke tipe payload
  } catch (error) {
    // Throw a more descriptive error
    throw new Error(`Invalid or expired token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Decode a JWT token without verifying it
 * @param token - JWT token
 * @returns Decoded payload if the token is valid, null otherwise
 */
export const decodeToken = (token: string): null | JwtPayload => {
  const decoded = jwt.decode(token);
  return decoded as JwtPayload | null;
};
