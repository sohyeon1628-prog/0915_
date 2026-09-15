import React from 'react';

function MegaboxGuide() {
  return (
    <div 
      className="w-full flex flex-col items-center mt-4" 
      style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      
      {/* 💡 혜택 영역(DestinationGrid)과 가로폭을 max-w-5xl로 동일하게 통일 */}
      <div className="max-w-5xl w-full px-6 flex flex-col md:flex-row gap-6 mb-12">
        
        {/* 첫 번째 토스 즉시할인 박스 */}
        <div className="flex-1 bg-white border border-zinc-200/80 rounded-2xl p-7 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#3182f6] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                toss payments
              </span>
              <span className="text-zinc-400 text-[10px] font-black tracking-wider">× MEGABOX</span>
            </div>
            <p className="text-zinc-900 font-black text-lg">
              퀵계좌이체 결제 시 <span className="text-[#3182f6]">0.3% 즉시할인</span>
            </p>
          </div>
          <div className="text-4xl drop-shadow-sm">🍿</div>
        </div>

        {/* 두 번째 토스 즉시할인 박스 */}
        <div className="flex-1 bg-white border border-zinc-200/80 rounded-2xl p-7 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          <div>
            <div className="text-zinc-500 text-xs font-black mb-2">토스 퀵계좌이체</div>
            <p className="text-zinc-900 font-black text-lg">0.3% 즉시할인</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#503396] flex items-center justify-center text-white font-black text-xl shadow-md">
            %
          </div>
        </div>
        
      </div>

      {/* 하단 보라색 퀵 메뉴 바 */}
      <div className="w-full bg-[#422678] py-14 px-6 text-white flex justify-center shadow-inner mt-2 z-10">
        <div className="w-full max-w-5xl flex items-center justify-around text-center">
          
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
  );
}

export default MegaboxGuide;