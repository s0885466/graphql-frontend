export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      BACKEND_URI: string;
    }
  }
}
