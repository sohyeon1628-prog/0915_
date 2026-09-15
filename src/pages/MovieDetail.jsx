import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLatestMovies } from '../api/tmdb';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      const movies = await getLatestMovies();
      const foundMovie = movies.find((m) => String(m.id) === String(id)) || movies[0];
      setMovie(foundMovie);
      setLoading(false);
    };
    fetchMovieDetail();
  }, [id]);

  if (loading || !movie) {
    return (
      <div className="w-full min-h-screen bg-[#343a36] flex items-center justify-center text-white" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        <p className="text-sm font-bold animate-pulse text-[#b2c2bc]">로딩 중...</p>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/300x450?text=No+Image";

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
    : posterUrl;

  const numericId = Number(id) || 123;
  const ratingScore = movie.vote_average ? movie.vote_average.toFixed(1) : '9.5';
  const bookingRate = ((numericId % 15) + 12.4).toFixed(1);
  const rankNumber = (numericId % 3) + 1;
  const audienceCount = ((numericId * 34567) % 8000000 + 2340000).toLocaleString();

  const reviewPool = [
    { nick: "시네필***", text: "예측할 수 없는 전개와 압도적인 몰입감이 단연 최고였습니다." },
    { nick: "무비러버***", text: "화려한 연출과 깊이 있는 여운이 오래도록 가시는 명작." },
    { nick: "영화박사***", text: "배우들의 섬세한 연기력과 탄탄한 스토리 구성이 완벽합니다." },
    { nick: "팝콘요정***", text: "시간 가는 줄 모르고 몰입해서 본 올해 최고의 영화!" }
  ];
  const selectedReview = reviewPool[numericId % reviewPool.length];

  return (
    <div className="w-full min-h-screen bg-[#343a36] text-[#e2e7e3] pb-16 select-none" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      
      {/* 1. 상단 히어로 배너 영역 */}
      <div 
        className="w-full relative h-[360px] flex flex-col justify-end p-6 md:p-10 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#343a36] via-[#343a36]/60 to-black/30" />
        
        <div className="relative z-10 max-w-4xl w-full mx-auto space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            {movie.title || movie.name}
          </h1>
          <p className="text-xs text-[#b2c2bc] font-bold tracking-wide">
            {movie.release_date ? movie.release_date.split('-')[0] : '2026'} &bull; 15+ &bull; 18 Episodes &bull; Language: {movie.original_language?.toUpperCase() || 'KO'}
          </p>

          <div className="flex gap-2 pt-1">
            <span className="px-3 py-0.5 rounded-full border border-white/30 text-[11px] font-bold text-white bg-black/20 backdrop-blur-sm">
              Mystery
            </span>
            <span className="px-3 py-0.5 rounded-full border border-white/30 text-[11px] font-bold text-white bg-black/20 backdrop-blur-sm">
              Thriller
            </span>
            <span className="px-3 py-0.5 rounded-full border border-white/30 text-[11px] font-bold text-white bg-black/20 backdrop-blur-sm">
              Suspense
            </span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 컨테이너 */}
      <div className="max-w-4xl w-full mx-auto px-6 mt-6 space-y-6 relative z-10">
        
        {/* 통계 지표 (이모지 및 아이콘 제거 완료) */}
        <div className="grid grid-cols-3 gap-4 text-center items-center py-1.5 border-y border-white/10">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium text-[#9fb3ab] mb-0.5">실관람 평점</span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl md:text-2xl font-black text-white">{ratingScore}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-x border-white/10 px-2">
            <span className="text-[11px] font-medium text-[#9fb3ab] mb-0.5">예매율</span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl md:text-2xl font-black text-white">
                {rankNumber}위 <span className="text-xs font-normal text-[#b2c2bc]">({bookingRate}%)</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium text-[#9fb3ab] mb-0.5">누적관객수</span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-lg md:text-xl font-black text-white tracking-tight">
                {audienceCount} <span className="text-xs font-normal text-[#b2c2bc]">명</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. 정보 영역 (포스터 확대 및 감독/등장인물) */}
        <div className="flex flex-col md:flex-row gap-6 items-start pt-1">
          
          <div className="w-52 h-76 rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-[#262b28] flex-shrink-0 mx-auto md:mx-0">
            <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4 flex-grow">
            <div>
              <span className="text-xs text-white font-black tracking-wider uppercase">등장인물 :</span>
              <p className="text-xs font-semibold text-[#e2e7e3] mt-1 leading-relaxed">
                {movie.cast || "Jirawat Sutivanichsak, Hirunkit Changkhram, Rachanun Mahawan, Atthaphan Phunsawat"}
              </p>
            </div>

            <div>
              <span className="text-xs text-white font-black tracking-wider uppercase">감독 :</span>
              <p className="text-xs font-semibold text-[#e2e7e3] mt-1">
                {movie.director || "Kanittha Kwunyoo"}
              </p>
            </div>

            {/* 3. 그 아래 바로 배치되는 줄거리 섹션 */}
            <div>
              <span className="text-xs text-white font-black tracking-wider uppercase">줄거리 :</span>
              <p className="text-xs text-[#e2e7e3] leading-relaxed font-medium pt-1">
                {movie.overview || "엄격한 규칙과 통제가 존재하는 미스터리한 공간 속에서 벌어지는 긴장감 넘치는 이야기. 예측할 수 없는 전개와 비밀을 파헤쳐가는 스릴을 선사합니다."}
              </p>
            </div>
          </div>

        </div>

        {/* 4. 이미지 2개만 크게 배치하는 갤러리 섹션 */}
        <div className="space-y-3 pt-4">
          <h3 className="text-center text-xs font-black tracking-[0.3em] text-[#b2c2bc] uppercase">
            G A L L E R Y
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-56 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#262b28]">
              <img src={backdropUrl} alt="gallery 1" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
            <div className="h-56 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-[#262b28]">
              <img src={posterUrl} alt="gallery 2" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </div>
          </div>
        </div>

        {/* 5. 그 아래 배치되는 리뷰 섹션 */}
        <div className="space-y-3 pt-4">
          <h3 className="text-center text-xs font-black tracking-[0.3em] text-[#b2c2bc] uppercase">
            R E V I E W
          </h3>

          <div className="flex items-center justify-between py-2 px-3 border-b border-white/10 text-xs">
            <span className="font-bold text-[#b2c2bc]">{selectedReview.nick}</span>
            <span className="text-[#cbd3ce] font-medium">{selectedReview.text}</span>
          </div>

          <p className="text-center text-[11px] italic text-[#9fb3ab] pt-1">
            "진정한 가치와 선택은 타인이 아닌 스스로의 의지에 의해 증명된다."
          </p>
        </div>

      </div>

    </div>
  );
}

export default MovieDetail;