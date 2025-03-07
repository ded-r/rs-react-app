import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearSelections } from '../redux/slices/selectedItemsSlice';
import { saveAs } from 'file-saver';

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  if (selectedItems.length === 0) return null;

  const handleDownload = () => {
    const headers = 'Name,URL';
    const csvContent = [
      headers,
      ...selectedItems.map(
        (item: { name: string; url: string }) => `${item.name},${item.url}`
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_selected.csv`);
  };

  return (
    <div className="fixed bottom-0 w-full p-4 dark:bg-gray-700 text-black bg-white border-t border-black dark:border-white dark:text-white flex justify-between">
      <p>{selectedItems.length} items selected</p>
      <div>
        <button
          onClick={() => dispatch(clearSelections())}
          className="mr-4 bg-red-500 px-4 py-2"
        >
          Unselect All
        </button>
        <button onClick={handleDownload} className="bg-blue-500 px-4 py-2">
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
