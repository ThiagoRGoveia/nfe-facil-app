/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query FindAllBatchProcesses($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllBatchProcesses(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        status\n        totalFiles\n        processedFiles\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n": typeof types.FindAllBatchProcessesDocument,
    "\n  query FindAllFiles($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllFiles(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        fileName\n        filePath\n        status\n        result\n        error\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n": typeof types.FindAllFilesDocument,
    "\n  mutation ProcessBatchSync($input: CreateBatchInput!) {\n    processBatchSync(input: $input) {\n      id\n    }\n  }\n": typeof types.ProcessBatchSyncDocument,
    "\n  mutation PublicProcessBatchSync($input: CreateBatchInput!) {\n    publicProcessBatchSync(input: $input) {\n      json\n      csv\n      excel\n    }\n  }\n": typeof types.PublicProcessBatchSyncDocument,
    "\n  query GetUser {\n    getUser {\n      id\n      email\n      name\n      surname\n      credits\n      isSocial\n      clientId\n      clientSecret\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  mutation UpdateUserPassword($id: String!, $input: UpdatePasswordDto!) {\n    updateUserPassword(id: $id, input: $input)\n  }\n": typeof types.UpdateUserPasswordDocument,
    "\n  mutation RefreshUserClientSecret($id: String!) {\n    refreshUserClientSecret(id: $id) {\n      id\n      clientId\n      clientSecret\n    }\n  }\n": typeof types.RefreshUserClientSecretDocument,
};
const documents: Documents = {
    "\n  query FindAllBatchProcesses($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllBatchProcesses(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        status\n        totalFiles\n        processedFiles\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n": types.FindAllBatchProcessesDocument,
    "\n  query FindAllFiles($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllFiles(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        fileName\n        filePath\n        status\n        result\n        error\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n": types.FindAllFilesDocument,
    "\n  mutation ProcessBatchSync($input: CreateBatchInput!) {\n    processBatchSync(input: $input) {\n      id\n    }\n  }\n": types.ProcessBatchSyncDocument,
    "\n  mutation PublicProcessBatchSync($input: CreateBatchInput!) {\n    publicProcessBatchSync(input: $input) {\n      json\n      csv\n      excel\n    }\n  }\n": types.PublicProcessBatchSyncDocument,
    "\n  query GetUser {\n    getUser {\n      id\n      email\n      name\n      surname\n      credits\n      isSocial\n      clientId\n      clientSecret\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation UpdateUserPassword($id: String!, $input: UpdatePasswordDto!) {\n    updateUserPassword(id: $id, input: $input)\n  }\n": types.UpdateUserPasswordDocument,
    "\n  mutation RefreshUserClientSecret($id: String!) {\n    refreshUserClientSecret(id: $id) {\n      id\n      clientId\n      clientSecret\n    }\n  }\n": types.RefreshUserClientSecretDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindAllBatchProcesses($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllBatchProcesses(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        status\n        totalFiles\n        processedFiles\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n"): (typeof documents)["\n  query FindAllBatchProcesses($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllBatchProcesses(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        status\n        totalFiles\n        processedFiles\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindAllFiles($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllFiles(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        fileName\n        filePath\n        status\n        result\n        error\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n"): (typeof documents)["\n  query FindAllFiles($pagination: Pagination, $filters: Filters, $sort: Sort) {\n    findAllFiles(pagination: $pagination, filters: $filters, sort: $sort) {\n      items {\n        id\n        fileName\n        filePath\n        status\n        result\n        error\n        createdAt\n      }\n      page\n      pageSize\n      total\n      totalPages\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ProcessBatchSync($input: CreateBatchInput!) {\n    processBatchSync(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ProcessBatchSync($input: CreateBatchInput!) {\n    processBatchSync(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation PublicProcessBatchSync($input: CreateBatchInput!) {\n    publicProcessBatchSync(input: $input) {\n      json\n      csv\n      excel\n    }\n  }\n"): (typeof documents)["\n  mutation PublicProcessBatchSync($input: CreateBatchInput!) {\n    publicProcessBatchSync(input: $input) {\n      json\n      csv\n      excel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser {\n    getUser {\n      id\n      email\n      name\n      surname\n      credits\n      isSocial\n      clientId\n      clientSecret\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    getUser {\n      id\n      email\n      name\n      surname\n      credits\n      isSocial\n      clientId\n      clientSecret\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserPassword($id: String!, $input: UpdatePasswordDto!) {\n    updateUserPassword(id: $id, input: $input)\n  }\n"): (typeof documents)["\n  mutation UpdateUserPassword($id: String!, $input: UpdatePasswordDto!) {\n    updateUserPassword(id: $id, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshUserClientSecret($id: String!) {\n    refreshUserClientSecret(id: $id) {\n      id\n      clientId\n      clientSecret\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshUserClientSecret($id: String!) {\n    refreshUserClientSecret(id: $id) {\n      id\n      clientId\n      clientSecret\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;