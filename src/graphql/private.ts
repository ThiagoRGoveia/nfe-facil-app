import { gql } from '@apollo/client/core';

export const CREATE_BATCH = gql`
  mutation createBatchProcess($input: CreateBatchInput!) {
    createBatchProcess(input: $input) {
      id
    }
  }
`; 