import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Ganti dengan secret kamu
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Masa berlaku token, misalnya 1 jam

interface JwtPayload {
  id: string; // Contoh payload, tambahkan sesuai kebutuhan
  email: string;
}

/**
 * Generate a JWT token
 * @param payload - Data yang akan dimasukkan ke dalam token
 * @returns JWT token sebagai string
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify and decode a JWT token
 * @param token - Token yang akan diverifikasi
 * @returns Decoded payload jika token valid, atau error jika tidak valid
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
 * @param token - Token yang akan di-decode
 * @returns Payload dari token, tetapi belum diverifikasi
 */
export const decodeToken = (token: string): null | JwtPayload => {
  const decoded = jwt.decode(token);
  return decoded as JwtPayload | null;
};
