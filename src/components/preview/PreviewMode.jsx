// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useForm, FormProvider } from 'react-hook-form';
// import PreviewField from './PreviewField';
// import PreviewToggle from './PreviewToggle';

// const PreviewMode = () => {
//   const fields = useSelector((state) => state.form.fields);
//   const buttons = useSelector((state) => state.form.buttons);
//   const methods = useForm();

//   const onSubmit = (data) => {
//     console.log('Form submitted:', data);
//   };

//   return (
//     <div className="bg-gray-100 p-5 rounded-lg border shadow-md">
//       <PreviewToggle />
//       <FormProvider {...methods}>
//         <div className='max-w-[80.5rem] mx-auto bg-white shadow-sm p-7 rounded-lg overflow-y-auto h-form-area'>
//           <form
//             onSubmit={methods.handleSubmit(onSubmit)}
//             className="grid grid-cols-2 gap-4 w-full"
//           >
//             {fields.map((field) => (
//               <PreviewField key={field.id} field={field} />
//             ))}
//             {/* Full-width button */}
//             <div className="col-span-2 flex justify-end gap-4">
//               {([...buttons].sort((a, b) => (a === 'submit' ? 1 : b === 'submit' ? -1 : 0)))
//                 .map((btnType, idx) => (
//                   <button
//                     key={idx}
//                     type={btnType === 'submit' ? 'submit' : 'button'}
//                     onClick={
//                       btnType === 'reset'
//                         ? () => methods.reset()
//                         : btnType === 'clear'
//                           ? () => methods.reset({})
//                           : () => console.log('Form canceled')
//                     }
//                     className={`
//                        ms-0 px-5 py-2
//                        ${btnType === 'submit' ?
//                         'bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500 duration-500' : btnType === 'reset' ?
//                           'bg-gray-500 border border-gray-500 text-white hover:bg-white hover:text-gray-500 duration-500' :
//                           btnType === 'clear' ?
//                             'bg-yellow-500 border border-yellow-500 hover:bg-white hover:text-yellow-500 duration-500' :
//                             'bg-red-500 border border-red-500 hover:bg-white hover:text-red-500 duration-500'}
//                            text-white rounded-lg`}
//                   >
//                     {btnType.charAt(0).toUpperCase() + btnType.slice(1)}
//                   </button>
//                 ))}
//             </div>
//           </form>
//         </div>
//       </FormProvider>
//     </div>
//   );
// };

// export default PreviewMode;


import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import PreviewField from './PreviewField';
import PreviewToggle from './PreviewToggle';

const PreviewMode = () => {
  const fields = useSelector((state) => state.form.fields);
  const buttons = useSelector((state) => state.form.buttons);
  const methods = useForm();


  const reorderFields = (fields) => {
    // Create a map of all fields by their ID for quick lookup
    const fieldsMap = fields.reduce((acc, field) => {
      acc[field.id] = field;
      return acc;
    }, {});

    // To ensure the correct order, we need to build the reordered array
    let reorderedFields = [];
    let visited = new Set();

    // Helper function to process a field
    const processField = (field) => {
      if (visited.has(field.id)) return; // If already processed, skip
      visited.add(field.id);

      // Process conditions to ensure sourceFields are added first
      field.conditions.forEach(condition => {
        const sourceField = fieldsMap[condition.sourceField];
        if (sourceField && !visited.has(sourceField.id)) {
          processField(sourceField); // Recursively process the sourceField first
        }
      });

      reorderedFields.push(field); // Add the current field after processing its sourceFields
    }

    // Process each field in the original order
    fields.forEach(field => processField(field));

    return reorderedFields;
  }

  const reorderedFields = reorderFields(fields);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };


  return (
    <div className="bg-gray-100 p-5 rounded-lg border shadow-md">
      <PreviewToggle />
      <FormProvider {...methods}>
        <div className='max-w-[80.5rem] mx-auto bg-white shadow-sm p-7 rounded-lg overflow-y-auto h-form-area'>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 w-full"
          >
            {JSON.parse(JSON.stringify(reorderedFields, null, 2))?.map((field) => (
              <PreviewField key={field.id} field={field} />
            ))}
            {/* Full-width button */}
            <div className="col-span-2 flex justify-end gap-4">
              {([...buttons].sort((a, b) => (a === 'submit' ? 1 : b === 'submit' ? -1 : 0)))
                .map((btnType, idx) => (
                  <button
                    key={idx}
                    type={btnType === 'submit' ? 'submit' : 'button'}
                    onClick={
                      btnType === 'reset'
                        ? () => methods.reset()
                        : btnType === 'cancel'
                          ? () => methods.reset()
                          : null
                    }
                    className={`
                       ms-0 px-5 py-2
                       ${btnType === 'submit' ?
                        'bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500 duration-500' : btnType === 'reset' ?
                          'bg-gray-500 border border-gray-500 text-white hover:bg-white hover:text-gray-500 duration-500' :
                          btnType === 'clear' ?
                            'bg-yellow-500 border border-yellow-500 hover:bg-white hover:text-yellow-500 duration-500' :
                            'bg-red-500 border border-red-500 hover:bg-white hover:text-red-500 duration-500'}
                           text-white rounded-lg`}
                  >
                    {btnType.charAt(0).toUpperCase() + btnType.slice(1)}
                  </button>
                ))}
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default PreviewMode;
