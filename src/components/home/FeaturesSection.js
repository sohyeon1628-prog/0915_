import React from 'react';

function FeaturesSection() {
  const specials = [
    { title: 'Dolby Cinema', desc: '돌비 시네마 고화질·고음질' },
    { title: 'MX Tracker', desc: '체감형 사운드 MX관' },
    { title: 'The Boutiques', desc: '프리미엄 커플 부티크관' },
    { title: 'Comfort', desc: '컴포트 소파 시트' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 border-t border-zinc-200">
      <h3 className="text-xs font-bold text-[#503396] uppercase tracking-widest mb-1">Features Special</h3>
      <h2 className="text-xl font-extrabold text-zinc-900 mb-6">Megabox Special</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specials.map((item, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-4 text-center hover:border-[#503396] transition shadow-sm">
            <div className="w-full h-24 bg-zinc-100 rounded-lg mb-3 flex items-center justify-center text-zinc-500 text-xs font-medium">
              배너 이미지
            </div>
            <h4 className="text-sm font-bold text-zinc-900 mb-1">{item.title}</h4>
            <p className="text-xs text-zinc-600 mb-3">{item.desc}</p>
            <button className="text-xs bg-zinc-100 hover:bg-[#503396] text-zinc-800 hover:text-white font-semibold w-full py-1.5 rounded transition">
              예매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturesSection;