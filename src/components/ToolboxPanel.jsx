import React from 'react';
import { useDrag } from 'react-dnd';
import { FaFont, FaList, FaCheck, FaCalendar, FaHashtag } from 'react-icons/fa';
import { FiCheckSquare, FiSend } from 'react-icons/fi';
import { IoList } from 'react-icons/io5';
import { LuCircleDot, LuRotateCcw } from 'react-icons/lu';
import { MdOutlineCancel, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RxText } from 'react-icons/rx';
import { TbLockPassword } from 'react-icons/tb';

const formElements = [
  { type: 'label', icon: FaFont, label: 'label' },
  { type: 'text', label: 'Text Input', icon: RxText },
  { type: 'email', label: 'Email', icon: MdOutlineMarkEmailRead },
  { type: 'password', label: 'Password', icon: TbLockPassword },
  { type: 'select', label: 'Dropdown', icon: FaList },
  { type: 'checkbox', label: 'Checkbox', icon: FaCheck },
  { type: 'date', label: 'Date Picker', icon: FaCalendar },
  { type: 'number', icon: FaHashtag, label: 'Number' },
  { type: 'checkbox', icon: FiCheckSquare, label: 'Checkbox' },
  { type: 'select', icon: IoList, label: 'Select' },
  { type: 'radio', icon: LuCircleDot, label: 'Radio' },
  // Button Types
  { type: 'submit', icon: FiSend, label: 'Submit Button' },
  { type: 'reset', icon: LuRotateCcw, label: 'Reset Button' },
  { type: 'cancel', icon: MdOutlineCancel, label: 'Cancel Button' },
];

const DraggableItem = ({ type, label, Icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'formElement',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-white rounded-lg shadow-sm border cursor-move hover:border-blue-500 border-gray-300 flex items-center gap-2 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Icon />
      {label}
    </div>
  );
};

const ToolboxPanel = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm h-builder-canvas-area overflow-y-auto border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Form Elements</h2>
      <div className="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-4">
        {formElements.map((element) => (
          <DraggableItem
            key={element.type}
            type={element.type}
            label={element.label}
            Icon={element.icon}
          />
        ))}
      </div>
      {/* {formElements.map((element) => (
        <DraggableItem
          key={element.type}
          type={element.type}
          label={element.label}
          Icon={element.icon}
        />
      ))} */}
    </div>
  );
};

export default ToolboxPanel;
