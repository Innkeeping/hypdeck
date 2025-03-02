import React from 'react';
import type { ActionDialogState } from './types';

interface ActionDialogProps {
  showActionDialog: ActionDialogState | null;
  setShowActionDialog: (dialog: ActionDialogState | null) => void;
  handleAddToExisting: () => void;
  handleReplace: () => void;
}

export const ActionDialog: React.FC<ActionDialogProps> = ({
  showActionDialog,
  setShowActionDialog,
  handleAddToExisting,
  handleReplace,
}) => {
  if (!showActionDialog) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">
          Configure Options
        </h3>
        <p className="text-gray-300 mb-6">
          There's already a configuration in this terminal. What would you like to do?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowActionDialog(null)}
            className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToExisting}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded-md"
          >
            Add to Existing
          </button>
          <button
            onClick={handleReplace}
            className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md"
          >
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};