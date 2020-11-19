/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const nameOfMutation = /* GraphQL */ `
  mutation NameOfMutation($someVar: String!, $otherVar: String!) {
    nameOfMutation(someVar: $someVar, otherVar: $otherVar)
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      confirmedDate
      forms {
        id
        contents {
          columns
          rows
          userId
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      confirmedDate
      forms {
        id
        contents {
          columns
          rows
          userId
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      confirmedDate
      forms {
        id
        contents {
          columns
          rows
          userId
        }
      }
      createdAt
      updatedAt
    }
  }
`;
