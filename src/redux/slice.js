import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentForm: {
        id: 'default-form',
        name: 'New Form',
        fields: [],
    },
    currentField: null,
    forms: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setCurrentForm: (state, action) => {
            state.currentForm = action.payload;
        },
        addField: (state, action) => {
            // state.currentForm.fields.push({
            //     id: Date.now(),
            //     ...action.payload,
            // });
            state.currentForm.fields.push(action.payload);
        },
        updateField: (state, action) => {
            const index = state.currentForm.fields.findIndex(
                (field) => field.id === action.payload.id
            );
            if (index !== -1) {
                state.currentForm.fields[index] = {
                    ...state.currentForm.fields[index],
                    ...action.payload.field,
                };
            }
        },
        updateFieldLabel: (state, action) => {
            const { id, label } = action.payload;
            const field = state.currentForm.fields.find(f => f.id === id);
            if (field) {
                field.label = label;
            }
        },
        removeField: (state, action) => {
            if (state.currentForm) {
                state.currentForm.fields = state.currentForm.fields.filter(
                    (field) => field.id !== action.payload
                );
            }
        },
        saveForm: (state) => {
            if (state.currentForm) {
                const existingIndex = state.forms.findIndex(
                    (form) => form.id === state.currentForm?.id
                );
                if (existingIndex !== -1) {
                    state.forms[existingIndex] = state.currentForm;
                } else {
                    state.forms.push(state.currentForm);
                }
            }
        },
        deleteField: (state, action) => {
            state.currentForm.fields = state.currentForm.fields.filter(
                (field) => field.id !== action.payload.id
            );
        },
        updateFieldOptions: (state, action) => {
            const { id, options } = action.payload;
            const field = state.currentForm.fields.find(field => field.id === id);
            if (field) {
                field.options = options;
            }
        },
        updateFieldRequired: (state, action) => {
            const { id, required } = action.payload;
            const field = state.currentForm.fields.find((field) => field.id === id);
            if (field) {
                field.required = required;
            }
        },
        setCurrentField: (state, action) => {
            state.currentField = action.payload;
        },
    },
});

export const { setCurrentForm, addField, updateFieldLabel, setCurrentField, updateFieldOptions, updateFieldRequired, deleteField, updateField, removeField, saveForm } = formSlice.actions;
export default formSlice.reducer;