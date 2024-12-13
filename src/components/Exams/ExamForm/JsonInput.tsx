import React, { useState } from 'react';

interface JsonInputProps {
  onSubmit: (data: any) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

const JsonInput: React.FC<JsonInputProps> = ({ onSubmit, onClose, loading }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const examData = JSON.parse(jsonInput);
      await onSubmit(examData);
    } catch (error) {
      toast.error('Geçersiz JSON formatı');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">JSON Verisi</label>
        <textarea
          required
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`{
  "title": "Matematik Testi",
  "subject": "Matematik",
  "keywords": ["toplama", "çıkarma"],
  "grade": 1,
  "duration": 40,
  "difficulty": "Kolay",
  "questions": [
    {
      "text": "2 + 2 = ?",
      "options": ["3", "4", "5", "6"],
      "correct": "4"
    }
  ]
}`}
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
  );
};

export default JsonInput;