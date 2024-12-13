import React, { useState } from 'react';
import { Exam } from '../../types';
import { Clock, BookOpen, BarChart, Trash2 } from 'lucide-react';
import DeleteConfirmation from '../common/DeleteConfirmation';

interface ExamListProps {
  exams: Exam[];
  isLoading: boolean;
  onDelete: (examId: string) => void;
}

const ExamList: React.FC<ExamListProps> = ({ exams, isLoading, onDelete }) => {
  const [deleteExamId, setDeleteExamId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz sınav eklenmemiş.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{exam.title}</h3>
                <button
                  onClick={() => setDeleteExamId(exam._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <BookOpen size={18} className="mr-2" />
                  <span>{exam.subject}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <span>{exam.duration} dakika</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <BarChart size={18} className="mr-2" />
                  <span>{exam.difficulty}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Sınıf:</span> {exam.grade}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Soru Sayısı:</span> {exam.questionCount}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {exam.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={!!deleteExamId}
        onClose={() => setDeleteExamId(null)}
        onConfirm={() => {
          if (deleteExamId) {
            onDelete(deleteExamId);
            setDeleteExamId(null);
          }
        }}
        title="Sınavı Sil"
        message="Bu sınavı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </>
  );
};

export default ExamList;