/// <reference types="vite/client" />

// Build time envs, string replaced during build
interface ImportMetaEnv {
  readonly VITE_SOCKET_IO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
