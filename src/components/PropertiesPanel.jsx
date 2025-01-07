// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateField, addCondition } from '../redux/formSlice';
// import ConditionEditor from './conditions/ConditionsEditore';

// const PropertiesPanel = () => {
//   const dispatch = useDispatch();
//   const selectedFieldId = useSelector((state) => state.form.selectedField);
//   const fields = useSelector((state) => state.form.fields);
//   const selectedField = fields.find(f => f.id === selectedFieldId);

//   if (!selectedField) {
//     return (
//       <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//         <p>Select a field to edit its properties</p>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     dispatch(updateField({
//       id: selectedField.id,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleAddCondition = () => {
//     dispatch(addCondition({
//       fieldId: selectedField.id,
//       condition: {
//         sourceField: '',
//         operator: 'equals',
//         value: '',
//         action: 'show',
//       },
//     }));
//   };

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//       <h2 className="text-xl font-semibold mb-4">Field Properties</h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Label</label>
//         <input
//           type="text"
//           name="label"
//           value={selectedField.label}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Placeholder</label>
//         <input
//           type="text"
//           name="placeholder"
//           value={selectedField.placeholder}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

// <div className="mb-4">
//   <label className="inline-flex items-center">
//     <input
//       type="checkbox"
//       name="required"
//       checked={selectedField.required}
//       onChange={handleChange}
//       className="bg-white h-4 w-4 text-blue-500"
//     />
//     <span className="ml-2 text-sm font-medium">Required</span>
//   </label>
// </div>

//       <h3 className="text-lg font-semibold mb-4">Conditional Logic</h3>
//       <button
//         onClick={handleAddCondition}
//         className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
//       >
//         Add Condition
//       </button>

//       {selectedField.conditions?.map((condition, index) => (
//         <ConditionEditor
//           key={index}
//           fieldId={selectedField.id}
//           condition={condition}
//           index={index}
//         />
//       ))}
//     </div>
//   );
// };

// export default PropertiesPanel;

// yes 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, addCondition } from '../redux/formSlice';
import ConditionEditor from './conditions/ConditionsEditore';
import { FaTrash } from 'react-icons/fa';
import { CiSquarePlus } from 'react-icons/ci';

// const PropertiesPanel = () => {
//   const dispatch = useDispatch();
//   const selectedFieldId = useSelector((state) => state.form.selectedField);
//   const fields = useSelector((state) => state.form.fields);
//   const selectedField = fields.find((f) => f.id === selectedFieldId);

//   if (!selectedField) {
//     return (
//       <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//         <p>Select a field to edit its properties</p>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     dispatch(
//       updateField({
//         id: selectedField.id,
//         [name]: type === 'checkbox' ? checked : value,
//       })
//     );
//   };

//   const handleValidationChange = (validationName, validationValue) => {
//     dispatch(
//       updateValidation({
//         fieldId: selectedField.id,
//         validationName,
//         validationValue,
//       })
//     );
//   };

// const handleAddCondition = () => {
//   dispatch(
//     addCondition({
//       fieldId: selectedField.id,
//       condition: {
//         sourceField: '',
//         operator: 'equals',
//         value: '',
//         action: 'show',
//       },
//     })
//   );
// };

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//       <h2 className="text-xl font-semibold mb-4">Field Properties</h2>

//       {/* Label Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Label</label>
//         <input
//           type="text"
//           name="label"
//           value={selectedField.label}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Field Type Selector */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Field Type</label>
//         <select
//           name="type"
//           value={selectedField.type}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="text">Text</option>
//           <option value="number">Number</option>
//           <option value="email">Email</option>
//           <option value="password">Password</option>
//           <option value="select">Dropdown</option>
//           <option value="checkbox">Checkbox</option>
//           <option value="radio">Radio</option>
//           <option value="date">Date</option>
//         </select>
//       </div>

//       {/* Validations */}
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold mb-2">Validations</h3>
//         <div className="mb-2">
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               name="required"
//               checked={selectedField.validations?.required || false}
//               onChange={(e) =>
//                 handleValidationChange('required', e.target.checked)
//               }
//               className="bg-white h-4 w-4 text-blue-500"
//             />
//             <span className="ml-2 text-sm font-medium">Required</span>
//           </label>
//         </div>
//         {selectedField.type === 'text' && (
//           <div className="mb-2">
//             <label className="block text-sm font-medium mb-1">Min Length</label>
//             <input
//               type="number"
//               name="minLength"
//               value={selectedField.validations?.minLength || ''}
//               onChange={(e) =>
//                 handleValidationChange('minLength', e.target.value)
//               }
//               className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}
//         {selectedField.type === 'number' && (
//           <div className="mb-2">
//             <label className="block text-sm font-medium mb-1">Min Value</label>
//             <input
//               type="number"
//               name="minValue"
//               value={selectedField.validations?.minValue || ''}
//               onChange={(e) =>
//                 handleValidationChange('minValue', e.target.value)
//               }
//               className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}
//       </div>

// {/* Conditional Logic */}
// <h3 className="text-lg font-semibold mb-4">Conditional Logic</h3>
// <button
//   onClick={handleAddCondition}
//   className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
// >
//   Add Condition
// </button>

// {selectedField.conditions?.map((condition, index) => (
//   <ConditionEditor
//     key={index}
//     fieldId={selectedField.id}
//     condition={condition}
//     index={index}
//   />
// ))}
//     </div>
//   );
// };

// export default PropertiesPanel;

// const PropertiesPanel = () => {
//   const dispatch = useDispatch();
//   const selectedFieldId = useSelector((state) => state.form.selectedField);
//   const fields = useSelector((state) => state.form.fields);
//   const selectedField = fields.find((f) => f.id === selectedFieldId);

//   if (!selectedField) {
//     return (
//       <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//         <p>Select a field to edit its properties</p>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "type") {
//       // Reset the field when the type changes
//       const resetField = {
//         id: selectedField.id,
//         label: selectedField.label || "New Field",
//         type: value,
//         required: false,
//         ...(value === "checkbox" || value === "radio" || value === "select"
//           ? {
//             options: [
//               { label: "Option 1", value: "option1" },
//               { label: "Option 2", value: "option2" },
//             ],
//           }
//           : {}),
//       };

//       // Dispatch the reset field
//       dispatch(updateField(resetField));
//     } else {
//       // Handle other changes
//       dispatch(
//         updateField({
//           id: selectedField.id,
//           [name]: type === "checkbox" ? checked : value,
//         })
//       );
//     }
//   };

//   const handleOptionsChange = (index, key, value) => {
//     const updatedOptions = selectedField.options.map((option, i) =>
//       i === index ? { ...option, [key]: value } : option
//     );

//     dispatch(
//       updateField({
//         id: selectedField.id,
//         options: updatedOptions,
//       })
//     );
//   };

//   const handleAddCondition = () => {
//     dispatch(
//       addCondition({
//         fieldId: selectedField.id,
//         condition: {
//           sourceField: '',
//           operator: 'equals',
//           value: '',
//           action: 'show',
//         },
//       })
//     );
//   };

//   const addOption = () => {
//     dispatch(
//       updateField({
//         id: selectedField.id,
//         options: [...(selectedField.options || []), { label: '', value: '' }],
//       })
//     );
//   };

//   const removeOption = (index) => {
//     const updatedOptions = [...(selectedField.options || [])];
//     updatedOptions.splice(index, 1);
//     dispatch(
//       updateField({
//         id: selectedField.id,
//         options: updatedOptions,
//       })
//     );
//   };

//   return (
//     <div className="bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-screen">
//       <h2 className="text-xl font-semibold mb-4">Field Properties</h2>

//       {/* Label Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Label</label>
//         <input
//           type="text"
//           name="label"
//           value={selectedField.label}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Field Type Selector */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Field Type</label>
//         <select
//           name="type"
//           value={selectedField.type}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="text">Text</option>
//           <option value="number">Number</option>
//           <option value="email">Email</option>
//           <option value="password">Password</option>
//           <option value="select">Dropdown</option>
//           <option value="checkbox">Checkbox</option>
//           <option value="radio">Radio</option>
//           <option value="date">Date</option>
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             name="required"
//             checked={selectedField.required}
//             onChange={handleChange}
//             className="bg-white h-4 w-4 text-blue-500"
//           />
//           <span className="ml-2 text-sm font-medium">Required</span>
//         </label>
//       </div>

//       {/* Options for   , Radio, and Checkbox */}
//       {(selectedField.type === 'select' ||
//         selectedField.type === 'radio' ||
//         selectedField.type === 'checkbox') && (
//           <div className="mb-4">
//             <div className='flex justify-between items-center '>
//               <h3 className="text-lg font-semibold">Options</h3>
//               <button
//                 type="button"
//                 onClick={addOption}
//                 className="p-2 text-black rounded-m"
//               >
//                 <CiSquarePlus size={28} />
//               </button>
//             </div>
//             {selectedField.options?.map((option, index) => (
//               <div key={index} className="flex flex-col gap-2 mb-2">
//                 <div class="flex items-center justify-between">
//                   <div>
//                     <label>Label</label>
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() => removeOption(index)}
//                       className="p-1 py- rounded-md"
//                     >
//                       <FaTrash size={20} className='text-red-500 hover:text-red-600 duration-300' />
//                     </button>
//                   </div>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Label"
//                   value={option.label}
//                   onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//                 <label>Value</label>
//                 <input
//                   type="text"
//                   placeholder="Value"
//                   value={option.value}
//                   onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
//                   className="flex-1 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//               </div>
//             ))}
//           </div>
//         )}

//       {/* Conditional Logic */}
//       <h3 className="text-lg font-semibold mb-4">Conditional Logic</h3>
//       <button
//         onClick={handleAddCondition}
//         className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
//       >
//         Add Condition
//       </button>

//       {selectedField.conditions?.map((condition, index) => (
//         <ConditionEditor
//           key={index}
//           fieldId={selectedField.id}
//           condition={condition}
//           index={index}
//         />
//       ))}
//     </div>
//   );
// };

// export default PropertiesPanel;

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const selectedFieldId = useSelector((state) => state.form.selectedField);
  const fields = useSelector((state) => state.form.fields);
  const selectedField = fields?.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="bg-white p-5 rounded-lg border border-gray-200 overflow-y-auto h-builder-canvas-area flex justify-center items-center">
        <p>Select a field to edit its properties</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "type") {
      // Reset the field when the type changes
      const resetField = {
        id: selectedField.id,
        label: selectedField.label || "New Field",
        type: value,
        required: false,
        ...(value === "checkbox" || value === "radio" || value === "select"
          ? {
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ],
          }
          : {}),
      };

      // Dispatch the reset field
      dispatch(updateField(resetField));
    } else {
      // Handle other changes
      dispatch(
        updateField({
          id: selectedField.id,
          [name]: type === "checkbox" ? checked : value,
        })
      );
    }
  };

  const handleOptionsChange = (index, key, value) => {
    const updatedOptions = selectedField.options.map((option, i) =>
      i === index ? { ...option, [key]: value } : option
    );

    dispatch(
      updateField({
        id: selectedField.id,
        options: updatedOptions,
      })
    );
  };

  const handleAddCondition = () => {
    dispatch(
      addCondition({
        fieldId: selectedField.id,
        condition: {
          sourceField: '',
          operator: 'equals',
          value: '',
          action: 'show',
        },
      })
    );
  };

  const addOption = () => {
    dispatch(
      updateField({
        id: selectedField.id,
        options: [...(selectedField.options || []), { label: '', value: '' }],
      })
    );
  };

  const removeOption = (index) => {
    const updatedOptions = [...(selectedField.options || [])];
    updatedOptions.splice(index, 1);
    dispatch(
      updateField({
        id: selectedField.id,
        options: updatedOptions,
      })
    );
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 h-builder-canvas-area overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Field Properties</h2>

      {/* Label Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Label</label>
        <input
          type="text"
          name="label"
          value={selectedField.label}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Field Type Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Field Type</label>
        <select
          name="type"
          value={selectedField.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="select">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="date">Date</option>
        </select>
      </div>

      {
        selectedField.type !== 'label' &&
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="required"
              checked={selectedField.required}
              onChange={handleChange}
              className="bg-white h-4 w-4 text-blue-500"
            />
            <span className="ml-2 text-sm font-medium">Required</span>
          </label>
        </div>
      }

      {/* Options for Select, Radio, and Checkbox */}
      {(selectedField.type === 'select' ||
        selectedField.type === 'radio' ||
        selectedField.type === 'checkbox') && (
          <div className="mb-4">
            <div className='flex justify-between items-center '>
              <h3 className="text-lg font-semibold">Options</h3>
              <button
                type="button"
                onClick={addOption}
                className="p-2 text-black rounded-m"
              >
                <CiSquarePlus size={28} />
              </button>
            </div>
            {selectedField.options?.map((option, index) => (
              <div key={index} className="gap-4 mb-2 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
                <div className="flex flex-col">
                  <div className='mb-2 flex justify-between'>
                    <label>Label</label>
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-1 py- rounded-md xl:hidden lg:hidden md:hidden sm:block block"
                    >
                      <FaTrash size={18} className='text-red-500 hover:text-red-600 duration-300' />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Label"
                    value={option.label}
                    onChange={(e) => handleOptionsChange(index, 'label', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className='flex flex-col'>
                  <div className='flex justify-between'>
                    <label className='mb-2'>Value</label>
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-1 py- rounded-md xl:block lg:block md:block sm:hidden hidden"
                    >
                      <FaTrash size={18} className='text-red-500 hover:text-red-600 duration-300' />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Value"
                    value={option.value}
                    onChange={(e) => handleOptionsChange(index, 'value', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Conditional Logic */}
      <h3 className="text-lg font-semibold mb-4">Conditional Logic</h3>
      <button
        className="flex gap-2  items-center rounded-md focus:outline-none mb-2"
      >
        <CiSquarePlus size={28} onClick={handleAddCondition} /> Add Condition
      </button>

      {selectedField.conditions?.map((condition, index) => (
        <ConditionEditor
          key={index}
          fieldId={selectedField.id}
          condition={condition}
          index={index}
        />
      ))}
    </div>
  );
};

export default PropertiesPanel;
