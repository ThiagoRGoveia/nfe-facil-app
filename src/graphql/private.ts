import { gql } from '@apollo/client/core';

export const PROCESS_BATCH_SYNC = gql`
  mutation ProcessBatchSync($input: CreateBatchInput!) {
    processBatchSync(input: $input) {
      id
    }
  }
`; 