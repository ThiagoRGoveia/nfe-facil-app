import { WebhookEvent } from "@/graphql/generated/graphql";

export interface WebhookItem {
  id: string;
  name: string;
  url: string;
  status: string;
  authType: string;
  events: string[];
  createdAt: string;
  headers?: Record<string, string>;
  authConfig?: AuthConfig;
}

export interface TableOptions {
  page: number;
  itemsPerPage: number;
  sortBy: Array<{
    key: string;
    order: 'asc' | 'desc';
  }>;
}

// Auth config interfaces
export interface BasicAuthConfig {
  username: string;
  password: string;
}

export interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
}

export type AuthConfig = BasicAuthConfig | OAuth2Config | undefined;

export type WebhookFormValues = WebhookItem & {
  authConfig?: AuthConfig;
};

export type EditWebhookFormValues = WebhookFormValues & {
  active: boolean;
};

export const webhookEvents: { value: WebhookEvent, label: string }[] = [
  { value: 'BATCH_FINISHED', label: 'Batch Finalizado' },
  { value: 'DOCUMENT_FAILED', label: 'Documento Falhou' },
  { value: 'DOCUMENT_PROCESSED', label: 'Documento Processado' },
];

export const authTypes = [
  { value: 'NONE', label: 'Nenhum' },
  { value: 'BASIC', label: 'Básica' },
  { value: 'OAUTH2', label: 'OAuth 2.0' },
];

export function isBasicAuthConfig(authConfig: AuthConfig): authConfig is BasicAuthConfig {
  return authConfig !== undefined && 'username' in authConfig && 'password' in authConfig;
}

export function isOAuth2Config(authConfig: AuthConfig): authConfig is OAuth2Config {
  return authConfig !== undefined && 'clientId' in authConfig && 'clientSecret' in authConfig && 'tokenUrl' in authConfig;
} 