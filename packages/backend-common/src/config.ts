import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(__dirname, '../../../.env');

console.log('Looking for .env at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env:', result.error);
} else {
  console.log('Loaded env vars:', Object.keys(result.parsed || {}));
}

console.log('JWT_SECRET value:', process.env.JWT_SECRET);

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env file');
}