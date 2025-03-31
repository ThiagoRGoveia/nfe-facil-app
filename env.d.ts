/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
  readonly VITE_API_DOC_URL: string
  readonly VITE_GRAPHQL_URL: string
  readonly VITE_NFE_TEMPLATE: string
  readonly VITE_AUTH_URL: string
  readonly VITE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
