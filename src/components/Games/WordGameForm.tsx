import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WordGameFormProps {
  onClose: () => void;
  onSubmit: (words: string[]) => void;
  loading: boolean;
}

const WordGameForm: React.FC<WordGameFormProps> = ({ onClose, onSubmit, loading }) => {
  const [wordInput, setWordInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const words = wordInput.split('\n').map(word => word.trim()).filter(word => word !== '');
    onSubmit(words);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Kelime Listesi Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kelimeler (Her satıra bir kelime)
            </label>
            <textarea
              required
              rows={10}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="elma&#10;armut&#10;kiraz&#10;muz"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Ekleniyor...' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WordGameForm;