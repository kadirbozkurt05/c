import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import JsonInput from './JsonInput';
import StandardForm from './StandardForm';

interface ExamFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [useJson, setUseJson] = useState(false);

  const handleSubmit = async (examData: any) => {
    setLoading(true);
    try {
      await axios.post(
        'https://teacher-assistant-server-0a050558c608.herokuapp.com/api/exams',
        examData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Sınav başarıyla eklendi');
      onSuccess();
    } catch (error) {
      toast.error('Sınav eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Yeni Sınav Ekle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useJson}
              onChange={(e) => setUseJson(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>JSON formatında giriş yap</span>
          </label>
        </div>

        {useJson ? (
          <JsonInput onSubmit={handleSubmit} onClose={onClose} loading={loading} />
        ) : (
          <StandardForm onSubmit={handleSubmit} onClose={onClose} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default ExamForm;