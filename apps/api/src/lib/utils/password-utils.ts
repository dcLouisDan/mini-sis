import bcrypt from "bcrypt";

const HASH_ROUNDS = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, HASH_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
