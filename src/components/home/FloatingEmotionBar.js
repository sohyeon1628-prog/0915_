import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FloatingEmotionBar({ movies = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nickname, setNickname] = useState('');
  const [inputText, setInputText] = useState('');
  const [recommendedMovie, setRecommendedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmotion = (text) => {
    if (!text) return [];
    const t = text.toLowerCase();
    if (t.includes('위로') || t.includes('우울') || t.includes('슬픔') || t.includes('힘들') || t.includes('지침') || t.includes('눈물') || t.includes('상사') || t.includes('스트레스')) return [18, 10751]; 
    if (t.includes('웃음') || t.includes('코미디') || t.includes('재밌') || t.includes('즐거')) return [35, 16]; 
    if (t.includes('짜릿') || t.includes('액션') || t.includes('스릴')) return [28, 53, 27]; 
    if (t.includes('설렘') || t.includes('사랑') || t.includes('로맨스') || t.includes('달달')) return [10749]; 
    return []; 
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요!');
      return;
    }
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
          const rating = (chosen.vote_average || 8.5).toFixed(1);
          const movieTitle = chosen.title || "이 영화";

          // 💡 닉네임과 사용자가 입력한 감정 키워드를 다정하게 녹여낸 맞춤 위로 멘트 (실제 API 평점 포함)
          if (targetGenres.includes(18) || targetGenres.includes(10751)) {
            reasonData = `"${inputText}"라며 마음고생 많았을 ${nickname}님, 오늘 하루 정말 수고 많았어요. 툭툭 털어버릴 수 있게 잔잔한 위로를 건네는 <${movieTitle}>와 함께 잠시 쉬어가세요. (실관람 평점 ${rating}점)`;
          } else if (targetGenres.includes(35) || targetGenres.includes(16)) {
            reasonData = `"${inputText}" 하며 웃고 싶었던 ${nickname}님을 위해 준비했어요! 극장 나오는 길엔 근심 걱정 다 잊고 환하게 웃게 되실 <${movieTitle}>를 추천해 드릴게요. (실관람 평점 ${rating}점)`;
          } else if (targetGenres.includes(28) || targetGenres.includes(53) || targetGenres.includes(27)) {
            reasonData = `"${inputText}"로 답답했던 속을 시원하게 뻥 뚫어줄 시간이에요! 압도적인 몰입감을 선사하는 <${movieTitle}> 속으로 ${nickname}님을 초대합니다. (실관람 평점 ${rating}점)`;
          } else if (targetGenres.includes(10749)) {
            reasonData = `"${inputText}"라는 예쁜 마음을 품은 ${nickname}님에게 살포시 설렘을 더해줄게요. 가슴이 따뜻해지는 <${movieTitle}>와 함께 달콤한 시간을 보내보세요. (실관람 평점 ${rating}점)`;
          } else {
            reasonData = `"${inputText}"라고 전해주신 ${nickname}님의 소중한 오늘에 특별한 여운을 남겨줄 작품이에요. 웰메이드 수작 <${movieTitle}>와 함께 평안한 저녁 되세요. (실관람 평점 ${rating}점)`;
          }
        }
      }

      if (!chosen) {
        chosen = { id: '1', title: '상영작 데이터 없음', poster_path: null, vote_average: 9.0 };
        reasonData = "영화를 불러오는 중입니다.";
      }

      chosen.reasonData = reasonData;
      setRecommendedMovie(chosen);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div 
        className={`bg-white/80 backdrop-blur-2xl border border-zinc-200/80 border-b-0 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden ${
          isExpanded ? 'h-[540px]' : 'h-16'
        }`}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        
        {/* 1. 축소 상태 (클릭 시 토글) */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="h-16 shrink-0 w-full flex items-center justify-center gap-3 hover:bg-zinc-50/50 transition-colors group"
        >
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
        <div className={`flex-1 overflow-y-auto transition-opacity duration-500 ${isExpanded ? 'opacity-100 delay-100' : 'opacity-0'}`}>
          <div className="p-8 pt-2 h-full flex flex-col items-center justify-start">
            
            {!recommendedMovie && !loading && (
              <div className="w-full flex flex-col items-center animate-fade-in">
                {/* 텍스트 영역 */}
                <div className="text-center space-y-2 mb-6">
                  <span className="text-[11px] font-black tracking-widest text-[#623ce4] uppercase bg-[#f5f3ff] px-3.5 py-1 rounded-full border border-purple-100">
                    Megabox Emotion Care
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight pt-1">오늘의 감정에 영화를 선물하세요</h2>
                  <p className="text-sm text-zinc-500 font-medium">닉네임과 오늘의 감정을 적어주시면, 따뜻한 위로와 맞춤형 상영작을 추천해 드려요.</p>
                </div>

                {/* 입력창 영역 */}
                <div className="bg-[#fafafa] rounded-3xl p-6 border border-zinc-200/80 shadow-sm w-full max-w-3xl space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      👤 닉네임 <span className="text-zinc-400 font-normal">(예: 영화러버)</span>
                    </label>
                    <input 
                      type="text" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="사용하실 닉네임을 입력해주세요..." 
                      className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#623ce4] focus:ring-1 focus:ring-[#623ce4] transition-all font-medium"
                    />
                  </div>

                  <form onSubmit={handleRecommend} className="space-y-3">
                    <label className="block text-xs font-bold text-zinc-700">
                      Q. 오늘 하루는 어떠셨나요? <span className="text-zinc-400 font-normal">(예: "짜릿한 자극이 필요해", "마음이 지치고 위로가 필요해")</span>
                    </label>
                    <div className="flex gap-3">
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
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* 로딩 상태 */}
            {loading && (
              <div className="h-full flex items-center justify-center text-[#503396] font-bold animate-pulse text-sm py-16">
                {nickname ? `${nickname}님의 감정을 다정하게 헤아려 볼 영화를 고르는 중입니다...` : '감정을 분석하여 가장 잘 어울리는 영화를 큐레이션 중입니다...'}
              </div>
            )}

            {/* 추천 결과 뷰 */}
            {recommendedMovie && !loading && (
              <div className="w-full max-w-3xl bg-white border border-zinc-100 rounded-3xl p-6 flex items-center gap-6 animate-fade-in shadow-xl my-auto">
                
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
                  <span className="text-[11px] font-bold text-[#623ce4] mb-1">맞춤형 추천 영화</span>
                  <h3 className="text-2xl font-black text-zinc-900 mb-1">{recommendedMovie.title}</h3>
                  
                  {/* API 평점 표시 */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-base font-black text-zinc-800">
                      ⭐ {(recommendedMovie.vote_average || 8.5).toFixed(1)} <span className="text-zinc-400 font-normal text-sm">/ 10</span>
                    </span>
                  </div>
                  
                  {/* 💡 따뜻하고 다정한 위로 멘트 (글씨 크기 키움) */}
                  <p className="text-sm text-zinc-700 font-semibold leading-relaxed bg-[#f8f9fa] p-4 rounded-2xl border border-zinc-100 shadow-inner">
                    {recommendedMovie.reasonData}
                  </p>
                  
                  {/* 버튼 그룹 */}
                  <div className="flex flex-col gap-2.5 mt-4">
                    <div className="flex gap-2">
                      <Link to={`/movie/${recommendedMovie.id}`} className="flex-1 text-center py-3 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-xs rounded-xl transition-colors shadow-sm">
                        영화 상세히 둘러보기 
                      </Link>
                      <Link to="/schedule" className="flex-1 text-center py-3 bg-[#00a086] hover:bg-[#008771] text-white font-bold text-xs rounded-xl transition-colors shadow-sm">
                        상영시간표 확인하기
                      </Link>
                    </div>
                    <button onClick={() => { setRecommendedMovie(null); setInputText(''); }} className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs rounded-xl transition-colors border border-zinc-200">
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