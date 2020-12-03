/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateForms = /* GraphQL */ `
  subscription OnCreateForms {
    onCreateForms {
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
export const onUpdateForms = /* GraphQL */ `
  subscription OnUpdateForms {
    onUpdateForms {
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
export const onDeleteForms = /* GraphQL */ `
  subscription OnDeleteForms {
    onDeleteForms {
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
