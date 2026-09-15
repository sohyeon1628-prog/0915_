import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingSteps() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate('/movies');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mb-10">
      
      {/* 메인 검색 및 바로가기 바 영역 */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* 영화 검색 입력폼 */}
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-96 border border-zinc-300 rounded-xl px-4 py-2 bg-white">
          <input 
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="영화명을 입력하세요"
            className="w-full text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none bg-transparent"
          />
          <button type="submit" className="text-zinc-400 hover:text-[#503396] font-bold text-xs ml-2">
            🔍
          </button>
        </form>

        {/* 하단 바로가기 메뉴 (클릭 시 상영시간표/예매 페이지로 즉시 이동) */}
        <div className="flex items-center gap-6 text-xs font-bold text-zinc-600">
          <span 
            onClick={() => navigate('/schedule')} 
            className="cursor-pointer hover:text-[#503396] transition"
          >
            상영시간표
          </span>
          <span 
            onClick={() => navigate('/movies')} 
            className="cursor-pointer hover:text-[#503396] transition"
          >
            박스오피스
          </span>
          <span 
            onClick={() => navigate('/schedule')} 
            className="cursor-pointer bg-[#503396] text-white px-4 py-2 rounded-xl hover:bg-[#432a7e] transition shadow-sm"
          >
            빠른예매
          </span>
        </div>

      </div>

    </div>
  );
}

export default BookingSteps;