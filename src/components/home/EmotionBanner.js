import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EmotionRecommendPage() {
  const [inputText, setInputText] = useState('');
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const emotionDatabase = [
    {
      keywords: ['위로', '슬픔', '울적', '지침', '휴식', '힐링', '마음'],
      title: '싱 어 게인',
      genre: '드라마 / 음악',
      reason: '지친 마음을 부드럽게 감싸줄 따뜻한 음악과 위로가 담긴 영화예요.',
      poster: '/img/00/01.jpg'
    },
    {
      keywords: ['짜릿', '스릴', '긴장', '액션', '시원', '답답'],
      title: '오디세이',
      genre: 'SF / 어드벤처',
      reason: '답답한 일상을 날려버릴 압도적인 스케일과 몰입감을 선사합니다.',
      poster: '/img/00/04.jpg'
    },
    {
      keywords: ['설렘', '사랑', '로맨스', '기분좋아', '행복', '재미'],
      title: '아가씨',
      genre: '매혹 / 스릴러',
      reason: '눈을 뗄 수 없는 매혹적인 스토리로 기분 좋은 긴장감을 채워줄 거예요.',
      poster: '/img/00/02.jpg'
    }
  ];

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      alert('오늘의 감정을 간단히 적어주세요!');
      return;
    }

    setLoading(true);
    setRecommendedMovie(null);

    setTimeout(() => {
      let matched = emotionDatabase.find((item) =>
        item.keywords.some((keyword) => inputText.includes(keyword))
      );

      if (!matched) {
        matched = emotionDatabase[0];
      }

      setRecommendedMovie(matched);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="w-full bg-[#0b090e] min-h-screen py-12 px-6 text-white flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-purple-400 tracking-widest uppercase">MEGABOX EMOTION CARE</span>
          <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight">오늘의 감정에 영화를 선물하세요</h2>
          <p className="text-xs text-zinc-400 mt-2">오늘 느낀 감이나 기분을 적어주시면, 딱 맞는 상영작을 추천해 드려요.</p>
        </div>

        <form onSubmit={handleRecommend} className="bg-[#131924] border border-zinc-800 rounded-2xl p-6 shadow-xl mb-10">
          <label className="block text-xs font-bold text-zinc-300 mb-3">
            Q. 오늘 하루는 어떠셨나요? (예: "마음이 지치고 위로가 필요해", "짜릿한 액션이 보고 싶어")
          </label>
          <div className="flex gap-3">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="오늘의 감정을 자유롭게 적어보세요..." 
              className="flex-grow bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
            />
            <button 
              type="submit" 
              className="bg-[#503396] hover:bg-[#3b2570] text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shrink-0"
            >
              영화 추천받기
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-16 text-purple-400 font-bold animate-pulse text-sm">
            감정을 분석하여 어울리는 영화를 찾는 중입니다...
          </div>
        )}

        {recommendedMovie && !loading && (
          <div className="bg-gradient-to-br from-[#1a102f] to-[#131924] border border-purple-500/30 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-64 rounded-xl bg-zinc-800 overflow-hidden shadow-lg shrink-0 border border-purple-500/20 flex items-center justify-center">
              {recommendedMovie.poster ? (
                <img src={recommendedMovie.poster} alt={recommendedMovie.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-zinc-500">포스터 이미지</span>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-4 text-left w-full">
              <div>
                <span className="text-[11px] font-extrabold text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/50">
                  {recommendedMovie.genre}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-3 mb-1">
                  {recommendedMovie.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  "{recommendedMovie.reason}"
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Link 
                  to="/schedule" 
                  className="flex-grow text-center py-3 bg-[#00a086] hover:bg-[#008771] text-white font-bold text-xs rounded-xl transition shadow-md"
                >
                  상영시간표 확인하기
                </Link>
                <button 
                  onClick={() => setRecommendedMovie(null)} 
                  className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition"
                >
                  다시하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmotionRecommendPage;