import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EmotionRecommendPage({ movies = [] }) {
  const [inputText, setInputText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const emotionOptions = [
    { id: 'comfort', label: '나는 오늘 위로가 필요해' },
    { id: 'laugh', label: '나는 오늘 웃음이 필요해' },
    { id: 'thrill', label: '나는 오늘 짜릿한 자극이 필요해' },
    { id: 'romance', label: '나는 오늘 설렘이 필요해' }
  ];

  const analyzeEmotion = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    if (t.includes('위로') || t.includes('우울') || t.includes('슬픔') || t.includes('힘들') || t.includes('눈물') || t.includes('지침')) return [18, 10751]; 
    if (t.includes('웃음') || t.includes('코미디') || t.includes('재밌') || t.includes('즐거') || t.includes('유쾌')) return [35, 16]; 
    if (t.includes('짜릿') || t.includes('액션') || t.includes('스트레스') || t.includes('스릴') || t.includes('답답')) return [28, 53, 27]; 
    if (t.includes('설렘') || t.includes('사랑') || t.includes('로맨스') || t.includes('달달')) return [10749]; 
    return []; 
  };

  const handleRecommend = (emotionText) => {
    if (!emotionText.trim()) {
      alert('오늘의 기분이나 감정을 간단히 적어주세요.');
      return;
    }
    
    setSelectedEmotion(emotionText);
    setLoading(true);
    setRecommendedMovie(null);

    setTimeout(() => {
      let chosen = null;
      let targetGenres = analyzeEmotion(emotionText);
      let reasonData = "";
      let mockReview = "";

      if (movies && movies.length > 0) {
        let scoredMovies = movies.map(m => {
          let score = 0;
          if (m.genre_ids && targetGenres.length > 0) {
            const matchCount = m.genre_ids.filter(id => targetGenres.includes(id)).length;
            score += matchCount * 50; 
          }
          score += (m.vote_average || 0); 
          score += Math.random() * 15; 
          return { ...m, matchScore: score };
        });

        scoredMovies.sort((a, b) => b.matchScore - a.matchScore);
        chosen = scoredMovies[0];

        if (chosen) {
          const rating = (chosen.vote_average || 0).toFixed(1);
          const isMatched = targetGenres.length > 0 && chosen.matchScore > 20;
          
          reasonData = isMatched 
            ? `입력하신 감정 키워드와 완벽히 부합하는 장르의 웰메이드 영화입니다.` 
            : `현재 상영작 중 대중에게 가장 많은 호평을 받고 있는 추천작입니다.`;

          mockReview = targetGenres.includes(35) ? "보는 내내 웃음이 끊이지 않았어요. 스트레스가 해소되는 기분입니다." :
                       targetGenres.includes(10749) ? "분위기와 영상미가 훌륭해서 마음이 따뜻해지는 시간이었습니다." :
                       targetGenres.includes(28) ? "시원한 전개와 액션 타격감이 몰입도를 높여주어 좋았습니다." :
                       targetGenres.includes(18) ? "깊은 여운과 위로를 남기는 스토리 라인이 인상적인 영화입니다." :
                       "시간 가는 줄 모르고 감상했습니다. 후회 없는 훌륭한 선택이었습니다.";
        }
      }

      if (!chosen) {
        chosen = {
          title: '불러올 수 있는 상영작이 없습니다',
          overview: '영화 데이터를 안정적으로 불러왔는지 확인해 주세요.',
          poster_path: null,
          vote_average: 0
        };
        reasonData = "데이터 연결 지연 상태입니다.";
        mockReview = "영화 정보를 가져오지 못했습니다.";
      }

      chosen.reasonData = reasonData;
      chosen.mockReview = mockReview;

      setRecommendedMovie(chosen);
      setLoading(false);
    }, 800);
  };

  return (
    <div 
      /* 💡 iMac 바탕화면 느낌의 화사한 다채로운 그라데이션 배경 적용 */
      className="w-full min-h-screen py-16 px-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-zinc-900" 
      style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* 1. 메인 콘텐츠 영역 (애플 스타일의 고투명 유리 질감) */}
        <div className="flex-1 w-full bg-white/30 backdrop-blur-3xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>

          <div className="text-center space-y-3 relative z-10 mb-10">
            <span className="inline-block text-[11px] font-black tracking-widest text-[#503396] uppercase bg-white/60 px-4 py-1.5 rounded-full border border-white shadow-sm">
              MEGABOX EMOTION CARE
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
              오늘의 감정에 맞는 영화를 골라드려요
            </h2>
            <p className="text-sm text-zinc-700 font-medium">
              오늘 당신의 마음을 자유롭게 들려주세요. 당신의 감정을 따뜻하게 보살펴 줄 영화를 찾아드릴게요.
            </p>
          </div>

          <div className="relative z-10 w-full mb-8">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleRecommend(inputText); }} 
              className="flex items-center bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl shadow-sm p-2 focus-within:shadow-md focus-within:bg-white/60 transition-all"
            >
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="오늘 하루는 어떠셨나요?" 
                className="flex-grow bg-transparent px-4 py-2 text-sm text-zinc-900 placeholder-zinc-500 font-bold focus:outline-none"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-sm rounded-lg transition shadow-md shrink-0"
              >
                분석 및 추천
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 relative z-10 opacity-60 mb-8">
            <div className="flex-1 h-px bg-zinc-400"></div>
            <span className="text-xs text-zinc-700 font-bold">또는 아래에서 선택해보세요</span>
            <div className="flex-1 h-px bg-zinc-400"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {emotionOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setInputText(''); 
                  handleRecommend(option.label);
                }}
                className={`p-5 rounded-xl text-center font-bold text-sm transition-all duration-300 backdrop-blur-2xl border ${
                  selectedEmotion === option.label
                    ? 'bg-white/80 text-[#503396] border-white shadow-lg scale-[1.02]' 
                    : 'bg-white/20 hover:bg-white/40 text-zinc-800 border-white/50 shadow-sm'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-16 text-[#503396] font-bold animate-pulse text-sm relative z-10">
              데이터를 분석하여 가장 어울리는 영화를 찾는 중입니다...
            </div>
          )}

          {/* 💡 추천 결과 카드: 중앙 배치 및 API 평점 표시 강조 */}
          {recommendedMovie && !loading && (
            <div className="bg-white/50 backdrop-blur-3xl border border-white/70 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center max-w-lg mx-auto animate-fade-in relative z-10 mt-12">
              
              <div className="w-44 h-64 mb-5 rounded-xl bg-zinc-200 overflow-hidden shadow-xl shrink-0 border border-white flex items-center justify-center">
                {recommendedMovie.poster_path || recommendedMovie.backdrop_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path || recommendedMovie.backdrop_path}`} 
                    alt={recommendedMovie.title} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-xs text-zinc-500 font-bold">포스터 없음</span>
                )}
              </div>

              <div className="flex flex-col space-y-4 w-full items-center">
                <div>
                  <span className="text-[11px] font-bold text-white bg-[#503396] px-3 py-1 rounded-md shadow-sm mb-3 inline-block">
                    분석 완료 매칭작
                  </span>
                  <h3 className="text-2xl font-black text-zinc-900 mt-1 mb-1 leading-tight">
                    {recommendedMovie.title}
                  </h3>
                  {/* 💡 API에서 가져온 평점을 별점과 함께 가독성 있게 표시 */}
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-sm font-black text-zinc-800">
                      {(recommendedMovie.vote_average || 0).toFixed(1)} <span className="text-zinc-500 font-medium">/ 10</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white/50 rounded-lg p-5 border border-white/60 shadow-sm space-y-4 w-full text-center mt-2">
                  <div>
                    <span className="block text-xs font-bold text-[#503396] mb-1">추천 데이터 분석</span>
                    <span className="text-sm text-zinc-800 font-medium leading-relaxed">
                      {recommendedMovie.reasonData}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/80"></div>
                  <div>
                    <span className="block text-xs font-bold text-[#503396] mb-1">비슷한 감정의 관람객 후기</span>
                    <span className="text-sm text-zinc-800 font-medium leading-relaxed">
                      "{recommendedMovie.mockReview}"
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 w-full justify-center">
                  <button 
                    onClick={() => { setSelectedEmotion(null); setRecommendedMovie(null); setInputText(''); }} 
                    className="px-8 py-3 bg-white/70 hover:bg-white text-zinc-800 font-bold text-sm rounded-lg transition shadow-sm border border-white"
                  >
                    초기화
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 2. 우측 스크롤 고정(Sticky) 직사각형 박스 */}
        <div className="w-full lg:w-72 shrink-0 sticky top-28">
          <div className="bg-white/30 backdrop-blur-3xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-lg p-8 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>
            
            <h3 className="text-lg font-black text-zinc-900 mb-3 relative z-10">영화 예매하기</h3>
            <p className="text-sm text-zinc-700 font-medium mb-8 leading-relaxed relative z-10">
              추천받은 영화가 마음에 드셨나요?<br/>
              지금 바로 빠르고 간편하게 예매하세요.
            </p>
            <Link 
              to="/schedule" 
              className="w-full py-4 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-sm rounded-lg transition shadow-md relative z-10"
            >
              바로 예매하러 가기
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmotionRecommendPage;