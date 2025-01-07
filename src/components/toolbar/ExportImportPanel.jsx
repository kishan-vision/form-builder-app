import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { importFormConfig } from '../../redux/formSlice';
import { LuFileJson2 } from 'react-icons/lu';
import { FaFileImport } from 'react-icons/fa6';

const ExportImportPanel = ({ showButtonKey }) => {
  const dispatch = useDispatch();
  const formConfig = useSelector((state) => state.form.fields);
  const buttons = useSelector((state) => state.form.buttons);

  const handleExport = () => {
    const config = JSON.stringify({ fields: formConfig, buttons: buttons }, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          dispatch(importFormConfig(config));
        } catch (error) {
          console.error('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="border-gray-300">
      {
        showButtonKey === 'Export' &&
        <button
          onClick={handleExport}
          className="bg-green flex items-center gap-2 text-white py-2 px-4 border border-green rounded-md m-1 cursor-pointer hover:bg-white hover:text-green duration-500"
        >
          <LuFileJson2 size={20} /> Export
        </button>
      }
      {
        showButtonKey === 'Import' &&
        <button
          onClick={() => document.getElementById('import-config').click()}
          className="bg-white flex items-center justify-center gap-2 w-40 text-black py-2 px-4 rounded-md m-1 border border-black cursor-pointer hover:bg-black hover:text-white duration-500"
        >
           <FaFileImport /> Import
        </button>
      }

      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
        id="import-config"
      />
    </div>
  );
};

export default ExportImportPanel;
