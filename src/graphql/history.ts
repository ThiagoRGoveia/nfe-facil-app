import { gql } from "@apollo/client/core";

export const FIND_ALL_BATCH_PROCESSES = gql`
  query FindAllBatchProcesses($pagination: Pagination, $filters: Filters, $sort: Sort) {
    findAllBatchProcesses(pagination: $pagination, filters: $filters, sort: $sort) {
      items {
        id
        status
        totalFiles
        processedFiles
        createdAt
      }
      page
      pageSize
      total
      totalPages
    }
  }
`;

export const FIND_ALL_FILES = gql`
  query FindAllFiles($pagination: Pagination, $filters: Filters, $sort: Sort) {
    findAllFiles(pagination: $pagination, filters: $filters, sort: $sort) {
      items {
        id
        fileName
        filePath
        status
        result
        error
        createdAt
      }
      page
      pageSize
      total
      totalPages
    }
  }
`;

export const FIND_BATCH_PROCESS_BY_ID = gql`
  query FindBatchProcessById($id: String!) {
    findBatchProcessById(id: $id) {
      id
      status
      totalFiles
      processedFiles
      createdAt
      updatedAt
      requestedFormats
      jsonResults
      csvResults
      excelResults
    }
  }
`;

export const PROCESS_FILE = gql`
  mutation ProcessFile($fileId: String!) {
    processFile(fileId: $fileId) {
      id
      fileName
      filePath
      status
      result
      error
    }
  }
`;

export const PROCESS_OUTPUT_CONSOLIDATION = gql`
  mutation ProcessOutputConsolidation($batchId: String!) {
    processOutputConsolidation(batchId: $batchId) {
      id
      status
      jsonResults
      csvResults
      excelResults
    }
  }
`;
