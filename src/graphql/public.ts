import { gql } from "@apollo/client/core";

export const PUBLIC_PROCESS_BATCH = gql`
  mutation PublicProcessBatchSync($input: CreateBatchInput!) {
    publicProcessBatchSync(input: $input) {
      json
      csv
      excel
      errors {
        fileName
        error
      }
    }
  }
`; 