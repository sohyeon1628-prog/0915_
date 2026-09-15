import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 상단 유틸리티 메뉴 */}
        <div className="flex justify-between items-center pt-2 pb-1 text-[11px] font-bold text-zinc-500 border-b border-zinc-100">
          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-[#503396] transition">VIP LOUNGE</span>
            <span className="cursor-pointer hover:text-[#503396] transition">멤버십</span>
            <span className="cursor-pointer hover:text-[#503396] transition">고객센터</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="cursor-pointer hover:text-[#503396] transition">로그인</span>
            <span className="cursor-pointer hover:text-[#503396] transition">회원가입</span>
            <span 
              onClick={() => navigate('/schedule')} 
              className="cursor-pointer text-[#503396] hover:underline"
            >
              빠른예매
            </span>
          </div>
        </div>

        {/* 하단 메인 내비게이션 바 */}
        <div className="flex items-center justify-between py-3">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-zinc-800">
              <svg className="w-5 h-5 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg className="w-5 h-5 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-black text-zinc-800">
              <span 
                onClick={() => navigate('/movies')} 
                className="cursor-pointer hover:text-[#503396] transition"
              >
                영화
              </span>
              <span 
                onClick={() => navigate('/schedule')} 
                className="cursor-pointer hover:text-[#503396] transition"
              >
                예매
              </span>
              <span className="cursor-pointer hover:text-[#503396] transition">극장</span>
              
              {/* 💡 감정추천 클릭 시 /emotion 페이지로 이동하도록 수정 */}
              <span 
                onClick={() => navigate('/emotion')} 
                className="cursor-pointer text-[#503396] hover:text-purple-800 transition flex items-center gap-1"
              >
                <span className="w-2 h-2 rounded-full bg-[#503396] animate-pulse"></span>
                영화추천
              </span>
            </nav>
          </div>

          <Link to="/" className="cursor-pointer flex items-center justify-center">
            <img 
              src="/img/logo.png" 
              alt="MEGABOX" 
              className="h-9 w-auto object-contain hover:scale-105 transition" 
            />
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm font-black text-zinc-800">
              <span className="cursor-pointer hover:text-[#503396] transition">이벤트</span>
              <span className="cursor-pointer hover:text-[#503396] transition">스토어</span>
              <span className="cursor-pointer hover:text-[#503396] transition">혜택</span>
            </nav>
            <div className="flex items-center gap-4 text-zinc-800">
              <Link to="/schedule" className="p-1 hover:text-[#503396] transition flex items-center justify-center" title="상영시간표">
                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </Link>
              <svg className="w-5 h-5 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;