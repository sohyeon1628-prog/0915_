import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLatestMovies } from '../api/tmdb';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('박스오피스');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getLatestMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center text-zinc-800" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        <p className="text-sm font-bold animate-pulse text-[#503396]">영화 목록을 불러오는 중...</p>
      </div>
    );
  }

  const tabs = ['박스오피스', '상영예정작', 'MEGA ONLY', '필름소사이어티', '클래식소사이어티'];

  return (
    <div className="w-full min-h-screen bg-white text-zinc-800 pb-24" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 상단 타이틀 및 서브 탭 메뉴 */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <h2 className="text-2xl font-black mb-6 text-zinc-900 tracking-tight">전체영화</h2>
        
        <div className="flex gap-8 text-xs font-bold text-zinc-500 border-b border-zinc-200 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-3 transition relative whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-zinc-900 font-extrabold border-b-2 border-[#503396]' 
                  : 'hover:text-zinc-700'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 text-xs text-zinc-500 font-medium">
          <p>총 <span className="text-[#503396] font-bold">{movies.length}</span>개의 영화가 검색되었습니다.</p>
        </div>
      </div>

      {/* 영화 목록 그리드 영역 */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
          {movies.map((movie, index) => {
            const posterUrl = movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : "https://via.placeholder.com/300x450?text=No+Image";

            const numericId = movie.id || index + 1;
            const bookingRate = ((numericId % 15) + 1.2).toFixed(1);
            const releaseDate = movie.release_date ? movie.release_date.replace(/-/g, '.') : '2026.08.05';

            return (
              <div 
                key={numericId} 
                className="flex flex-col group cursor-pointer"
                onClick={() => navigate(`/movie/${numericId}`)}
              >
                {/* 포스터 영역 */}
                <div className="relative w-full rounded-xl overflow-hidden shadow-md">
                  <span className="absolute top-2.5 left-2.5 z-10 bg-black/70 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-md">
                    {index + 1}
                  </span>
                  
                  <img 
                    src={posterUrl} 
                    alt={movie.title} 
                    className="w-full h-auto block object-cover" 
                  />
                </div>

                {/* 영화 정보 영역 */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm font-black text-zinc-900 tracking-tight truncate">
                    {movie.title || movie.name}
                  </h3>
                  
                  <p className="text-[11px] font-medium text-zinc-500">
                    예매율 {bookingRate}% &bull; 개봉일 {releaseDate}
                  </p>

                  {/* 좋아요 및 예매 버튼 (예매 누르면 상영시간표로 이동) */}
                  <div className="flex items-center gap-2 pt-1.5">
                    <button 
                      onClick={(e) => e.stopPropagation()} 
                      className="flex items-center justify-center gap-1 px-2 py-2 bg-transparent hover:opacity-80 text-zinc-600 transition text-xs font-bold"
                      title="좋아요"
                    >
                      <span>🤍</span>
                      <span className="text-[11px] text-zinc-700 font-bold">{(numericId * 3) % 900 + 50}</span>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/schedule'); // 💡 예매 버튼 클릭 시 상영시간표(예매) 페이지로 이동
                      }}
                      className="flex-grow py-2 bg-[#503396] hover:bg-[#432a7e] text-white rounded-lg text-xs font-bold transition shadow-sm"
                    >
                      예매
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default MovieList;