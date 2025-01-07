import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToolboxPanel from './ToolboxPanel';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';

const FormBuilder = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid xxl:grid-cols-12 xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 grid-cols-12 gap-5 p-5 bg-gray-100">
        <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-5 md:col-span-12 col-span-12 flex flex-col overflow-y-auto">
          <ToolboxPanel />
        </div>

        <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-7 md:col-span-12 col-span-12 flex flex-col">
          <BuilderCanvas />
        </div>

        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-12 col-span-12 flex flex-col">
          <PropertiesPanel />
        </div>
      </div>

    </DndProvider>
  );
};

export default FormBuilder;
