import React, { useRef, useEffect } from 'react';

function FeaturesSection() {
  const scrollRef = useRef(null);

  const specials = [
    { title: 'Dolby Cinema', desc: '돌비 시네마 고화질·고음질', img: process.env.PUBLIC_URL + '/img/01/01.png' },
    { title: 'Dolby Vision & Atmos', desc: '완벽한 시각과 청각의 조화', img: process.env.PUBLIC_URL + '/img/01/02.png' },
    { title: 'MEGA MX4D', desc: '오감을 자극하는 4D 체험', img: process.env.PUBLIC_URL + '/img/01/03.png' },
    { title: 'MEGA Dolby Atmos', desc: '공간을 채우는 입체 사운드', img: process.env.PUBLIC_URL + '/img/01/04.png' },
    { title: 'MEGA LED', desc: '차원이 다른 선명함과 색감', img: process.env.PUBLIC_URL + '/img/01/05.png' },
    { title: 'Boutique Private', desc: '프리미엄 프라이빗 관람관', img: process.env.PUBLIC_URL + '/img/01/06.png' },
  ];

  // 수동 스크롤 조작 함수
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 💡 자동 슬라이드 기능 추가 (3초마다 오른쪽으로 이동)
  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // 스크롤이 끝에 도달했는지 확인 (약간의 오차를 위해 -10px 여유를 둠)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // 끝까지 가면 맨 처음으로 부드럽게 되돌아갑니다.
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // 아니면 오른쪽으로 한 칸씩 이동합니다.
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000); // 3000ms = 3초

    // 컴포넌트가 화면에서 사라질 때 타이머 정리
    return () => clearInterval(autoPlay);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 border-t border-zinc-200">
      
      {/* 슬라이더 스크롤바 숨기기 */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* 상단 타이틀 및 슬라이더 컨트롤러 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xs font-bold text-[#503396] uppercase tracking-widest mb-1">Features Special</h3>
          <h2 className="text-xl font-extrabold text-zinc-900">Megabox Special</h2>
        </div>
        
        {/* 좌우 슬라이드 버튼 (사용자가 직접 누를 수도 있습니다) */}
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-500 hover:bg-[#503396] hover:text-white hover:border-[#503396] transition z-10">
            &lt;
          </button>
          <button onClick={() => scroll('right')} className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-500 hover:bg-[#503396] hover:text-white hover:border-[#503396] transition z-10">
            &gt;
          </button>
        </div>
      </div>

      {/* 슬라이더 리스트 영역 */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar py-2"
      >
        {specials.map((item, idx) => (
          <div 
            key={idx} 
            className="snap-start flex-none w-[85%] md:w-[calc(25%-12px)] bg-white border border-zinc-200 rounded-xl p-4 text-center hover:border-[#503396] transition shadow-sm cursor-pointer group"
          >
            <div className="w-full aspect-[4/3] bg-zinc-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <h4 className="text-sm font-bold text-zinc-900 mb-1.5">{item.title}</h4>
            <p className="text-[11px] text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FeaturesSection;