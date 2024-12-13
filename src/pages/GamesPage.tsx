import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Plus } from 'lucide-react';
import WordGameForm from '../components/Games/WordGameForm';
import { useWordCount } from '../hooks/useWordCount';
import toast from 'react-hot-toast';
import axios from 'axios';

const GamesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [wordCount,setWordCount] = useState(0);

  const handleWordSubmit = async (words: string[]) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://teacher-assistant-server-0a050558c608.herokuapp.com/api/games/words',
        { words },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Kelimeler başarıyla eklendi');
      setWordCount(response?.data.totalWords)
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Kelimeler eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
      const getWordCount = async ()=>{
        try {
      const response = await axios.get(
        'https://teacher-assistant-server-0a050558c608.herokuapp.com/api/games/words',
      );

          console.log(response)
          setWordCount(response?.data.totalWords)

    } catch (error) {
      toast.error("Kelimeler alınırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

    getWordCount();
  },[])



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Oyunlar</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>Yeni Kelime Listesi</span>
        </button>
      </div>

      {isFormOpen && (
        <WordGameForm
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleWordSubmit}
          loading={loading}
        />
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Kelime Oyunu</h2>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Bu bölümde kelime oyunu için yeni kelimeler ekleyebilirsiniz. Eklenen kelimeler öğrencilerin
            kelime dağarcığını geliştirmek için kullanılacaktır.
          </p>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <span className="font-semibold">{wordCount || 0}</span> kelime
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;