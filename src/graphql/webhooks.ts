import { gql } from '@apollo/client/core';

export const FIND_ALL_WEBHOOKS = gql`
  query FindAllWebhooks($pagination: Pagination, $filters: Filters, $sort: Sort) {
    findAllWebhooks(pagination: $pagination, filters: $filters, sort: $sort) {
      items {
        id
        name
        url
        status
        authType
        events
        createdAt
      }
      page
      pageSize
      total
      totalPages
    }
  }
`;

export const FIND_WEBHOOK_BY_ID = gql`
  query FindWebhookById($id: String!) {
    findWebhookById(id: $id) {
      id
      name
      url
      status
      authType
      events
      headers
      maxRetries
      timeout
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_WEBHOOK = gql`
  mutation CreateWebhook($input: CreateWebhookDto!) {
    createWebhook(input: $input) {
      id
      name
      url
      status
      authType
      events
    }
  }
`;

export const UPDATE_WEBHOOK = gql`
  mutation UpdateWebhook($id: String!, $input: UpdateWebhookDto!) {
    updateWebhook(id: $id, input: $input) {
      id
      name
      url
      status
      authType
      events
    }
  }
`;

export const DELETE_WEBHOOK = gql`
  mutation DeleteWebhook($id: String!) {
    deleteWebhook(id: $id)
  }
`; 