// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   fields: [],
//   buttons: [],
//   selectedField: null,
//   isPreviewMode: false,
// };

// export const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     addField: (state, action) => {
//       state.fields.push({
//         id: Date.now().toString(),
//         ...action.payload,
//         conditions: [],
//         value: '',
//       });
//     },
//     addButton: (state, action) => {
//       if (!state.buttons.includes(action.payload)) {
//         state.buttons.push(action.payload); // Add only if the type is not already present
//       }
//     },
//     updateField: (state, action) => {
//       const index = state.fields.findIndex(field => field.id === action.payload.id);
//       if (index !== -1) {
//         state.fields[index] = { ...state.fields[index], ...action.payload };
//       }
//     },
//     removeField: (state, action) => {
//       state.fields = state.fields.filter(field => field.id !== action.payload);
//     },
//     setSelectedField: (state, action) => {
//       state.selectedField = action.payload;
//     },
//     addCondition: (state, action) => {
//       const { fieldId, condition } = action.payload;
//       const field = state.fields.find(f => f.id === fieldId);
//       if (field) {
//         field.conditions.push(condition);
//       }
//     },
//     removeCondition: (state, action) => {
//       const { fieldId, index } = action.payload;
//       const field = state.fields.find(f => f.id === fieldId);
//       if (field && field.conditions) {
//         field.conditions.splice(index, 1);
//       }
//     },
//     updateCondition: (state, action) => {
//       const { fieldId, index, updates } = action.payload;
//       const field = state.fields.find(f => f.id === fieldId);
//       if (field && field.conditions?.[index]) {
//         field.conditions[index] = { ...field.conditions[index], ...updates };
//       }
//     },
//     reorderFields: (state, action) => {
//       state.fields = action.payload;
//     },
//     togglePreviewMode: (state) => {
//       state.isPreviewMode = !state.isPreviewMode;
//     },
//     updateFieldValue: (state, action) => {
//       const { id, value } = action.payload;
//       const field = state.fields.find(f => f.id === id);
//       if (field) {
//         field.value = value;
//       }
//     },
//     importFormConfig: (state, action) => {
//       state.fields = action.payload.fields;
//       state.buttons = action.payload.buttons;
//       state.selectedField = null;
//       state.isPreviewMode = false;
//     },
//     updateValidation: (state, action) => {
//       const { fieldId, validationName, validationValue } = action.payload;
//       const field = state.fields.find((f) => f.id === fieldId);
//       if (field) {
//         field.validations = field.validations || {};
//         field.validations[validationName] = validationValue;
//       }
//     },
//     updateFieldOrder: (state, action) => {
//       const { draggedIndex, targetIndex } = action.payload;
//       const fieldsCopy = [...state.fields];
//       const [draggedItem] = fieldsCopy.splice(draggedIndex, 1);
//       fieldsCopy.splice(targetIndex, 0, draggedItem);
//       state.fields = fieldsCopy;
//     },
//   },
// });

// export const {
//   addField,
//   updateField,
//   removeField,
//   setSelectedField,
//   addCondition,
//   removeCondition,
//   updateCondition,
//   togglePreviewMode,
//   updateFieldValue,
//   importFormConfig,
//   updateValidation,
//   reorderFields,
//   addButton,
//   updateFieldOrder
// } = formSlice.actions;

// export default formSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
  buttons: [],
  selectedField: null,
  isPreviewMode: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Add a new field to the form
    addField: (state, action) => {
      state.fields.push({
        id: Date.now().toString(),
        ...action.payload,
        conditions: [],
        value: '',
      });
    },

    // Add a new button (unique check based on button type)
    addButton: (state, action) => {
      const buttonExists = state.buttons.some(button => button === action.payload);
      if (!buttonExists) {
        state.buttons.push(action.payload);
      }
    },

    // Update an existing field by id
    updateField: (state, action) => {
      const index = state.fields.findIndex(field => field.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = { ...state.fields[index], ...action.payload };
      }
    },

    // Remove a field by id and clear its value
    removeField: (state, action) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
    },

    // Set the selected field for editing
    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },

    // Add a condition to a specific field (show, hide, etc.)
    addCondition: (state, action) => {
      const { fieldId, condition } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      field.conditions.push(condition);
    },

    // Remove a condition from a field by index
    removeCondition: (state, action) => {
      const { fieldId, index } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      if (field && field.conditions) {
        field.conditions.splice(index, 1);
      }
    },

    // Update a specific condition for a field
    updateCondition: (state, action) => {
      const { fieldId, index, updates } = action.payload;
      const field = state.fields.find(f => f.id === fieldId);
      if (field && field.conditions?.[index]) {
        field.conditions[index] = { ...field.conditions[index], ...updates };
      }
    },

    // Reorder the fields array based on drag-and-drop or other actions
    // reorderFields: (state, action) => {
    //   state.fields = action.payload;
    // },
    reorderFields: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.fields.splice(fromIndex, 1);
      state.fields.splice(toIndex, 0, movedItem);
    },

    // Toggle between preview and edit mode
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
    },

    // Update the value of a specific field by id
    updateFieldValue: (state, action) => {
      const { id, value } = action.payload;
      const field = state.fields.find(f => f.id === id);
      if (field) {
        field.value = value;
      }
    },

    // Import a pre-configured form state (fields, buttons)
    importFormConfig: (state, action) => {
      state.fields = action.payload.fields;
      state.buttons = action.payload.buttons;
      state.selectedField = null;
      state.isPreviewMode = false;
    },

    // Update a specific validation for a field
    updateValidation: (state, action) => {
      const { fieldId, validationName, validationValue } = action.payload;
      const field = state.fields.find((f) => f.id === fieldId);
      if (field) {
        field.validations = field.validations || {};
        field.validations[validationName] = validationValue;
      }
    },

    // Update the order of fields when dragging/dropping or other actions
    updateFieldOrder: (state, action) => {
      const { draggedIndex, targetIndex } = action.payload;
      const fieldsCopy = [...state.fields];
      const [draggedItem] = fieldsCopy.splice(draggedIndex, 1);
      fieldsCopy.splice(targetIndex, 0, draggedItem);
      state.fields = fieldsCopy;
    },
  },
});

// Exporting the actions from the slice
export const {
  addField,
  updateField,
  removeField,
  setSelectedField,
  addCondition,
  removeCondition,
  updateCondition,
  togglePreviewMode,
  updateFieldValue,
  importFormConfig,
  updateValidation,
  reorderFields,
  addButton,
  updateFieldOrder
} = formSlice.actions;

export default formSlice.reducer;
