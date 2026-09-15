import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleAlert = () => {
    alert("현재 서비스 준비 중입니다.");
  };

  return (
    // 💡 1. 하단에 메가박스 특유의 굵은 보라색 테두리 추가 (border-b-[3px] border-[#503396])
    <header className="w-full bg-white border-b-[3px] border-[#503396] sticky top-0 z-50" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* 💡 2. 내용물이 너무 퍼지지 않도록 최대 너비를 약 1100px(max-w-[1100px])로 고정 */}
      <div className="max-w-[1100px] mx-auto px-4">
        
        {/* 상단 유틸리티 메뉴 */}
        {/* 💡 3. 글자 크기를 13px로 조절하고, 색상을 짙은 회색(#666)으로 변경 */}
        <div className="flex justify-between items-center py-2 text-[13px] font-medium text-[#666]">
          <div className="flex items-center gap-6">
            <span onClick={() => navigate('/emotion')} className="cursor-pointer hover:underline">VIP LOUNGE</span>
            <span onClick={() => navigate('/emotion')} className="cursor-pointer hover:underline">멤버십</span>
            <span onClick={handleAlert} className="cursor-pointer hover:underline">고객센터</span>
          </div>
          <div className="flex items-center gap-6">
            <span onClick={handleAlert} className="cursor-pointer hover:underline">로그인</span>
            <span onClick={handleAlert} className="cursor-pointer hover:underline">회원가입</span>
            <span 
              onClick={() => navigate('/schedule')} 
              className="cursor-pointer text-[#503396] hover:underline font-bold"
            >
              빠른예매
            </span>
          </div>
        </div>

        {/* 하단 메인 내비게이션 바 */}
        {/* 💡 4. 로고를 완벽한 정중앙에 두기 위해 relative 속성 사용 */}
        <div className="relative flex items-center justify-between h-[68px]">
          
          {/* 왼쪽 영역 (아이콘 + 메뉴) */}
          <div className="flex items-center flex-1 gap-10">
            {/* 💡 5. 아이콘들의 선 굵기를 얇게(strokeWidth="1.5") 수정하고 크기를 살짝 키움(w-6 h-6) */}
            <div className="flex items-center gap-5 text-[#222]">
              <svg onClick={() => navigate('/movies')} className="w-6 h-6 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg onClick={() => navigate('/movies')} className="w-6 h-6 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            {/* 💡 6. 메인 메뉴 글자 크기를 18px로 키우고 굵게(font-bold) 변경 */}
            <nav className="hidden md:flex items-center gap-8 text-[18px] font-bold text-[#222]">
              <span onClick={() => navigate('/movies')} className="cursor-pointer hover:text-[#503396] transition">영화</span>
              <span onClick={() => navigate('/schedule')} className="cursor-pointer hover:text-[#503396] transition">예매</span>
              <span onClick={() => navigate('/schedule')} className="cursor-pointer hover:text-[#503396] transition">극장</span>
              
              {/* 영화추천 (기존 기능 유지하되 폰트 사이즈 통일) */}
              <span onClick={() => navigate('/emotion')} className="cursor-pointer text-[#503396] transition flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#503396]"></span>
                영화추천
              </span>
            </nav>
          </div>

          {/* 중앙 로고 영역 */}
          {/* 💡 7. 로고를 absolute로 띄워 정중앙에 고정 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="cursor-pointer flex items-center justify-center">
              <img 
                src={process.env.PUBLIC_URL + "/img/logo.png"} 
                alt="MEGABOX"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 오른쪽 영역 (메뉴 + 아이콘) */}
          <div className="flex items-center justify-end flex-1 gap-10">
            <nav className="hidden md:flex items-center gap-8 text-[18px] font-bold text-[#222]">
              <span onClick={() => navigate('/emotion')} className="cursor-pointer hover:text-[#503396] transition">이벤트</span>
              <span onClick={() => navigate('/movies')} className="cursor-pointer hover:text-[#503396] transition">스토어</span>
              <span onClick={() => navigate('/emotion')} className="cursor-pointer hover:text-[#503396] transition">혜택</span>
            </nav>
            <div className="flex items-center gap-5 text-[#222]">
              <Link to="/schedule" className="hover:text-[#503396] transition flex items-center justify-center" title="상영시간표">
                <svg className="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </Link>
              <svg onClick={handleAlert} className="w-6 h-6 cursor-pointer hover:text-[#503396]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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