import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCondition } from '../../redux/formSlice';
import ConditionEditor from './ConditionEditor';

const ConditionBuilder = ({ fieldId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const field = useSelector((state) =>
    state.form.fields.find(f => f.id === fieldId)
  );

  const handleAddCondition = () => {
    dispatch(addCondition({
      fieldId,
      condition: {
        sourceField: '',
        operator: 'equals',
        value: '',
        action: 'show'
      }
    }));
  };

  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold mb-4">Conditional Logic</h3>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Open Modal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">My Modal</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <p>This is the content inside the modal.</p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t p-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleAddCondition}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-4 cursor-pointer hover:bg-blue-700"
      >
        Add Condition1
      </button>
      {field?.conditions?.map((condition, index) => (
        <ConditionEditor
          key={index}
          fieldId={fieldId}
          condition={condition}
          index={index}
        />
      ))}
    </div>
  );
};

export default ConditionBuilder;
