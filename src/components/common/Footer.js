import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-[#0d0b10] text-zinc-500 text-xs py-10 px-8 border-t border-white/10 text-center md:text-left">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-bold text-zinc-400 mb-1">MEGABOX Clone Project</p>
          <p>서울특별시 강남구 테헤란로 메가박스 빌딩 | 대표이사 : 홍길동</p>
          <p className="mt-2">Copyright © MegaboxJoA Co., Ltd. All rights reserved.</p>
        </div>
        <div className="flex gap-4 text-zinc-400">
          <span className="cursor-pointer hover:underline">회사소개</span>
          <span className="cursor-pointer hover:underline">지점안내</span>
          <span className="cursor-pointer hover:underline">이용약관</span>
          <span className="cursor-pointer hover:underline font-bold text-purple-400">개인정보처리방침</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;