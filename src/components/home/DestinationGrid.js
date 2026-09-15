import React, { useState } from 'react';

function DestinationGrid() {
  const [currentTicketIdx, setCurrentTicketIdx] = useState(0);
  const [fade, setFade] = useState(true);

  const ticketList = [
    {
      id: 1,
      title: "아비정전 4K 리마스터링",
      subtitle: "메가박스가 제안하는 <아비정전 4K 리마스터링>을 가장 잘 간직하는 방법",
      ticketNumber: "No. 43",
      image: process.env.PUBLIC_URL + "/img/event/01.jpg"
    },
    {
      id: 2,
      title: "싱어게인",
      subtitle: "메가박스가 제안하는 <싱어게인>을 가장 잘 간직하는 방법",
      ticketNumber: "No. 105",
      image: process.env.PUBLIC_URL + "/img/event/02.jpg"
    },
    {
      id: 3,
      title: "인 더 그레이",
      subtitle: "메가박스가 제안하는 <인 더 그레이>를 가장 잘 간직하는 방법",
      ticketNumber: "No. 184",
      image: process.env.PUBLIC_URL + "/img/event/01.jpg"
    }
  ];

  const changeSlide = (newIndex) => {
    setFade(false);
    setTimeout(() => {
      setCurrentTicketIdx(newIndex);
      setFade(true);
    }, 200);
  };

  const handlePrev = () => {
    const nextIdx = currentTicketIdx === 0 ? ticketList.length - 1 : currentTicketIdx - 1;
    changeSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentTicketIdx === ticketList.length - 1 ? 0 : currentTicketIdx + 1;
    changeSlide(nextIdx);
  };

  const currentTicket = ticketList[currentTicketIdx];

  return (
    <section className="w-full bg-[#fbfbfa] pt-6 flex flex-col justify-between relative overflow-hidden text-zinc-900 animate-fade-in" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <div className="w-full max-w-6xl px-4 mx-auto z-10 pb-10">
        
        {/* 혜택 타이틀 */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-200">
          <h2 className="text-lg font-black text-[#503396] tracking-tight">혜택</h2>
          <button className="text-xl text-zinc-400 font-bold hover:text-zinc-800 transition">+</button>
        </div>

        {/* 1. 오리지널 티켓 박스 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className={`max-w-md space-y-2.5 z-10 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[11px] font-bold text-zinc-500 block tracking-widest uppercase">메가박스 오리지널 티켓</span>
            <h3 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-none">
              ORIGINAL TICKET
            </h3>
            
            <p className="text-xs text-zinc-600 font-medium leading-relaxed tracking-tight">
              {currentTicket.subtitle}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-28 h-1 bg-zinc-200 relative rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#503396] transition-all duration-300"
                  style={{ width: `${((currentTicketIdx + 1) / ticketList.length) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-zinc-700">
                <button onClick={handlePrev} className="hover:text-[#503396] px-0.5 text-zinc-400">&lt;</button>
                <button onClick={handleNext} className="hover:text-[#503396] px-0.5 text-zinc-400">&gt;</button>
                <span className="text-zinc-300 font-normal">||</span>
                <span className="font-bold text-zinc-900">{currentTicketIdx + 1} / {ticketList.length}</span>
              </div>
            </div>
          </div>

          <div className={`relative flex items-center justify-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative flex flex-col items-center justify-center bg-white" style={{ width: '280px', height: '220px' }}>
              {currentTicket.image ? (
                <img src={currentTicket.image} alt={currentTicket.title} className="w-full h-full object-contain bg-white transition-transform duration-500 hover:scale-105" />
              ) : (
                <div className="text-center p-4">
                  <span className="text-xs font-bold text-zinc-400 block mb-1">이미지 공간</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 💡 2. 토스 즉시할인 박스 (아래쪽 굵은 글씨 디자인으로 변경!) */}
        <div className="w-full flex flex-col md:flex-row gap-6 mb-8">
          {/* 첫 번째 박스 */}
          <div className="flex-1 bg-white border border-zinc-200/80 rounded-2xl p-7 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="bg-[#3182f6] text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-sm tracking-widest">
                  toss payments
                </span>
                <span className="text-zinc-400 text-xs font-black tracking-widest">× MEGABOX</span>
              </div>
              <p className="text-zinc-900 font-black text-[22px] tracking-tight">
                퀵계좌이체 결제 시 <span className="text-[#3182f6]">0.3% 즉시할인</span>
              </p>
            </div>
            <div className="text-5xl drop-shadow-md">🍿</div>
          </div>

          {/* 두 번째 박스 */}
          <div className="flex-1 bg-white border border-zinc-200/80 rounded-2xl p-7 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div>
              <div className="text-zinc-500 text-sm font-black mb-2.5 tracking-tight">토스 퀵계좌이체</div>
              <p className="text-zinc-900 font-black text-[22px] tracking-tight">0.3% 즉시할인</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#503396] flex items-center justify-center text-white font-black text-2xl shadow-md">
              %
            </div>
          </div>
        </div>

        {/* 💡 3. 하단 보라색 퀵 메뉴 바 (MegaboxGuide.js 에 있던 코드 합침) */}
        <div className="w-full rounded-3xl bg-[#422678]/95 backdrop-blur-md py-10 px-6 text-white flex justify-center shadow-xl border border-white/10 z-10">
          <div className="w-full flex items-center justify-around text-center">
            
            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <svg className="w-8 h-8 stroke-current text-purple-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l9 4.909v9.182L12 21l-9-4.909V6.909L12 2z" />
              </svg>
              <span className="text-sm font-extrabold tracking-wider text-purple-100 group-hover:text-white">VIP LOUNGE</span>
            </div>

            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <svg className="w-8 h-8 stroke-current text-purple-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
                <circle cx="12" cy="7" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
              </svg>
              <span className="text-sm font-extrabold tracking-wider text-purple-100 group-hover:text-white">멤버십</span>
            </div>

            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <svg className="w-8 h-8 stroke-current text-purple-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" />
              </svg>
              <span className="text-sm font-extrabold tracking-wider text-purple-100 group-hover:text-white">할인카드안내</span>
            </div>

            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <svg className="w-8 h-8 stroke-current text-purple-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              <span className="text-sm font-extrabold tracking-wider text-purple-100 group-hover:text-white">이벤트</span>
            </div>

            <div className="flex flex-col items-center gap-3 cursor-pointer group">
              <svg className="w-8 h-8 stroke-current text-purple-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
              </svg>
              <span className="text-sm font-extrabold tracking-wider text-purple-100 group-hover:text-white">스토어</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default DestinationGrid;