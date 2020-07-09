/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      SESSION_MAX_AGE: string;
      DB_URI: string;
    }
  }
}

export {};
