import React from 'react';

function NoticeAndCustomer() {
  const serviceMenuList = [
    { 
      id: 1, 
      title: "고객센터", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 2, 
      title: "자주 묻는 질문", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 3, 
      title: "1:1 문의", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    { 
      id: 4, 
      title: "단체/대관문의", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 5, 
      title: "분실물 문의/접수", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      id: 6, 
      title: "더 부티크 프라이빗 대관예매", 
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-white text-zinc-800 py-12 border-t border-zinc-200">
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* 상단 공지사항 바 영역 */}
        <div className="w-full max-w-4xl bg-zinc-50 border border-zinc-200 rounded-xl px-6 py-3.5 flex items-center justify-between mb-12 shadow-sm">
          <div className="flex items-center space-x-3 text-xs">
            <span className="font-bold text-zinc-900">메가박스</span>
            <span className="text-zinc-300">|</span>
            <span className="bg-purple-100 text-[#503396] font-bold px-2 py-0.5 rounded text-[11px]">공지</span>
            <span className="text-zinc-700 font-medium hover:underline cursor-pointer truncate max-w-md">
              [청년문화예술패스] 결제 연계시스템 점검 안내 (9/10~11)
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-zinc-500">
            <span className="font-medium">2026.09.10</span>
            <button className="font-bold hover:text-black flex items-center">
              더보기 <span className="ml-1 text-[10px]">&gt;</span>
            </button>
          </div>
        </div>

        {/* 하단 고객센터 및 안내 아이콘 퀵메뉴 6개 그리드 */}
        <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-6">
          {serviceMenuList.map((menu) => (
            <div 
              key={menu.id} 
              className="flex flex-col items-center group cursor-pointer p-4 rounded-xl hover:bg-zinc-50 transition"
            >
              <div className="w-14 h-14 rounded-full border border-teal-500/40 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-50 transition shadow-sm">
                {menu.svg}
              </div>
              <span className="text-xs font-bold text-zinc-700 text-center group-hover:text-black transition">
                {menu.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default NoticeAndCustomer;