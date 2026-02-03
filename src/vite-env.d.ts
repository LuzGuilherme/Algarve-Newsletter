/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILERLITE_API_KEY: string;
  readonly VITE_MAILERLITE_GROUP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
