import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeroSection({ movies = [], currentMovie: fallbackMovie }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(slideTimer); 
  }, [movies]);

  // 💡 넘어온 영화 배열이 있으면 그걸 쓰고, 없으면 기본 영화 1개를 배열에 담아서 사용합니다.
  const displayMovies = movies.length > 0 ? movies : (fallbackMovie ? [fallbackMovie] : []);

  return (
    <div className="w-full bg-[#fbfbfa] py-4 px-4 flex flex-col items-center" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 💡 배너 영역 (overflow-hidden으로 삐져나가는 부분 숨김) */}
      <div className="relative w-full max-w-6xl h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 cursor-pointer group">
        
        {/* 💡 영화 배열을 돌면서 각각의 배너를 미리 다 만들어 겹쳐둡니다. */}
        {displayMovies.map((movie, index) => {
          // 현재 순서인지 확인
          const isActive = index === currentIndex;
          
          const title = movie?.title || "SITE OF THE MONTH";
          const backdrop = movie?.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
            : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600';
          const movieId = movie?.id || 1;

          return (
            <div 
              key={movieId + "-" + index}
              onClick={() => navigate(`/movie/${movieId}`)}
              // 💡 핵심 애니메이션: 순서가 맞으면 선명하게 스르륵 나타나고(opacity-100, translate-x-0), 아니면 투명해지며 옆으로 밀려남
              className={`absolute inset-0 w-full h-full flex flex-col justify-between p-10 md:p-14 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 translate-x-10 z-0 pointer-events-none'
              }`}
            >
              
              <img 
                src={backdrop} 
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center 5%' }} 
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/70 z-10" />
              
              <div className="relative z-20 flex justify-between items-start text-white">
                <div>
                  <span className="text-2xl font-black tracking-widest text-purple-300">2026</span>
                  <p className="text-xs uppercase tracking-wider text-zinc-300 font-bold">SITE OF THE MONTH NOMINEE</p>
                  <span className="text-xs font-bold tracking-widest text-white/90">megabox.</span>
                </div>

                <div className="flex flex-col items-end gap-1 text-right">
                  <div className="flex gap-1 text-amber-400 text-sm font-bold">★★★★★</div>
                  <span className="text-xs text-zinc-300 uppercase tracking-widest font-bold">CRITIC ACCLAIM</span>
                  <span className="text-base font-serif italic text-white font-bold">"A FASCINATING VOYAGE"</span>
                </div>
              </div>

              <div className="relative z-20 text-white max-w-3xl">
                <span className="text-sm uppercase tracking-widest text-purple-400 font-black block mb-2">PROJECT FEATURED</span>
                
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 drop-shadow-lg leading-tight group-hover:text-purple-200 transition">
                  {title}
                </h2>
                
                <div className="flex items-center gap-8 text-xs md:text-sm text-zinc-300 border-t border-white/20 pt-4">
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase font-bold">Director</span>
                    <strong className="text-white font-black">KOBIS & TMDB</strong>
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase font-bold">Year</span>
                    <strong className="text-white font-black">{movie?.openDt?.slice(0,4) || '2026'}</strong>
                  </div>
                  <div>
                    <span className="block text-xs text-zinc-400 uppercase font-bold">Category</span>
                    <strong className="text-purple-300 font-black">BOXOFFICE PASS</strong>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 💡 하단 검색 바 */}
      <div className="w-full max-w-6xl mt-3 bg-white border border-zinc-200 rounded-2xl shadow-md py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-900">
        
        <div className="flex items-center bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-3 w-full md:w-80">
          <input 
            type="text" 
            placeholder="영화명을 입력해주세요" 
            className="bg-transparent text-sm text-zinc-900 font-bold focus:outline-none w-full placeholder-zinc-400"
          />
          <svg className="w-5 h-5 text-zinc-600 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <div className="flex items-center justify-around w-full md:w-auto gap-6 md:gap-12 text-sm font-black text-zinc-800">
          <Link to="/schedule" className="cursor-pointer hover:text-[#503396] transition py-1 tracking-wide">
            상영시간표
          </Link>
          <div className="hidden md:block w-px h-5 bg-zinc-300" />
          <div className="cursor-pointer hover:text-[#503396] transition py-1 tracking-wide">
            박스오피스
          </div>
          <div className="hidden md:block w-px h-5 bg-zinc-300" />
          <Link to="/schedule" className="cursor-pointer text-white bg-[#503396] hover:bg-[#3b2570] px-6 py-3 rounded-xl shadow transition tracking-wide">
            빠른예매
          </Link>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;