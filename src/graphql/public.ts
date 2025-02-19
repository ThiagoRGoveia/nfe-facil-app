import { gql } from "@apollo/client/core";

export const PUBLIC_PROCESS_BATCH = gql`
  mutation PublicProcessBatchSync($files: [Upload!]!, $formats: [String!]!) {
    publicProcessBatchSync(files: $files, formats: $formats) {
      success
      message
      downloadUrl
    }
  }
`; 