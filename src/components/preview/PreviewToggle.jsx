import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePreviewMode } from '../../redux/formSlice';
import { IoCaretBackCircleOutline } from 'react-icons/io5';

const PreviewToggle = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(togglePreviewMode())}
      className="bg-white py-2 order-none px-3 border border-gray-200 rounded-lg mb-5 cursor-pointer"
    >
      <IoCaretBackCircleOutline size={26} />
    </button>
  );
};

export default PreviewToggle;
