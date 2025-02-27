/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type BasicAuthConfigInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type BatchProcess = {
  __typename?: 'BatchProcess';
  createdAt: Scalars['DateTime']['output'];
  csvResults?: Maybe<Scalars['String']['output']>;
  excelResults?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jsonResults?: Maybe<Scalars['String']['output']>;
  processedFiles: Scalars['Float']['output'];
  requestedFormats: Array<Scalars['String']['output']>;
  status: BatchStatus;
  template: Template;
  totalFiles: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

/** The status of a batch process */
export type BatchStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'CREATED'
  | 'FAILED'
  | 'PROCESSING'
  | '%future added value';

export type CreateBatchInput = {
  files?: InputMaybe<Array<Scalars['Upload']['input']>>;
  outputFormats?: InputMaybe<Array<FileFormat>>;
  templateId: Scalars['String']['input'];
};

export type CreateTemplateDto = {
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  metadata: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  outputFormat: Scalars['String']['input'];
  processCode: Scalars['String']['input'];
};

export type CreateUserDto = {
  credits?: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  paymentExternalId?: InputMaybe<Scalars['String']['input']>;
  role?: UserRole;
  surname: Scalars['String']['input'];
};

export type CreateWebhookDto = {
  authConfig?: InputMaybe<Array<BasicAuthConfigInput>>;
  authType: WebhookAuthType;
  events: Array<WebhookEvent>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  maxRetries?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  timeout?: InputMaybe<Scalars['Float']['input']>;
  url: Scalars['String']['input'];
};

/** The format of the file */
export type FileFormat =
  | 'CSV'
  | 'JSON'
  | 'XLSX'
  | '%future added value';

/** The status of a file process */
export type FileProcessStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'PROCESSING'
  | '%future added value';

export type FileToProcess = {
  __typename?: 'FileToProcess';
  batchProcess: BatchProcess;
  createdAt: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  notifiedAt?: Maybe<Scalars['DateTime']['output']>;
  result?: Maybe<Scalars['JSON']['output']>;
  status: FileProcessStatus;
  template: Template;
  user: User;
};

export type Filter = {
  field?: InputMaybe<Scalars['String']['input']>;
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lessThan?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<Scalars['Boolean']['input']>;
  range?: InputMaybe<Array<Scalars['String']['input']>>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Filters = {
  filters?: InputMaybe<Array<Filter>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTemplate: Template;
  createUser: User;
  createWebhook: Webhook;
  deleteTemplate: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteWebhook: Scalars['Boolean']['output'];
  processBatchSync: BatchProcess;
  publicProcessBatchSync: PublicSyncProcessResponse;
  refreshUserClientSecret: User;
  updateTemplate: Template;
  updateUser: User;
  updateUserPassword: Scalars['Boolean']['output'];
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
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteWebhookArgs = {
  id: Scalars['String']['input'];
};


export type MutationProcessBatchSyncArgs = {
  input: CreateBatchInput;
};


export type MutationPublicProcessBatchSyncArgs = {
  input: CreateBatchInput;
};


export type MutationRefreshUserClientSecretArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTemplateArgs = {
  id: Scalars['String']['input'];
  input: UpdateTemplateDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserDto;
};


export type MutationUpdateUserPasswordArgs = {
  id: Scalars['String']['input'];
  input: UpdatePasswordDto;
};


export type MutationUpdateWebhookArgs = {
  id: Scalars['String']['input'];
  input: UpdateWebhookDto;
};

export type PaginatedBatchProcessResponse = {
  __typename?: 'PaginatedBatchProcessResponse';
  items: Array<BatchProcess>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginatedFileToProcessResponse = {
  __typename?: 'PaginatedFileToProcessResponse';
  items: Array<FileToProcess>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginatedTemplateResponse = {
  __typename?: 'PaginatedTemplateResponse';
  items: Array<Template>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginatedUserResponse = {
  __typename?: 'PaginatedUserResponse';
  items: Array<User>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginatedWebhookResponse = {
  __typename?: 'PaginatedWebhookResponse';
  items: Array<Webhook>;
  page: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Pagination = {
  page?: Scalars['Float']['input'];
  pageSize?: Scalars['Float']['input'];
};

export type PublicSyncProcessResponse = {
  __typename?: 'PublicSyncProcessResponse';
  /** Base64 encoded CSV data */
  csv?: Maybe<Scalars['String']['output']>;
  /** Base64 encoded Excel data */
  excel?: Maybe<Scalars['String']['output']>;
  /** Base64 encoded JSON data */
  json?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findAllBatchProcesses: PaginatedBatchProcessResponse;
  findAllFiles: PaginatedFileToProcessResponse;
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


export type QueryFindAllFilesArgs = {
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
  id: Scalars['String']['input'];
};


export type QueryFindTemplateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindWebhookByIdArgs = {
  id: Scalars['String']['input'];
};

export type Sort = {
  direction: Scalars['String']['input'];
  field: Scalars['String']['input'];
};

export type Template = {
  __typename?: 'Template';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  metadata: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  outputFormat: Scalars['String']['output'];
  processCode: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UpdatePasswordDto = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateTemplateDto = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  outputFormat?: InputMaybe<Scalars['String']['input']>;
  processCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  credits?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentExternalId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWebhookDto = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  authConfig?: InputMaybe<Scalars['JSON']['input']>;
  authType?: InputMaybe<WebhookAuthType>;
  events?: InputMaybe<Array<WebhookEvent>>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  auth0Id: Scalars['String']['output'];
  clientId: Scalars['String']['output'];
  clientSecret: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  credits: Scalars['Float']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isSocial: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  paymentExternalId?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  surname?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserRole =
  | 'ADMIN'
  | 'CUSTOMER'
  | '%future added value';

export type Webhook = {
  __typename?: 'Webhook';
  authType: WebhookAuthType;
  createdAt: Scalars['DateTime']['output'];
  events: Array<WebhookEvent>;
  headers: Scalars['String']['output'];
  id: Scalars['String']['output'];
  maxRetries: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  secret?: Maybe<Scalars['String']['output']>;
  status: WebhookStatus;
  timeout: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user: User;
};

export type WebhookAuthType =
  | 'BASIC'
  | 'NONE'
  | 'OAUTH2'
  | '%future added value';

export type WebhookEvent =
  | 'BATCH_FINISHED'
  | 'DOCUMENT_FAILED'
  | 'DOCUMENT_PROCESSED'
  | '%future added value';

export type WebhookStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | '%future added value';

export type FindAllBatchProcessesQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  filters?: InputMaybe<Filters>;
  sort?: InputMaybe<Sort>;
}>;


export type FindAllBatchProcessesQuery = { __typename?: 'Query', findAllBatchProcesses: { __typename?: 'PaginatedBatchProcessResponse', page: number, pageSize: number, total: number, totalPages: number, items: Array<{ __typename?: 'BatchProcess', id: string, status: BatchStatus, totalFiles: number, processedFiles: number, createdAt: any }> } };

export type FindAllFilesQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  filters?: InputMaybe<Filters>;
  sort?: InputMaybe<Sort>;
}>;


export type FindAllFilesQuery = { __typename?: 'Query', findAllFiles: { __typename?: 'PaginatedFileToProcessResponse', page: number, pageSize: number, total: number, totalPages: number, items: Array<{ __typename?: 'FileToProcess', id: string, fileName: string, filePath?: string | null, status: FileProcessStatus, result?: any | null, error?: string | null, createdAt: any }> } };

export type ProcessBatchSyncMutationVariables = Exact<{
  input: CreateBatchInput;
}>;


export type ProcessBatchSyncMutation = { __typename?: 'Mutation', processBatchSync: { __typename?: 'BatchProcess', id: string } };

export type PublicProcessBatchSyncMutationVariables = Exact<{
  input: CreateBatchInput;
}>;


export type PublicProcessBatchSyncMutation = { __typename?: 'Mutation', publicProcessBatchSync: { __typename?: 'PublicSyncProcessResponse', json?: string | null, csv?: string | null, excel?: string | null } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, email?: string | null, name?: string | null, surname?: string | null, credits: number, isSocial: boolean, clientId: string, clientSecret: string } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdatePasswordDto;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: boolean };

export type RefreshUserClientSecretMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RefreshUserClientSecretMutation = { __typename?: 'Mutation', refreshUserClientSecret: { __typename?: 'User', id: string, clientId: string, clientSecret: string } };

export type FindAllWebhooksQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  filters?: InputMaybe<Filters>;
  sort?: InputMaybe<Sort>;
}>;


export type FindAllWebhooksQuery = { __typename?: 'Query', findAllWebhooks: { __typename?: 'PaginatedWebhookResponse', page: number, pageSize: number, total: number, totalPages: number, items: Array<{ __typename?: 'Webhook', id: string, name: string, url: string, status: WebhookStatus, authType: WebhookAuthType, events: Array<WebhookEvent>, createdAt: any }> } };

export type FindWebhookByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindWebhookByIdQuery = { __typename?: 'Query', findWebhookById?: { __typename?: 'Webhook', id: string, name: string, url: string, status: WebhookStatus, authType: WebhookAuthType, events: Array<WebhookEvent>, headers: string, maxRetries: number, timeout: number, createdAt: any, updatedAt: any } | null };

export type CreateWebhookMutationVariables = Exact<{
  input: CreateWebhookDto;
}>;


export type CreateWebhookMutation = { __typename?: 'Mutation', createWebhook: { __typename?: 'Webhook', id: string, name: string, url: string, status: WebhookStatus, authType: WebhookAuthType, events: Array<WebhookEvent> } };

export type UpdateWebhookMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateWebhookDto;
}>;


export type UpdateWebhookMutation = { __typename?: 'Mutation', updateWebhook: { __typename?: 'Webhook', id: string, name: string, url: string, status: WebhookStatus, authType: WebhookAuthType, events: Array<WebhookEvent> } };

export type DeleteWebhookMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteWebhookMutation = { __typename?: 'Mutation', deleteWebhook: boolean };


export const FindAllBatchProcessesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllBatchProcesses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Filters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllBatchProcesses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalFiles"}},{"kind":"Field","name":{"kind":"Name","value":"processedFiles"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<FindAllBatchProcessesQuery, FindAllBatchProcessesQueryVariables>;
export const FindAllFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Filters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<FindAllFilesQuery, FindAllFilesQueryVariables>;
export const ProcessBatchSyncDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProcessBatchSync"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBatchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processBatchSync"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProcessBatchSyncMutation, ProcessBatchSyncMutationVariables>;
export const PublicProcessBatchSyncDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublicProcessBatchSync"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBatchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicProcessBatchSync"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}},{"kind":"Field","name":{"kind":"Name","value":"csv"}},{"kind":"Field","name":{"kind":"Name","value":"excel"}}]}}]}}]} as unknown as DocumentNode<PublicProcessBatchSyncMutation, PublicProcessBatchSyncMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"credits"}},{"kind":"Field","name":{"kind":"Name","value":"isSocial"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const RefreshUserClientSecretDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshUserClientSecret"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshUserClientSecret"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<RefreshUserClientSecretMutation, RefreshUserClientSecretMutationVariables>;
export const FindAllWebhooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllWebhooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Filters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllWebhooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"authType"}},{"kind":"Field","name":{"kind":"Name","value":"events"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]} as unknown as DocumentNode<FindAllWebhooksQuery, FindAllWebhooksQueryVariables>;
export const FindWebhookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindWebhookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findWebhookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"authType"}},{"kind":"Field","name":{"kind":"Name","value":"events"}},{"kind":"Field","name":{"kind":"Name","value":"headers"}},{"kind":"Field","name":{"kind":"Name","value":"maxRetries"}},{"kind":"Field","name":{"kind":"Name","value":"timeout"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<FindWebhookByIdQuery, FindWebhookByIdQueryVariables>;
export const CreateWebhookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWebhook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWebhookDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWebhook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"authType"}},{"kind":"Field","name":{"kind":"Name","value":"events"}}]}}]}}]} as unknown as DocumentNode<CreateWebhookMutation, CreateWebhookMutationVariables>;
export const UpdateWebhookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWebhook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWebhookDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWebhook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"authType"}},{"kind":"Field","name":{"kind":"Name","value":"events"}}]}}]}}]} as unknown as DocumentNode<UpdateWebhookMutation, UpdateWebhookMutationVariables>;
export const DeleteWebhookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWebhook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWebhook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteWebhookMutation, DeleteWebhookMutationVariables>;