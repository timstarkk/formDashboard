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
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createForms = /* GraphQL */ `
  mutation CreateForms(
    $input: CreateFormsInput!
    $condition: ModelFormsConditionInput
  ) {
    createForms(input: $input, condition: $condition) {
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
export const updateForms = /* GraphQL */ `
  mutation UpdateForms(
    $input: UpdateFormsInput!
    $condition: ModelFormsConditionInput
  ) {
    updateForms(input: $input, condition: $condition) {
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
export const deleteForms = /* GraphQL */ `
  mutation DeleteForms(
    $input: DeleteFormsInput!
    $condition: ModelFormsConditionInput
  ) {
    deleteForms(input: $input, condition: $condition) {
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
