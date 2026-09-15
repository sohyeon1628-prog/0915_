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
      image: "/img/event/03.png" 
    },
    {
      id: 2,
      title: "싱어게인",
      subtitle: "메가박스가 제안하는 <싱어게인>을 가장 잘 간직하는 방법",
      ticketNumber: "No. 105",
      image: "/img/event/02.jpg"
    },
    {
      id: 3,
      title: "인 더 그레이",
      subtitle: "메가박스가 제안하는 <인 더 그레이>를 가장 잘 간직하는 방법",
      ticketNumber: "No. 184",
      image: "/img/event/01.jpg"
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
    <section className="w-full bg-[#fbfbfa] pt-6 pb-0 flex flex-col justify-between relative overflow-hidden text-zinc-900 animate-fade-in">
      
      <div className="w-full max-w-5xl px-6 mx-auto z-10 pb-12">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-zinc-200">
          <h2 className="text-lg font-black text-[#503396] tracking-tight">혜택</h2>
          <button className="text-xl text-zinc-400 font-bold hover:text-zinc-800 transition">+</button>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
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
            <div 
              className="relative flex flex-col items-center justify-center bg-white"
              style={{ width: '280px', height: '220px' }}
            >
              {currentTicket.image ? (
                <img 
                  src={currentTicket.image} 
                  alt={currentTicket.title} 
                  className="w-full h-full object-contain bg-white transition-transform duration-500 hover:scale-105" 
                />
              ) : (
                <div className="text-center p-4">
                  <span className="text-xs font-bold text-zinc-400 block mb-1">이미지 공간</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DestinationGrid;