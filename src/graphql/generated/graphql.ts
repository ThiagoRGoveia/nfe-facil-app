/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type BatchProcess = {
  __typename?: "BatchProcess";
  csvResults?: Maybe<Scalars["String"]["output"]>;
  excelResults?: Maybe<Scalars["String"]["output"]>;
  files: Array<FileToProcess>;
  id: Scalars["String"]["output"];
  jsonResults?: Maybe<Scalars["String"]["output"]>;
  processedFiles: Scalars["Float"]["output"];
  status: BatchStatus;
  template: Template;
  totalFiles: Scalars["Float"]["output"];
  user: User;
};

/** The status of a batch process */
export type BatchStatus =
  | "CANCELLED"
  | "COMPLETED"
  | "CREATED"
  | "FAILED"
  | "PROCESSING"
  | "%future added value";

export type CreateBatchInput = {
  files?: InputMaybe<Array<Scalars["Upload"]["input"]>>;
  templateId: Scalars["String"]["input"];
};

export type CreateTemplateDto = {
  isPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  metadata: Scalars["JSON"]["input"];
  name: Scalars["String"]["input"];
  outputFormat: Scalars["String"]["input"];
  processCode: Scalars["String"]["input"];
};

export type CreateUserDto = {
  credits?: Scalars["Float"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  paymentExternalId?: InputMaybe<Scalars["String"]["input"]>;
  role?: UserRole;
  surname: Scalars["String"]["input"];
};

export type CreateWebhookDto = {
  authConfig?: InputMaybe<Scalars["JSON"]["input"]>;
  authType: WebhookAuthType;
  events: Array<WebhookEvent>;
  headers?: InputMaybe<Scalars["JSON"]["input"]>;
  maxRetries?: InputMaybe<Scalars["Float"]["input"]>;
  name: Scalars["String"]["input"];
  timeout?: InputMaybe<Scalars["Float"]["input"]>;
  url: Scalars["String"]["input"];
};

/** The status of a file process */
export type FileProcessStatus =
  | "COMPLETED"
  | "FAILED"
  | "PENDING"
  | "PROCESSING"
  | "%future added value";

export type FileToProcess = {
  __typename?: "FileToProcess";
  batchProcess: BatchProcess;
  error?: Maybe<Scalars["String"]["output"]>;
  fileName: Scalars["String"]["output"];
  filePath?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  notifiedAt?: Maybe<Scalars["DateTime"]["output"]>;
  result?: Maybe<Scalars["JSON"]["output"]>;
  status: FileProcessStatus;
  template: Template;
  user: User;
};

export type Filter = {
  field?: InputMaybe<Scalars["String"]["input"]>;
  greaterThan?: InputMaybe<Scalars["String"]["input"]>;
  ilike?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lessThan?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<Scalars["Boolean"]["input"]>;
  range?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type Filters = {
  filters?: InputMaybe<Array<Filter>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createTemplate: Template;
  createUser: User;
  createWebhook: Webhook;
  deleteTemplate: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  deleteWebhook: Scalars["Boolean"]["output"];
  processBatchSync: BatchProcess;
  refreshUserClientSecret: User;
  updateTemplate: Template;
  updateUser: User;
  updateUserPassword: Scalars["Boolean"]["output"];
  updateWebhook: Webhook;
};

export type MutationCreateTemplateArgs = {
  input: CreateTemplateDto;
};

export type MutationCreateUserArgs = {
  input: CreateUserDto;
};

export type MutationCreateWebhookArgs = {
  input: CreateWebhookDto;
};

export type MutationDeleteTemplateArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteWebhookArgs = {
  id: Scalars["String"]["input"];
};

export type MutationProcessBatchSyncArgs = {
  input: CreateBatchInput;
};

export type MutationRefreshUserClientSecretArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUpdateTemplateArgs = {
  id: Scalars["String"]["input"];
  input: UpdateTemplateDto;
};

export type MutationUpdateUserArgs = {
  id: Scalars["String"]["input"];
  input: UpdateUserDto;
};

export type MutationUpdateUserPasswordArgs = {
  id: Scalars["String"]["input"];
  input: UpdatePasswordDto;
};

export type MutationUpdateWebhookArgs = {
  id: Scalars["String"]["input"];
  input: UpdateWebhookDto;
};

export type PaginatedBatchProcessResponse = {
  __typename?: "PaginatedBatchProcessResponse";
  items: Array<BatchProcess>;
  page: Scalars["Float"]["output"];
  pageSize: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
  totalPages: Scalars["Float"]["output"];
};

export type PaginatedTemplateResponse = {
  __typename?: "PaginatedTemplateResponse";
  items: Array<Template>;
  page: Scalars["Float"]["output"];
  pageSize: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
  totalPages: Scalars["Float"]["output"];
};

export type PaginatedUserResponse = {
  __typename?: "PaginatedUserResponse";
  items: Array<User>;
  page: Scalars["Float"]["output"];
  pageSize: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
  totalPages: Scalars["Float"]["output"];
};

export type PaginatedWebhookResponse = {
  __typename?: "PaginatedWebhookResponse";
  items: Array<Webhook>;
  page: Scalars["Float"]["output"];
  pageSize: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
  totalPages: Scalars["Float"]["output"];
};

export type Pagination = {
  page?: Scalars["Float"]["input"];
  pageSize?: Scalars["Float"]["input"];
};

export type Query = {
  __typename?: "Query";
  findAllBatchProcesses: PaginatedBatchProcessResponse;
  findAllTemplates: PaginatedTemplateResponse;
  findAllUsers: PaginatedUserResponse;
  findAllWebhooks: PaginatedWebhookResponse;
  findBatchProcessById?: Maybe<BatchProcess>;
  findTemplateById?: Maybe<Template>;
  findUserById?: Maybe<User>;
  findWebhookById?: Maybe<Webhook>;
  getUser?: Maybe<User>;
};

export type QueryFindAllBatchProcessesArgs = {
  filters?: InputMaybe<Filters>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Sort>;
};

export type QueryFindAllTemplatesArgs = {
  filters?: InputMaybe<Filters>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Sort>;
};

export type QueryFindAllUsersArgs = {
  filters?: InputMaybe<Filters>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Sort>;
};

export type QueryFindAllWebhooksArgs = {
  filters?: InputMaybe<Filters>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Sort>;
};

export type QueryFindBatchProcessByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryFindTemplateByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryFindUserByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryFindWebhookByIdArgs = {
  id: Scalars["String"]["input"];
};

export type Sort = {
  direction: Scalars["String"]["input"];
  field: Scalars["String"]["input"];
};

export type Template = {
  __typename?: "Template";
  id: Scalars["String"]["output"];
  isPublic: Scalars["Boolean"]["output"];
  metadata: Scalars["JSON"]["output"];
  name: Scalars["String"]["output"];
  outputFormat: Scalars["String"]["output"];
  processCode: Scalars["String"]["output"];
  user: User;
};

export type UpdatePasswordDto = {
  currentPassword: Scalars["String"]["input"];
  newPassword: Scalars["String"]["input"];
};

export type UpdateTemplateDto = {
  metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  outputFormat?: InputMaybe<Scalars["String"]["input"]>;
  processCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserDto = {
  credits?: InputMaybe<Scalars["Float"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  paymentExternalId?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<UserRole>;
  surname?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateWebhookDto = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>;
  authConfig?: InputMaybe<Scalars["JSON"]["input"]>;
  authType?: InputMaybe<WebhookAuthType>;
  events?: InputMaybe<Array<WebhookEvent>>;
  headers?: InputMaybe<Scalars["JSON"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  auth0Id: Scalars["String"]["output"];
  clientId: Scalars["String"]["output"];
  clientSecret: Scalars["String"]["output"];
  credits: Scalars["Float"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  isSocial: Scalars["Boolean"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  paymentExternalId?: Maybe<Scalars["String"]["output"]>;
  role: UserRole;
  surname?: Maybe<Scalars["String"]["output"]>;
};

export type UserRole = "ADMIN" | "CUSTOMER" | "%future added value";

export type Webhook = {
  __typename?: "Webhook";
  authType: WebhookAuthType;
  createdAt: Scalars["DateTime"]["output"];
  encryptedConfig?: Maybe<Scalars["String"]["output"]>;
  events: Array<WebhookEvent>;
  headers: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  maxRetries: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
  secret?: Maybe<Scalars["String"]["output"]>;
  status: WebhookStatus;
  timeout: Scalars["Float"]["output"];
  url: Scalars["String"]["output"];
  user: User;
};

export type WebhookAuthType =
  | "BASIC"
  | "NONE"
  | "OAUTH2"
  | "%future added value";

export type WebhookEvent =
  | "BATCH_FINISHED"
  | "DOCUMENT_FAILED"
  | "DOCUMENT_PROCESSED"
  | "%future added value";

export type WebhookStatus = "ACTIVE" | "INACTIVE" | "%future added value";

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser?: {
    __typename?: "User";
    id: string;
    email?: string | null;
    name?: string | null;
    surname?: string | null;
    credits: number;
  } | null;
};

export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "surname" } },
                { kind: "Field", name: { kind: "Name", value: "credits" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
