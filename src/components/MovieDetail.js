import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { moviesData } from '../data/moviesData';
import { getMovieDetails } from '../api/tmdb';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // 리뷰 더보기 상태 관리 (기본 5개 노출, 더보기 누르면 전체 노출)
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      if (moviesData[id]) {
        setMovie({
          ...moviesData[id],
          rank: '1',
          rate: '15.4%',
          reviews: getDummyReviews()
        });
        setLoading(false);
        return;
      }

      try {
        const apiData = await getMovieDetails(id);
        if (apiData) {
          setMovie({
            ...apiData,
            // 💡 영화 고유 순위나 임의의 순위/예매율 부여 (실제 rank가 없으면 기본값 설정)
            rank: apiData.rank || (id % 5 + 1).toString(),
            rate: apiData.rate || `${(18 - (id % 5) * 2.5).toFixed(1)}%`,
            reviews: getDummyReviews()
          });
        } else {
          setMovie({
            ...Object.values(moviesData)[0],
            rank: '1',
            rate: '15.4%',
            reviews: getDummyReviews()
          });
        }
      } catch (err) {
        console.error("영화 상세 정보 연동 중 오류 발생:", err);
        setMovie({
          ...Object.values(moviesData)[0],
          rank: '1',
          rate: '15.4%',
          reviews: getDummyReviews()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // 가상의 실관람평 10개 생성 함수
  function getDummyReviews() {
    return [
      { id: 1, author: "영화광소현", rating: 10, text: "연출과 스토리 모두 완벽했습니다! 러닝타임이 어떻게 지나간지 모르겠네요.", date: "2026.09.14" },
      { id: 2, author: "메가박스VIP", rating: 9, text: "사운드와 영상미가 압도적입니다. 꼭 특별관에서 다시 보고 싶은 영화!", date: "2026.09.14" },
      { id: 3, author: "시네마러버", rating: 10, text: "배우들의 연기력이 진짜 미쳤습니다. 여운이 가시질 않네요.", date: "2026.09.13" },
      { id: 4, author: "팝콘무제한", rating: 8, text: "전개도 빠르고 지루할 틈이 없었어요. 추천합니다!", date: "2026.09.13" },
      { id: 5, author: "돌비사운드최고", rating: 9, text: "몰입감이 엄청납니다. 올해 본 영화 중 단연 최고예요.", date: "2026.09.12" },
      { id: 6, author: "영화보러온사람", rating: 10, text: "눈물 흘리면서 봤습니다. 감동이 장난 아니에요ㅠㅠ", date: "2026.09.12" },
      { id: 7, author: "무비스타", rating: 9, text: "스토리 개연성도 탄탄하고 결말도 마음에 듭니다.", date: "2026.09.11" },
      { id: 8, author: "주말관객", rating: 8, text: "생각보다 훨씬 더 몰입해서 봤어요. 시간 가는 줄 몰랐음.", date: "2026.09.11" },
      { id: 9, author: "엔딩크레딧덕후", rating: 10, text: "OST가 아직도 귓가를 맴돕니다. 사운드트랙 꼭 들으세요!", date: "2026.09.10" },
      { id: 10, author: "문화의날", rating: 9, text: "기대 안 하고 봤는데 대박 명작을 건졌네요. 강추합니다!", date: "2026.09.10" }
    ];
  }

  if (loading) {
    return <div className="w-full min-h-screen bg-[#f7f6f2] text-zinc-900 flex items-center justify-center font-bold text-xl">영화 정보를 불러오는 중...</div>;
  }

  if (!movie) return <div className="text-zinc-900 text-center py-20">영화를 찾을 수 없습니다.</div>;

  const getImageSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return process.env.PUBLIC_URL + path;
  };

  const displayedReviews = showAllReviews ? movie.reviews : movie.reviews.slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-[#f7f6f2] text-zinc-900 font-sans relative pb-20">
      
      {/* 상단 백드롭(배경) 이미지 및 오버레이 */}
      <div className="absolute top-0 left-0 w-full h-[450px] overflow-hidden z-0">
        <img 
          src={getImageSrc(movie.backdrop || movie.poster)} 
          alt="backdrop" 
          className="w-full h-full object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f6f2]/20 via-[#f7f6f2]/80 to-[#f7f6f2]"></div>
      </div>

      {/* 컨텐츠 메인 Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto pt-24 px-6">
        
        {/* 영화 타이틀 및 메타 정보 */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-3 drop-shadow-sm">
            {movie.title}
          </h1>
          <p className="text-zinc-600 text-sm font-bold mb-4">
            {movie.year} · {movie.age} · {movie.duration} · Language: {movie.language}
          </p>
          
          {/* 장르 뱃지 */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre, idx) => (
              <span key={idx} className="bg-zinc-200/80 backdrop-blur text-zinc-700 text-xs font-bold px-3 py-1 rounded-full border border-zinc-300/60 shadow-sm">
                {typeof genre === 'string' ? genre : genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* 💡 관람객 평점 / 실제 순위 연동 예매율 / 누적관객수 통계 바 */}
        <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 py-6 px-8 grid grid-cols-3 text-center mb-12 shadow-xl">
          <div className="border-r border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 block mb-1">실관람 평점</span>
            <span className="text-2xl md:text-3xl font-black text-zinc-900">
              {movie.rating || '9.5'}
            </span>
          </div>
          <div className="border-r border-zinc-200">
            <span className="text-xs font-bold text-zinc-500 block mb-1">박스오피스 순위</span>
            <span className="text-2xl md:text-3xl font-black text-[#503396]">
              {movie.rank ? `${movie.rank}위` : '1위'} 
              <span className="text-xs text-zinc-500 font-normal block md:inline md:ml-1">
                ({movie.rate || '15.4%'})
              </span>
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-500 block mb-1">누적관객수</span>
            <span className="text-xl md:text-2xl font-black text-zinc-900">
              {movie.audiAcc ? Number(movie.audiAcc).toLocaleString() : '8,199,271'} <span className="text-xs font-normal text-zinc-500">명</span>
            </span>
          </div>
        </div>

        {/* 중단 상세 정보 영역 (포스터 + 영화정보 리스트) */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
          
          {/* 좌측 포스터 이미지 */}
          <div className="w-full md:w-4/12 flex-shrink-0">
            <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-zinc-200 border border-zinc-300">
              <img 
                src={getImageSrc(movie.poster)} 
                alt={movie.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* 우측 텍스트 정보 */}
          <div className="w-full md:w-8/12 space-y-6 bg-white/70 p-8 md:p-10 rounded-3xl border border-zinc-200/80 backdrop-blur-md shadow-xl">
            
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight pb-2 border-b border-zinc-200">
              영화정보
            </h2>

            <div className="space-y-4 text-base md:text-lg">
              <div className="flex items-start">
                <span className="text-zinc-500 font-bold w-20 flex-shrink-0">· 장르</span>
                <span className="text-zinc-800 font-medium">
                  {Array.isArray(movie.genres) 
                    ? movie.genres.map(g => (typeof g === 'string' ? g : g.name)).join(' / ') 
                    : '드라마'}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-zinc-500 font-bold w-20 flex-shrink-0">· 감독</span>
                <span className="text-zinc-800 font-medium underline underline-offset-4 decoration-zinc-400">
                  {movie.director || '정보 없음'}
                </span>
              </div>

              <div className="flex items-start">
                <span className="text-zinc-500 font-bold w-20 flex-shrink-0">· 출연</span>
                <span className="text-zinc-800 font-medium leading-relaxed">
                  {movie.casts || movie.cast || '정보 없음'}
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-zinc-200 my-4"></div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-zinc-900">· 줄거리</h3>
              <p className="text-base md:text-lg text-zinc-700 font-normal leading-relaxed tracking-wide text-justify">
                {movie.synopsis || movie.overview || '줄거리가 없습니다.'}
              </p>
            </div>

            <div className="pt-4">
              <button className="w-full py-4 rounded-xl bg-[#503396] text-white font-black text-base hover:bg-[#3f2777] transition shadow-lg tracking-wide border border-purple-400/30">
                예매하기
              </button>
            </div>

          </div>

        </div>

        {/* 하단 갤러리 섹션 (8개) */}
        {movie.gallery && movie.gallery.length > 0 && (
          <div className="mb-20">
            <h3 className="text-sm font-black tracking-widest uppercase text-zinc-500 mb-8 text-center">
              G A L L E R Y
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.gallery.slice(0, 8).map((imgSrc, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-zinc-200 aspect-[16/9] border border-zinc-300 shadow-md">
                  <img 
                    src={getImageSrc(imgSrc)} 
                    alt={`gallery-${idx}`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 실관람평(리뷰) 섹션 */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-zinc-200/80 p-8 md:p-10 shadow-xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200">
            <h3 className="text-xl font-extrabold text-zinc-900">
              실관람평 <span className="text-[#503396] font-black">({movie.reviews?.length || 10})</span>
            </h3>
            <span className="text-xs text-zinc-500 font-semibold">관람객 평점은 실관람객의 생생한 후기입니다.</span>
          </div>

          <div className="space-y-4">
            {displayedReviews.map((review) => (
              <div key={review.id} className="p-6 rounded-2xl bg-[#f7f6f2] border border-zinc-200/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-zinc-900 text-base bg-white px-3 py-1 rounded-lg border border-zinc-200 shadow-2xs">
                      {review.author}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">{review.date}</span>
                  </div>
                  <p className="text-zinc-800 text-base md:text-lg font-normal leading-relaxed pl-1">
                    {review.text}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-end md:self-center flex-shrink-0">
                  <span className="text-xs font-bold text-zinc-400">평점</span>
                  <span className="text-2xl font-black text-[#503396] tracking-tight">
                    {review.rating}<span className="text-sm font-bold text-[#503396]">점</span>
                  </span>
                </div>

              </div>
            ))}
          </div>

          {!showAllReviews && movie.reviews && movie.reviews.length > 5 && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowAllReviews(true)}
                className="px-8 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm transition border border-zinc-300 shadow-sm"
              >
                더보기 ▼
              </button>
            </div>
          )}

          {showAllReviews && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowAllReviews(false)}
                className="px-8 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-sm transition border border-zinc-300 shadow-sm"
              >
                접기 ▲
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default MovieDetail;