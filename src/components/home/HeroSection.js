import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeroSection({ currentMovie }) {
  const navigate = useNavigate();

  const title = currentMovie?.title || "SITE OF THE MONTH";
  const backdrop = currentMovie?.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}` 
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600';

  const movieId = currentMovie?.id || 1;

  return (
    <div className="w-full bg-[#fbfbfa] py-8 px-4 flex flex-col items-center" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 💡 대형 시네마틱 프레임 (클릭 시 상세/서브 페이지로 이동) */}
      <div 
        onClick={() => navigate(`/movie/${movieId}`)}
        className="relative w-full max-w-6xl h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 flex flex-col justify-between p-10 md:p-14 cursor-pointer group"
      >
        
        {/* background-image 대신 <img> 태그를 사용하여 이미지 위치(얼굴) 조절 */}
        <img 
          src={backdrop} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{ objectPosition: 'center 5%' }} 
        />

        {/* 오버레이 (이미지 위를 어둡게 덮어 텍스트 가독성을 높임) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/70 z-10" />
        
        {/* 상단 정보 */}
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

        {/* 하단 타이틀 및 메타 정보 */}
        <div className="relative z-20 text-white max-w-3xl">
          <span className="text-sm uppercase tracking-widest text-purple-400 font-black block mb-2">PROJECT FEATURED</span>
          
          {/* 💡 타이틀 글자 크기를 살짝 줄임 (text-5xl md:text-7xl -> text-3xl md:text-5xl) */}
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
              <strong className="text-white font-black">{currentMovie?.openDt?.slice(0,4) || '2026'}</strong>
            </div>
            <div>
              <span className="block text-xs text-zinc-400 uppercase font-bold">Category</span>
              <strong className="text-purple-300 font-black">BOXOFFICE PASS</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 중간 메뉴 바 */}
      <div className="w-full max-w-6xl mt-6 bg-white border border-zinc-200 rounded-2xl shadow-md py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-900">
        
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