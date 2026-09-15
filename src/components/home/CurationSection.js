import React, { useState } from 'react';

function CurationSection() {
  // 💡 메인에 고정으로 보여줄 영화 데이터 (첫 번째 영화로 고정 혹은 원하시는 기본값)
  const mainMovie = {
    badge: "#필름소사이어티",
    title: "싱 어 게인",
    quote: "“지금 당장, 노래 하나 써 봅시다”",
    description: "팝스타의 꿈은 접었지만 음악안에 놓지 못한 무명 축가 가수, 릭.\n한땐 잘나갔지만 지금은 나락 직전의 팝스타, 대니.\n우연히 만난 두 사람, 그들이 완성한 단 하나의 노래.\n하지만 그 곡은 오직 대니의 이름으로만 세상에 알려지는데-",
    mainPoster: "/img/00/01.jpg",
  };

  // 💡 하단에 나열될 서브 썸네일 목록 (클릭해도 메인 영역이 바뀌지 않고 독립적으로 동작)
  const subItems = [
    { id: 101, title: "청년 조용기 :", image: "/img/00/05.jpg" },
    { id: 102, title: "아가미", image: "/img/00/02.jpg" },
    { id: 103, title: "퍼펙트 블루", image: "/img/00/03.jpg" },
    { id: 104, title: "[2026 NT Live] 인간 혐오자", image: "/img/00/04.jpg" }
  ];

  // 선택 효과(테두리 강조)만 유지하고 싶다면 아래 state를 활용할 수 있습니다.
  const [selectedId, setSelectedId] = useState(101);

  return (
    <section className="w-full bg-[#351b63] pt-16 pb-20 flex flex-col items-center relative overflow-hidden text-white font-sans">
      
      <div className="w-full max-w-6xl px-6">
        
        {/* 상단 타이틀 및 '큐레이션 더보기 +' */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black tracking-tight text-white">큐레이션</h2>
          <button className="text-xs font-bold text-purple-300 hover:text-white transition">
            큐레이션 더보기 +
          </button>
        </div>

        {/* 큐레이션 메인 영역 */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          
          {/* [좌측] 메인 포스터 및 상세정보/예매 버튼 (고정됨) */}
          <div className="w-full lg:w-4/12 flex flex-col items-center relative">
            
            {/* 좌측 메인 영화 포스터 이미지 */}
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-zinc-800 flex items-center justify-center mb-4 border border-purple-500/30">
              
              {/* 좌측 상단 붉은색 리본 뱃지 */}
              <div className="absolute top-0 left-4 bg-[#e5383b] text-white text-[9px] font-black px-2.5 py-3 tracking-tighter shadow-md rounded-b flex flex-col items-center z-10">
                <span className="text-[7px] leading-none mb-0.5">MEGABOX</span>
                <span className="text-[10px] leading-none">FILM</span>
                <span className="text-[10px] leading-none">SOCIETY</span>
                <div className="absolute -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#a52224]"></div>
              </div>

              {mainMovie.mainPoster ? (
                <img src={mainMovie.mainPoster} alt={mainMovie.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <span className="text-xs font-bold text-zinc-400 block mb-1">메인 포스터 이미지 공간</span>
                </div>
              )}
            </div>

            {/* 상세정보 / 예매 버튼 */}
            <div className="w-full grid grid-cols-2 gap-3">
              <button className="py-3.5 rounded-xl bg-[#22103f] text-white font-bold text-xs border border-purple-400/30 hover:bg-[#1a0c30] transition">
                상세정보
              </button>
              <button className="py-3.5 rounded-xl bg-[#6c3fb5] text-white font-black text-xs hover:bg-[#5b329a] transition shadow-lg tracking-wide border border-purple-300/30">
                예매하기
              </button>
            </div>

          </div>

          {/* [우측] 정보 텍스트 및 서브 썸네일 리스트 */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-6">
            
            {/* 상단 텍스트 정보 (고정됨) */}
            <div>
              <span className="text-xs font-black tracking-widest text-purple-300 uppercase block mb-1">
                {mainMovie.badge}
              </span>
              <h3 className="text-4xl font-black text-white tracking-tight mb-6 leading-tight">
                {mainMovie.title}
              </h3>

              {/* 구분선 */}
              <div className="w-full h-[1px] bg-purple-500/30 mb-6"></div>

              <p className="text-sm font-bold text-purple-200 mb-4 tracking-tight">
                {mainMovie.quote}
              </p>

              <p className="text-xs text-purple-100/80 font-normal leading-relaxed whitespace-pre-line tracking-wide">
                {mainMovie.description}
              </p>
            </div>

            {/* 하단 가로형 서브 썸네일 리스트 */}
            <div className="pt-4">
              <div className="grid grid-cols-4 gap-4">
                {subItems.map((sub) => {
                  const isSelected = selectedId === sub.id;
                  return (
                    <div 
                      key={sub.id} 
                      className="flex flex-col gap-2 cursor-pointer group"
                      onClick={() => setSelectedId(sub.id)} // 클릭해도 메인 화면은 바뀌지 않고 테두리/선택 상태만 토글됨
                    >
                      
                      <div className={`relative w-full h-48 rounded-xl bg-zinc-800 overflow-hidden shadow-xl transition-all duration-300 ${
                        isSelected ? 'border-2 border-purple-300 ring-2 ring-purple-400/30' : 'border border-purple-500/20 opacity-70 group-hover:opacity-100'
                      }`}>
                        
                        {/* 서브 포스터 상단 작은 뱃지 포인트 */}
                        <div className="absolute top-0 left-2 bg-[#e5383b] text-white text-[8px] font-bold px-1.5 py-2 z-10 shadow">
                          F
                        </div>

                        {sub.image ? (
                          <img 
                            src={sub.image} 
                            alt={sub.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        ) : (
                          <span className="text-[10px] text-zinc-500 text-center px-1">썸네일 이미지</span>
                        )}
                      </div>

                      {/* 하단 작품 제목 */}
                      <span className={`text-xs truncate text-center transition-colors ${
                        isSelected ? 'text-white font-black' : 'text-purple-300/70 font-medium group-hover:text-white'
                      }`}>
                        {sub.title}
                      </span>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CurationSection;