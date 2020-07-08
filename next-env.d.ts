/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      SESSION_MAX_AGE: number;
      DB_URI: string;
      BCRYPT_SALT_ROUNDS: number;
    }
  }
}

export {};
