import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FloatingEmotionBar({ movies = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState('');
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmotion = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    if (t.includes('위로') || t.includes('우울') || t.includes('슬픔') || t.includes('힘들') || t.includes('지침')) return [18, 10751]; 
    if (t.includes('웃음') || t.includes('코미디') || t.includes('재밌') || t.includes('즐거')) return [35, 16]; 
    if (t.includes('짜릿') || t.includes('액션') || t.includes('스트레스') || t.includes('스릴')) return [28, 53, 27]; 
    if (t.includes('설렘') || t.includes('사랑') || t.includes('로맨스') || t.includes('달달')) return [10749]; 
    return []; 
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      alert('오늘의 감정을 조금만 적어주세요!');
      return;
    }
    
    setLoading(true);
    setRecommendedMovie(null);

    setTimeout(() => {
      let chosen = null;
      let targetGenres = analyzeEmotion(inputText);
      let reasonData = "";

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
            : `현재 상영작 중 누적 평점 ${rating}점으로 가장 호평받고 있는 추천작입니다.`;
        }
      }

      if (!chosen) {
        chosen = { title: '상영작 데이터 없음', poster_path: null, vote_average: 0 };
        reasonData = "데이터를 불러오지 못했습니다.";
      }

      chosen.reasonData = reasonData;
      setRecommendedMovie(chosen);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      {/* 💡 화사한 화이트 투명 글래스모피즘 톤으로 변경 */}
      <div 
        className={`bg-white/80 backdrop-blur-2xl border border-zinc-200/80 border-b-0 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden ${
          isExpanded ? 'h-[460px]' : 'h-16'
        }`}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        
        {/* 1. 축소 상태 (클릭 시 토글) */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="h-16 shrink-0 w-full flex items-center justify-center gap-3 hover:bg-zinc-50/50 transition-colors group"
        >
          {/* 💡 ✨ 이모지 삭제 완료 */}
          <span className="text-zinc-800 font-bold text-sm tracking-wide group-hover:text-[#623ce4] transition-colors">
            오늘의 감정에 영화를 선물하세요
          </span>
          <svg 
            className={`w-4 h-4 text-zinc-400 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* 2. 확장 상태 (입력창 및 결과창) */}
        <div className={`flex-1 overflow-hidden transition-opacity duration-500 ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0'}`}>
          <div className="p-8 pt-4 h-full flex flex-col items-center justify-start">
            
            {!recommendedMovie && !loading && (
              <div className="w-full flex flex-col items-center animate-fade-in">
                {/* 텍스트 영역 */}
                <div className="text-center space-y-2 mb-8">
                  <span className="text-[10px] font-black tracking-widest text-[#623ce4] uppercase bg-[#f5f3ff] px-3 py-1 rounded-full border border-purple-100">
                    Megabox Emotion Care
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight pt-2">오늘의 감정에 영화를 선물하세요</h2>
                  <p className="text-xs text-zinc-500 font-medium">오늘 느낀 감정이나 기분을 적어주시면, 딱 맞는 상영작을 추천해 드려요.</p>
                </div>

                {/* 입력창 영역 (화이트톤에 맞춘 깔끔한 스타일) */}
                <div className="bg-[#fafafa] rounded-3xl p-6 border border-zinc-200/80 shadow-sm w-full max-w-3xl">
                  <label className="block text-xs font-bold text-zinc-700 mb-3">
                    Q. 오늘 하루는 어떠셨나요? <span className="text-zinc-400 font-normal">(예: "마음이 지치고 위로가 필요해", "짜릿한 액션이 보고 싶어")</span>
                  </label>
                  <form onSubmit={handleRecommend} className="flex gap-3">
                    <div className="flex-1 flex items-center bg-white border border-zinc-200 rounded-2xl px-4 focus-within:border-[#623ce4] focus-within:ring-1 focus-within:ring-[#623ce4] transition-all">
                      <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full bg-transparent py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none font-medium" 
                        placeholder="오늘의 감정을 자유롭게 적어보세요..." 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-sm rounded-2xl transition-colors shadow-md shrink-0"
                    >
                      영화 추천받기
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 로딩 상태 */}
            {loading && (
              <div className="h-full flex items-center justify-center text-[#503396] font-bold animate-pulse text-sm">
                감정을 분석하여 가장 잘 어울리는 영화를 큐레이션 중입니다...
              </div>
            )}

            {/* 추천 결과 뷰 (화이트 카드 스타일) */}
            {recommendedMovie && !loading && (
              <div className="w-full max-w-3xl bg-white border border-zinc-100 rounded-3xl p-6 flex items-center gap-6 animate-fade-in shadow-xl">
                
                {/* 포스터 */}
                <div className="w-28 h-40 rounded-2xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                  {recommendedMovie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${recommendedMovie.poster_path}`} alt="poster" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400">No Image</div>
                  )}
                </div>

                {/* 결과 내용 */}
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-[#623ce4] mb-1">맞춤형 추천 영화</span>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2">{recommendedMovie.title}</h3>
                  
                  {/* 평점 표시 */}
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-sm font-bold text-zinc-800">
                      {(recommendedMovie.vote_average || 0).toFixed(1)} <span className="text-zinc-400 font-normal">/ 10</span>
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed bg-[#f8f9fa] p-3 rounded-xl border border-zinc-100 shadow-inner">
                    {recommendedMovie.reasonData}
                  </p>
                  
                  <div className="flex gap-3 mt-4">
                    <Link to="/schedule" className="flex-1 text-center py-2.5 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-xs rounded-xl transition-colors shadow-sm">
                      상영시간표 및 예매하기
                    </Link>
                    <button onClick={() => { setRecommendedMovie(null); setInputText(''); }} className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl transition-colors border border-zinc-200">
                      다시하기
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingEmotionBar;