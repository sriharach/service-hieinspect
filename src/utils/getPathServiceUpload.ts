import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

/**
 * Get path prefix service
 * @returns {string uploadDir: string serivcePath: string} - ชื่อตัวแปรของ path
 */
export const getPathServiceUpload = (): {
  uploadDir: string;
  serivcePath: string;
} => {
  const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');
  const serivcePath = process.env.SERVICE_API;
  return { uploadDir, serivcePath };
};
