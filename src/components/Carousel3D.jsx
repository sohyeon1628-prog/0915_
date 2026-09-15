import React from 'react';
// 💡 페이지 이동을 위한 useNavigate 임포트
import { useNavigate } from 'react-router-dom';

const Carousel3D = ({ movies = [], currentIndex, setCurrentIndex }) => {
  const navigate = useNavigate(); // 네비게이트 훅 선언

  const displayMovies = movies.length > 0 ? movies : [
    { id: 0, title: "Dune 2", poster_path: "" },
    { id: 1, title: "Wicked", poster_path: "" },
    { id: 2, title: "Interstellar", poster_path: "" },
    { id: 3, title: "Avatar", poster_path: "" },
    { id: 4, title: "Joker", poster_path: "" },
    { id: 5, title: "Oppenheimer", poster_path: "" },
    { id: 6, title: "Spider-Man", poster_path: "" },
  ];

  const total = displayMovies.length;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  return (
    // 💡 기존 디자인은 그대로 두고, 빨간 선 위치에 맞게 max-w-5xl와 mx-auto, 모서리 둥글기만 적용
    <div className="w-full max-w-5xl mx-auto my-6 py-8 flex flex-col items-center justify-center bg-[#0b090e] rounded-3xl overflow-hidden relative shadow-xl">
      
      {/* 백라이트 글로는 그림자 효과 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[220px] bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* 3D 스테이지 영역 */}
      <div 
        className="relative w-full max-w-5xl h-[340px] flex items-center justify-center z-10"
        style={{ perspective: '1400px' }}
      >
        {displayMovies.map((movie, index) => {
          let offset = (index - currentIndex + total) % total;
          if (offset > total / 2) offset -= total;

          const isCenter = offset === 0;

          const translateX = offset * 165; 
          const translateY = Math.abs(offset) * 20; 
          const translateZ = isCenter ? 110 : -Math.abs(offset) * 85;
          const rotateY = offset * -14;
          const scale = isCenter ? 1.2 : Math.max(1 - Math.abs(offset) * 0.08, 0.7);
          const opacity = Math.abs(offset) > 3.5 ? 0 : 1;

          return (
            <div
              key={movie.id || index}
              onClick={() => {
                if (isCenter) {
                  // 💡 중앙(선택된) 포스터를 누르면 상세 페이지로 이동 (movie.id 또는 인덱스 활용)
                  navigate(`/movie/${movie.id || index}`);
                } else {
                  // 양옆의 포스터를 누르면 해당 위치로 슬라이드 이동
                  setCurrentIndex(index);
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: total - Math.abs(offset) + (isCenter ? 10 : 0),
                opacity: opacity,
                pointerEvents: opacity === 0 ? 'none' : 'auto',
                transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className={`absolute w-44 h-64 rounded-none overflow-hidden cursor-pointer transition-all duration-500 ${
                isCenter 
                  ? 'shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(112,0,255,0.25)] ring-1 ring-purple-500/40 brightness-100' 
                  : 'shadow-2xl brightness-50 hover:brightness-75'
              }`}
            >
              {movie.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title || 'Movie Poster'} 
                  className="w-full h-full object-cover pointer-events-none rounded-none" 
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-xs text-zinc-400 p-2 text-center font-bold border border-white/10">
                  <span className="mb-1">{movie.title}</span>
                  <span>MOVIE TICKET</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 네비게이션 버튼 및 인디케이터 */}
      <div className="flex items-center gap-6 mt-4 z-20">
        <button 
          onClick={handlePrev} 
          className="w-8 h-8 rounded-full bg-zinc-800 text-white border border-white/15 flex items-center justify-center hover:bg-zinc-700 transition cursor-pointer font-bold shadow-md text-xs"
        >
          &larr;
        </button>
        <div className="flex gap-1.5">
          {displayMovies.map((_, idx) => (
            <span 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                idx === currentIndex ? 'bg-purple-400 w-6 shadow-[0_0_8px_rgba(192,132,252,0.8)]' : 'bg-zinc-700 w-1.5'
              }`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext} 
          className="w-8 h-8 rounded-full bg-zinc-800 text-white border border-white/15 flex items-center justify-center hover:bg-zinc-700 transition cursor-pointer font-bold shadow-md text-xs"
        >
          &rarr;
        </button>
      </div>

    </div>
  );
};

export default Carousel3D;