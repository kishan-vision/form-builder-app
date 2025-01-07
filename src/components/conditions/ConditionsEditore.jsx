import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../redux/formSlice';
import { FaTrash } from 'react-icons/fa6';

const ConditionEditor = ({ fieldId, condition, index }) => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const otherFields = fields.filter(f => f.id !== fieldId);

  const updateCondition = (updates) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    const updatedConditions = [...field.conditions];
    updatedConditions[index] = { ...updatedConditions[index], ...updates };

    dispatch(updateField({
      id: fieldId,
      conditions: updatedConditions
    }));
  };

  const removeCondition = () => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;

    const updatedConditions = field.conditions.filter((_, i) => i !== index);
    dispatch(updateField({
      id: fieldId,
      conditions: updatedConditions
    }));
  };

  return (
    <div className="rounded bg-gray-50 grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-4 mb-4">
      <div>
        <div className='flex justify-between items-center'>
          <label htmlFor="sourceField" className="block text-sm font-medium text-gray-700 mb-2">
            Field Selection
          </label>
          <button
            onClick={removeCondition}
            className="text-white rounded cursor-pointer xl:hidden lg:block md:hidden sm:block block"
          >
            <FaTrash size={18} className="text-red-500 hover:text-red-600 duration-300" />
          </button>
        </div>
        <select
          value={condition.sourceField}
          onChange={(e) => updateCondition({ sourceField: e.target.value })}
          className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">Select field</option>
          {otherFields.map(field => (
            <option key={field.id} value={field.id}>
              {field.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <label htmlFor="operator" className="block text-sm font-medium text-gray-700 mb-2">
            Operator
          </label>
          <button
            onClick={removeCondition}
            className="text-white rounded cursor-pointer xl:block lg:hidden md:block sm:hidden hidden"
          >
            <FaTrash size={20} className="text-red-500 hover:text-red-600 duration-300" />
          </button>
        </div>
        <select
          value={condition.operator}
          onChange={(e) => updateCondition({ operator: e.target.value })}
          className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="equals">Equals</option>
          <option value="not_equals">Not equals</option>
          <option value="contains">Contains</option>
          <option value="greater_than">Greater than</option>
          <option value="less_than">Less than</option>
        </select>

      </div>

      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
          Value
        </label>
        <input
          type="text"
          value={condition.value}
          onChange={(e) => updateCondition({ value: e.target.value })}
          placeholder="Enter value"
          className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* <div className='flex items-center justify-between'>
        <button
          onClick={removeCondition}
          className="text-white py-2 px-4 mt-2 rounded cursor-pointe"
        >
          <FaTrash size={20} className='text-red-500 hover:text-red-600 duration-300' />
        </button>
      </div> */}

    </div>
  );
};

export default ConditionEditor;
