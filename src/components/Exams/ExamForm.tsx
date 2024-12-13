import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { X, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ExamFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [useJson, setUseJson] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    keywords: '',
    grade: 1,
    duration: 40,
    difficulty: 'Kolay',
    questions: [{ text: '', options: ['', '', '', ''], correct: '' }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let examData;
      if (useJson) {
        try {
          examData = JSON.parse(jsonInput);
        } catch (error) {
          toast.error('Geçersiz JSON formatı');
          setLoading(false);
          return;
        }
      } else {
        examData = {
          ...formData,
          keywords: formData.keywords.split(',').map(k => k.trim()),
        };
      }

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

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { text: '', options: ['', '', '', ''], correct: '' }]
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {useJson ? (
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
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Başlık</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ders</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Anahtar Kelimeler</label>
                  <input
                    type="text"
                    required
                    placeholder="Virgülle ayırın"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sınıf</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Süre (dakika)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Zorluk</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option>Kolay</option>
                    <option>Orta</option>
                    <option>Zor</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Sorular</h3>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus size={20} />
                    <span>Soru Ekle</span>
                  </button>
                </div>

                {formData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Soru {qIndex + 1}</h4>
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Soru Metni</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={question.text}
                          onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex}>
                            <label className="block text-sm font-medium text-gray-700">
                              Seçenek {oIndex + 1}
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options];
                                newOptions[oIndex] = e.target.value;
                                handleQuestionChange(qIndex, 'options', newOptions);
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Doğru Cevap</label>
                        <select
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={question.correct}
                          onChange={(e) => handleQuestionChange(qIndex, 'correct', e.target.value)}
                        >
                          <option value="">Seçiniz</option>
                          {question.options.map((option, oIndex) => (
                            <option key={oIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

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

export default ExamForm;