/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      confirmedDate
      forms {
        id
        contents {
          columns
          rows
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        confirmedDate
        forms {
          id
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getForms = /* GraphQL */ `
  query GetForms($id: ID!) {
    getForms(id: $id) {
      id
      form {
        id
        contents {
          columns
          rows
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFormss = /* GraphQL */ `
  query ListFormss(
    $filter: ModelFormsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        form {
          id
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
