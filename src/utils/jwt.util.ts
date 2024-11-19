import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

interface JwtPayload {
  id: string;
  email: string;
}

/**
 * Generate a JWT token
 * @param payload - Payload to be signed
 * @returns JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token
 * @returns Decoded payload if the token is valid
 */
export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload; // Cast ke tipe payload
  } catch {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Decode a JWT token without verifying it
 * @param token - JWT token
 * @returns Decoded payload if the token is valid
 */
export const decodeToken = (token: string): null | JwtPayload => {
  const decoded = jwt.decode(token);
  return decoded as JwtPayload | null;
};
