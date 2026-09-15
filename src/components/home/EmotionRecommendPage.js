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

  const handleRecommend = (emotionLabel, customText = '') => {
    const queryText = customText || emotionLabel;
    if (!queryText.trim()) {
      alert('오늘의 기분이나 감정을 간단히 적어주세요.');
      return;
    }
    
    setSelectedEmotion(emotionLabel);
    setLoading(true);
    setRecommendedMovie(null);

    setTimeout(() => {
      let chosen = null;
      let reasonData = "";
      let mockReview = "";

      const q = queryText.toLowerCase();
      const isComfort = q.includes('위로') || q.includes('우울') || q.includes('슬픔') || q.includes('힘들') || q.includes('눈물') || q.includes('지침');
      const isLaugh = q.includes('웃음') || q.includes('코미디') || q.includes('재밌') || q.includes('즐거') || q.includes('유쾌');
      const isThrill = q.includes('짜릿') || q.includes('액션') || q.includes('스트레스') || q.includes('스릴') || q.includes('답답') || q.includes('범죄');
      const isRomance = q.includes('설렘') || q.includes('사랑') || q.includes('로맨스') || q.includes('달달');

      if (movies && movies.length > 0) {
        let scoredMovies = movies.map(m => {
          let score = (m.vote_average || 8.0) * 10;
          const genreIds = m.genre_ids || [];
          const overview = (m.overview || "").toLowerCase();
          const title = (m.title || "").toLowerCase();

          if (isThrill && (genreIds.includes(27) || genreIds.includes(53) || genreIds.includes(28) || overview.includes('공포') || overview.includes('스릴러') || overview.includes('살인') || overview.includes('추적') || title.includes('옵세션'))) {
            score += 200;
          } else if (isComfort && (genreIds.includes(18) || genreIds.includes(10751) || overview.includes('위로') || overview.includes('가족'))) {
            score += 200;
          } else if (isLaugh && (genreIds.includes(35) || overview.includes('코미디') || overview.includes('웃음'))) {
            score += 200;
          } else if (isRomance && (genreIds.includes(10749) || overview.includes('로맨스') || overview.includes('사랑'))) {
            score += 200;
          }

          score += Math.random() * 20;
          return { ...m, matchScore: score };
        });

        scoredMovies.sort((a, b) => b.matchScore - a.matchScore);
        chosen = scoredMovies[0];

        if (chosen) {
          const rating = (chosen.vote_average || 9.2).toFixed(1);
          const genreIds = chosen.genre_ids || [];
          const overview = (chosen.overview || "").toLowerCase();
          const title = (chosen.title || "").toLowerCase();

          if (genreIds.includes(27) || genreIds.includes(53) || overview.includes('공포') || overview.includes('스릴러') || overview.includes('살인') || overview.includes('악령') || title.includes('옵세션')) {
            reasonData = `심장을 조여오는 극한의 서스펜스와 오싹한 공포! 관람객 평점 ${rating}점을 기록하며 온몸의 털이 곤두서는 몰입감을 선사하는 공포/스릴러 영화입니다.`;
            mockReview = `사운드와 연출이 너무 소름 끼쳐서 보는 내내 긴장을 놓을 수 없었어요! 짜릿한 자극을 원한다면 무조건 봐야 합니다.`;
          } else if (genreIds.includes(35) || overview.includes('코미디') || overview.includes('웃음')) {
            reasonData = `유쾌한 웃음과 재치 있는 상황들로 답답했던 일상의 스트레스를 날려줄 평점 ${rating}점의 코미디 추천작입니다.`;
            mockReview = `보는 내내 극장이 웃음바다가 됐어요! 아무 생각 없이 신나게 웃고 싶을 때 최고입니다.`;
          } else if (genreIds.includes(10749) || overview.includes('로맨스') || overview.includes('사랑')) {
            reasonData = `풋풋하고 달달한 감성을 일깨워주며 가슴 한구석을 설렘으로 물들이는 평점 ${rating}점의 로맨스 작품입니다.`;
            mockReview = `보는 내내 입가에 미소가 끊이지 않았습니다. 연애 세포를 완벽하게 깨워주는 사랑스러운 영화였어요!`;
          } else if (genreIds.includes(18) || overview.includes('위로') || overview.includes('드라마')) {
            reasonData = `마음이 헛헛하고 지친 날, 따뜻한 위로와 깊은 여운을 건네는 스토리로 관람객 평점 ${rating}점을 기록한 힐링 추천작입니다.`;
            mockReview = `잔잔하게 스며드는 감동에 지친 하루 끝에 큰 위로를 얻었습니다. 여운이 길게 남는 따뜻한 영화예요.`;
          } else {
            reasonData = `팽팽한 긴장감과 탄탄한 서사로 관객들의 몰입도를 이끌어내는, 현재 평점 ${rating}점을 기록 중인 화제작입니다.`;
            mockReview = `시간 가는 줄 모르고 몰입해서 감상했습니다. 후회 없는 완벽한 선택이었어요.`;
          }
        }
      }

      if (!chosen) {
        chosen = {
          id: '1',
          title: '상영작 데이터 없음',
          overview: '영화 데이터를 불러오는 중입니다.',
          poster_path: null,
          vote_average: 9.0
        };
        reasonData = "현재 상영 중인 영화 데이터와 매칭 중입니다.";
        mockReview = "최고의 명작입니다.";
      }

      chosen.reasonData = reasonData;
      chosen.mockReview = mockReview;

      setRecommendedMovie(chosen);
      setLoading(false);
    }, 600);
  };

  return (
    <div 
      className="w-full min-h-screen py-16 px-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-zinc-900" 
      style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* 1. 메인 콘텐츠 영역 */}
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
              onSubmit={(e) => { e.preventDefault(); handleRecommend('직접 입력', inputText); }} 
              className="flex items-center bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl shadow-sm p-2 focus-within:shadow-md focus-within:bg-white/60 transition-all"
            >
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="오늘 하루는 어떠셨나요? (예: 위로가 필요해, 웃고 싶어)" 
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

          {/* 추천 결과 카드 */}
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
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-sm font-black text-zinc-800">
                      {(recommendedMovie.vote_average || 9.2).toFixed(1)} <span className="text-zinc-500 font-medium">/ 10</span>
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

                {/* 💡 영화 상세히 둘러보기 및 초기화 버튼 영역 */}
                <div className="flex flex-col gap-3 pt-4 w-full">
                  <Link 
                    to={`/movie/${recommendedMovie.id}`}
                    className="w-full py-3.5 bg-[#503396] hover:bg-[#3b2570] text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    영화 상세히 둘러보기
                  </Link>
                  
                  <button 
                    onClick={() => { setSelectedEmotion(null); setRecommendedMovie(null); setInputText(''); }} 
                    className="w-full py-3 bg-white/70 hover:bg-white text-zinc-700 font-bold text-xs rounded-xl transition shadow-sm border border-white"
                  >
                    다시 추천받기 (초기화)
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 2. 우측 스크롤 고정 직사각형 박스 */}
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