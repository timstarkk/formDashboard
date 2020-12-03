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
        userId
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
          userId
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
      contents {
        columns
        rows
        layout {
          w
          h
          x
          y
          i
          isBounded
          isDraggable
          isResizable
          maxH
          maxW
          minH
          minW
          moved
          resizeHandles
          static
          type
          isLabel
          labelFor
          textValue
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
        contents {
          columns
          rows
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
