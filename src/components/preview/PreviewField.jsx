// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useFormContext } from 'react-hook-form';
// import { evaluateConditions } from '../../utils/conditions';

// const PreviewField = ({ field }) => {
//   const fields = useSelector((state) => state.form.fields);
//   const { register, formState: { errors } } = useFormContext();
//   const isVisible = evaluateConditions(field, fields);

//   if (!isVisible) return null;

//   const getValidationRules = (field) => {
//     let validationRules = {};

//     switch (field.type) {
//       case 'text':
//         validationRules = {
//           required: field.required ? `${field.label} is required` : false,
//           minLength: field.minLength ? { value: field?.minLength, message: `${field.label} must be at least ${field?.minLength} characters` } : undefined,
//         };
//         break;
//       case 'number':
//         validationRules = {
//           required: field.required ? `${field.label} is required` : false,
//           min: field.min ? { value: field.min, message: `${field.label} must be greater than or equal to ${field.min}` } : undefined,
//         };
//         break;
//       case 'email':
//         validationRules = {
//           required: field.required ? `${field.label} is required` : false,
//           pattern: {
//             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//             message: 'Please enter a valid email address',
//           },
//         };
//         break;
//       case 'date':
//         validationRules = {
//           required: field.required ? `${field.label} is required` : false,
//         };
//         break;
//       case 'select':
//         validationRules = {
//           required: field.required ? `Please select ${field.label}` : false,
//         };
//         break;
//       case 'checkbox':
//         validationRules = {
//           required: field.required ? `Please select at least one ${field.label}` : false,
//         };
//         break;
//       case 'password':
//         validationRules = {
//           required: field.required ? `${field.label} is required` : false,  // Required validation
//           minLength: field.minLength
//             ? { value: field.minLength, message: `${field.label} must be at least ${field.minLength} characters` }
//             : undefined,
//           pattern: field.pattern
//             ? { value: field.pattern, message: `Please enter a valid ${field.label}` }
//             : undefined,
//         };
//         break;
//       default:
//         validationRules = {};
//         break;
//     }

//     return validationRules;
//   };

//   const renderInput = () => {
//     const validationRules = getValidationRules(field);  // Get validation rules dynamically
//     const hasError = !!errors[`field_${field.id}`]; // Check if there's an error for the field

//     const inputStyles = hasError
//       ? 'w-full p-2 border bg-white border-red-500 rounded-md focus:outline-none focus:border-red-500'
//       : 'w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500';

//     switch (field?.type) {
//       case 'text':
//         return (
//           <input
//             {...register(`field_${field.id}`, validationRules)}
//             type="text"
//             className={inputStyles}
//             placeholder={field.label}
//           />
//         );
//       case 'number':
//         return (
//           <input
//             {...register(`field_${field.id}`, validationRules)}
//             type="number"
//             className={inputStyles}
//             placeholder={field.label}
//           />
//         );
//       case 'email':
//         return (
//           <input
//             {...register(`field_${field.id}`, validationRules)}
//             type="email"
//             className={inputStyles}
//             placeholder={field.label}
//           />
//         );
//       case 'password':
//         return (
//           <input
//             {...register(`field_${field.id}`, validationRules)}
//             type="password"
//             className={inputStyles}
//             placeholder={field.label}
//           />
//         );
//       case 'date':
//         return (
//           <input
//             {...register(`field_${field.id}`, validationRules)}
//             type="date"
//             className={inputStyles}
//             placeholder={field.label}
//           />
//         );
//       case 'checkbox':
//         return (
//           <div className="mt-2 flex gap-3">
//             {field.options?.map((option, idx) => (
//               <label key={`${field.id}-checkbox-${idx}`} className="inline-flex items-center">
//                 <input
//                   {...register(`field_${field.id}`, validationRules)}
//                   type="checkbox"
//                   value={option.value}
//                   className="h-4 w-4 text-blue-600 bg-white focus:ring-blue-500 border-gray-300"
//                 />
//                 <span className="ml-2">{option.label}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 'radio':
//         return (
//           <div className="mt-2 space-x-4">
//             {field.options?.map((option, idx) => (
//               <label key={`${option.value}-${idx}`} className="inline-flex items-center">
//                 <input
//                   {...register(`field_${field.id}`, validationRules)}
//                   type="radio"
//                   name={`field_${field.id}`} // Same name for the group of radio buttons
//                   value={option.value}
//                   className="h-4 w-4 text-blue-600 bg-white focus:ring-blue-500 border-gray-300"
//                 />
//                 <span className="ml-2">{option.label}</span>
//               </label>
//             ))}
//           </div>
//         );
//       case 'select':
//         return (
//           <div>
//             <select
//               {...register(`field_${field.id}`, validationRules)}
//               className={inputStyles}
//             >
//               {field.options?.map((option, idx) => (
//                 <option key={`${field.id}-select-${option.value}-${idx}`} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label className="block mb-2 font-medium">  {field.required && <span className="text-red-500 ml-1 text-lg">*</span>} {field.label}</label>
//       {renderInput()}
//       {errors[`field_${field.id}`] && (
//         <span className="text-red-600 text-sm mt-1 block">
//           {errors[`field_${field.id}`]?.message}
//         </span>
//       )}
//     </div>
//   );
// };

// export default PreviewField;


import React from 'react';
import { useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { evaluateConditions } from '../../utils/conditions';

const PreviewField = ({ field }) => {
  const fields = useSelector((state) => state.form.fields);
  const { register, formState: { errors }, watch } = useFormContext(); 
  
  // Watch all form values to check when they change
  const formValues = watch(); // Watch for form field changes
  
  // Check visibility based on current form values
  const isVisible = evaluateConditions(field, fields, formValues);

  if (!isVisible) return null; // If the field is not visible based on the conditions, return null

  // Get validation rules dynamically based on the field type
  const getValidationRules = (field) => {
    let validationRules = {};

    switch (field.type) {
      case 'text':
        validationRules = {
          required: field.required ? `${field.label} is required` : false,
          minLength: field.minLength ? { value: field?.minLength, message: `${field.label} must be at least ${field?.minLength} characters` } : undefined,
        };
        break;
      case 'number':
        validationRules = {
          required: field.required ? `${field.label} is required` : false,
          min: field.min ? { value: field.min, message: `${field.label} must be greater than or equal to ${field.min}` } : undefined,
        };
        break;
      case 'email':
        validationRules = {
          required: field.required ? `${field.label} is required` : false,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Please enter a valid email address',
          },
        };
        break;
      case 'date':
        validationRules = {
          required: field.required ? `${field.label} is required` : false,
        };
        break;
      case 'select':
        validationRules = {
          required: field.required ? `Please select ${field.label}` : false,
        };
        break;
      case 'checkbox':
        validationRules = {
          required: field.required ? `Please select at least one ${field.label}` : false,
        };
        break;
      case 'password':
        validationRules = {
          required: field.required ? `${field.label} is required` : false,  // Required validation
          minLength: field.minLength
            ? { value: field.minLength, message: `${field.label} must be at least ${field.minLength} characters` }
            : undefined,
          pattern: field.pattern
            ? { value: field.pattern, message: `Please enter a valid ${field.label}` }
            : undefined,
        };
        break;
      default:
        validationRules = {};
        break;
    }

    return validationRules;
  };

  // Render input based on the field type
  const renderInput = () => {
    const validationRules = getValidationRules(field); // Get validation rules dynamically
    const hasError = !!errors[`field_${field.id}`]; // Check if there's an error for the field

    const inputStyles = hasError
      ? 'w-full p-2 border bg-white border-red-500 rounded-md focus:outline-none focus:border-red-500'
      : 'w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500';

    switch (field?.type) {
      case 'text':
        return (
          <input
            {...register(`field_${field.id}`, validationRules)}
            type="text"
            className={inputStyles}
            placeholder={field.label}
          />
        );
      case 'number':
        return (
          <input
            {...register(`field_${field.id}`, validationRules)}
            type="number"
            className={inputStyles}
            placeholder={field.label}
          />
        );
      case 'email':
        return (
          <input
            {...register(`field_${field.id}`, validationRules)}
            type="email"
            className={inputStyles}
            placeholder={field.label}
          />
        );
      case 'password':
        return (
          <input
            {...register(`field_${field.id}`, validationRules)}
            type="password"
            className={inputStyles}
            placeholder={field.label}
          />
        );
      case 'date':
        return (
          <input
            {...register(`field_${field.id}`, validationRules)}
            type="date"
            className={inputStyles}
            placeholder={field.label}
          />
        );
      case 'checkbox':
        return (
          <div className="mt-2 flex gap-3">
            {field.options?.map((option, idx) => (
              <label key={`${field.id}-checkbox-${idx}`} className="inline-flex items-center">
                <input
                  {...register(`field_${field.id}`, validationRules)}
                  type="checkbox"
                  value={option.value}
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
                  {...register(`field_${field.id}`, validationRules)}
                  type="radio"
                  name={`field_${field.id}`} // Same name for the group of radio buttons
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
              {...register(`field_${field.id}`, validationRules)}
              className={inputStyles}
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

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">  
        {field.required && <span className="text-red-500 ml-1 text-lg">*</span>} 
        {field.label}
      </label>
      {renderInput()}
      {errors[`field_${field.id}`] && (
        <span className="text-red-600 text-sm mt-1 block">
          {errors[`field_${field.id}`]?.message}
        </span>
      )}
    </div>
  );
};

export default PreviewField;
