  import React, { Fragment } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { useDrop } from 'react-dnd';
  import { useForm } from 'react-hook-form';
  import { addButton, addField, setSelectedField } from '../redux/formSlice';
  import FormField from './FormField';
  import ExportImportPanel from './toolbar/ExportImportPanel';

  const BuilderCanvas = () => {
    const { handleSubmit, reset } = useForm();
    const fields = useSelector((state) => state.form.fields);
    const buttons = useSelector((state) => state.form.buttons);
    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'formElement',
      drop: (item) => {
        if (['submit', 'reset', 'clear', 'cancel'].includes(item.type)) {
          dispatch(addButton(item.type));
        } else {
          dispatch(
            addField({
              label: item.label,
              type: item.type,
              required: false,
              options: ['select', 'radio', 'checkbox'].includes(item.type)
                ? [{ label: 'Option 1', value: 'Option 1' }, { label: 'Option 2', value: 'Option 2' }]
                : null,
            })
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    const handleSubmitForm = (data) => {
      console.log(data, "data")
    }

    return (
      <div className='bg-white p-5 rounded-lg h-builder-canvas-area border border-gray-200 overflow-y-auto flex flex-col justify-between' ref={drop} style={{ background: isOver ? '#f8f9fa' : 'white' }}>
        {fields?.length === 0 ? (
          <div className='flex items-center justify-center h-full text-slate-800'>Drag and drop form elements here</div>
        ) : (
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-4">
              {
                fields?.map((field) => (
                  <Fragment key={field.id}>
                    <div className="field-wrapper">
                      <FormField
                        field={field}
                        buttonsAdded={buttons}
                        onClick={() => dispatch(setSelectedField(field.id))}
                      />
                    </div>
                  </Fragment>
                ))
              }
              <div className='flex justify-end'>
                {buttons?.map((btnType, idx) => (
                  <button
                    key={idx}
                    type={btnType === 'submit' ? 'submit' : 'button'}
                    onClick={btnType === 'reset' ? () => reset() : btnType === 'clear' ? () => reset({}) : () => console.log('Form canceled')}
                    className={`
                      m-4 ms-0 px-5 py-2
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
            </div>
          </form>
        )}
        <div className='flex items-end justify-end'>
          <ExportImportPanel showButtonKey={'Export'} />
        </div>
      </div>
    );
  };

  export default BuilderCanvas;
