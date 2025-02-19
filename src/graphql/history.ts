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
      }
      page
      pageSize
      total
      totalPages
    }
  }
`;
