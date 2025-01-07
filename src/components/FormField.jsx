import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { removeField } from '../redux/formSlice';
import { FaTrash } from 'react-icons/fa';

const FieldWrapper = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #fff;
  }
  
  &.selected {
    border-color: #0d6efd;
    background: #fff;
  }
`;

const FormField = ({ field, onClick }) => {
  const dispatch = useDispatch();
  const { register } = useForm();
  const selectedField = useSelector((state) => state.form.selectedField);
  const isSelected = selectedField === field.id;

  const renderField = () => {
    switch (field?.type) {
      case 'text':
        return (
          <input
            {...register(`field_${field.id}`, { required: field.required })}
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.label}
          />
        );
      case 'number':
        return (
          <input
            {...register(`field_${field.id}`, { required: field.required })}
            type="number"
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.label}
          />
        );
      case 'email':
        return (
          <input
            {...register(`field_${field.id}`, { required: field.required })}
            type="email"
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.label}
          />
        );
      case 'password':
        return (
          <input
            {...register(`field_${field.id}`, { required: field.required })}
            type="password"
            className="w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.label}
          />
        );
      case 'date':
        return (
          <input
            {...register(`field_${field.id}`, { required: field.required })}
            type="date"
            className="w-full p-2 border bg-white text-slate-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={field.label}
          />
        );
      case 'checkbox':
        return (
          <div className="mt-2 flex gap-3">
            {field.options?.map((option, idx) => (
              <label key={`${field.id}-checkbox-${idx}`} className="inline-flex items-center">
                <input
                  {...register(`field_${field.id}`)}  // Use the same field name for all checkboxes
                  type="checkbox"
                  value={option.value}  // Store the value of each checked option
                  className="h-4 w-4 text-blue-600 bg-white focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div className="mt-2 space-x-4">
            {field.options?.map((option, idx) => (
              <label key={`${option.value}-${idx}`} className="inline-flex items-center">
                <input
                  type="radio"
                  name={`field_${field.id}`} // Ensure unique name for radio group
                  value={option.value}
                  className="h-4 w-4 text-blue-600 bg-white focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <div>
            <select
              {...register(`field_${field.id}`, { required: field.required })}
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {field.options?.map((option, idx) => (
                <option key={`${field.id}-select-${option.value}-${idx}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDelete = () => {
    dispatch(removeField(field.id));
  };

  return (
    <FieldWrapper onClick={onClick} className={isSelected ? 'selected' : ''}>
      <div className='flex justify-between items-center mb-2'>
        <label className='block font-medium'>{field.label}</label>
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
      {renderField()}
    </FieldWrapper>
  );
};

export default FormField;
