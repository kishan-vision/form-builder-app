import { useDispatch, useSelector } from 'react-redux';
import PreviewMode from './components/preview/PreviewMode';
import FormBuilder from './components/FormBuilder';
import { Fragment } from 'react';
import { MdPreview } from 'react-icons/md';
import { togglePreviewMode } from './redux/formSlice';
import ExportImportPanel from './components/toolbar/ExportImportPanel';

function AppContent() {
  const isPreviewMode = useSelector((state) => state.form.isPreviewMode);
  return isPreviewMode ? <PreviewMode /> : <FormBuilder />;
}

const App = () => {
  const dispatch = useDispatch();

  const handleChangeMode = () => {
    dispatch(togglePreviewMode(true));
  }

  return (
    <Fragment>
      <header className="bg-white shadow-lg border border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className='flex justify-between'>
            <h1 className="text-3xl font-bold text-gray-900">Form Builder</h1>
            <div className='flex items-center gap-4'>
              <ExportImportPanel showButtonKey={'Import'} />
              <button onClick={handleChangeMode} className="text-white flex border flex-row items-center gap-2 rounded-lg py-2 px-4 bg-slate-900 ">
                <MdPreview size={24} color='#fff' />  Preview Mode
              </button>
            </div>
          </div>
        </div>
      </header>
      <AppContent />
    </Fragment>
  );
}

export default App;