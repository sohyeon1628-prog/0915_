// src/api/tmdb.js

export async function getLatestMovies() {
    const TMDB_API_KEY = '7b62a6d8f7b7f0e49308f8c6ceb4cf80'; 
  const KOBIS_API_KEY = 'b5b0cb84dc79a8589d6d6bee3a960b00';  
  
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const targetDt = d.toISOString().slice(0, 10).replace(/-/g, '');

  try {
    const kobisUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${targetDt}`;
    
    const kobisRes = await fetch(kobisUrl);
    const kobisData = await kobisRes.json();
    
    if (!kobisData.boxOfficeResult || !kobisData.boxOfficeResult.dailyBoxOfficeList) {
      console.warn("KOBIS API 실시간 연동 대기 중입니다. 기본 추천 영화로 대체합니다.");
      return getFallbackMovies();
    }

    const boxOfficeList = kobisData.boxOfficeResult.dailyBoxOfficeList;

    const moviesWithPosters = await Promise.all(
      boxOfficeList.map(async (movie, index) => {
        const query = encodeURIComponent(movie.movieNm);
        const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko-KR&query=${query}`;
        
        try {
          const searchRes = await fetch(tmdbSearchUrl);
          const searchData = await searchRes.json();
          const match = searchData.results?.[0];

          let director = '정보 없음';
          let cast = '정보 없음';
          let overview = '등록된 줄거리가 없습니다.';
          let tmdbId = match?.id;
          let gallery = [];

          if (match) {
            overview = match.overview || overview;
            
            if (tmdbId) {
              const [creditsRes, imagesRes] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=ko-KR`),
                fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${TMDB_API_KEY}`)
              ]);

              const creditsData = await creditsRes.json();
              const imagesData = await imagesRes.json();

              const foundDirector = creditsData.crew?.find(person => person.job === 'Director');
              if (foundDirector) {
                director = foundDirector.name;
              }

              if (creditsData.cast && creditsData.cast.length > 0) {
                cast = creditsData.cast.slice(0, 4).map(actor => actor.name).join(', ');
              }

              // 💡 메인 목록에서도 갤러리를 최대 12장까지 넉넉하게 가져오도록 수정
              if (imagesData.backdrops && imagesData.backdrops.length > 0) {
                gallery = imagesData.backdrops.slice(0, 12).map(img => `https://image.tmdb.org/t/p/w500${img.file_path}`);
              }
            }
          }

          const posterUrl = match?.poster_path ? `https://image.tmdb.org/t/p/w500${match.poster_path}` : '';
          const backdropUrl = match?.backdrop_path ? `https://image.tmdb.org/t/p/original${match.backdrop_path}` : '';

          return {
            id: tmdbId ? tmdbId.toString() : (movie.movieCd || index.toString()),
            title: movie.movieNm,
            year: movie.openDt ? movie.openDt.split('-')[0] : '2026',
            age: '15+',
            duration: '1h 50m',
            language: 'KO',
            rank: movie.rank,
            audiAcc: movie.audiAcc,
            openDt: movie.openDt,
            rating: match?.vote_average ? match.vote_average.toFixed(1) : '9.5',
            rate: movie.salesShare + '%',
            poster: posterUrl,
            poster_path: posterUrl,
            backdrop: backdropUrl,
            backdrop_path: backdropUrl,
            synopsis: overview,
            overview: overview,
            director: director,
            casts: cast,
            cast: cast,
            genres: ['드라마', '영화'],
            gallery: gallery
          };
        } catch (err) {
          return {
            id: (movie.movieCd || index).toString(),
            title: movie.movieNm,
            year: '2026',
            age: '15+',
            duration: '1h 50m',
            language: 'KO',
            rank: movie.rank,
            rate: '0%',
            poster: '',
            poster_path: '',
            backdrop: '',
            backdrop_path: '',
            synopsis: '등록된 줄거리가 없습니다.',
            overview: '등록된 줄거리가 없습니다.',
            director: '정보 없음',
            casts: '정보 없음',
            cast: '정보 없음',
            genres: ['영화'],
            gallery: []
          };
        }
      })
    );

    return moviesWithPosters;
  } catch (error) {
    console.error('API 연동 에러:', error);
    return getFallbackMovies();
  }
}

// 💡 상세 페이지에서 호출하는 함수 (API 키와 갤러리 12장 제한 반영)
export async function getMovieDetails(id) {
    const TMDB_API_KEY = '7b62a6d8f7b7f0e49308f8c6ceb4cf80';   

  try {
    const [detailRes, creditsRes, imagesRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko-KR`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=ko-KR`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${TMDB_API_KEY}`)
    ]);

    const data = await detailRes.json();
    const credits = await creditsRes.json();
    const images = await imagesRes.json();

    if (!data || !data.id) return null;

    const directorObj = credits.crew?.find(p => p.job === 'Director');
    const castsStr = credits.cast ? credits.cast.slice(0, 4).map(c => c.name).join(', ') : '정보 없음';
    
    // 💡 스틸컷 갤러리를 2개씩 6줄 = 총 12장까지 가져오도록 수정
    const galleryList = images.backdrops ? images.backdrops.slice(0, 12).map(img => `https://image.tmdb.org/t/p/w500${img.file_path}`) : [];

    return {
      id: data.id.toString(),
      title: data.title,
      year: data.release_date ? data.release_date.split('-')[0] : '2026',
      age: data.adult ? '19+' : '15+',
      duration: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : '1h 50m',
      language: data.original_language ? data.original_language.toUpperCase() : 'KO',
      rating: data.vote_average ? data.vote_average.toFixed(1) : '9.5',
      poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
      backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : '',
      synopsis: data.overview || '등록된 줄거리가 없습니다.',
      director: directorObj ? directorObj.name : '정보 없음',
      casts: castsStr,
      genres: data.genres ? data.genres.map(g => g.name) : ['영화'],
      gallery: galleryList
    };
  } catch (error) {
    console.error("getMovieDetails 에러:", error);
    return null;
  }
}

function getFallbackMovies() {
  return [
    { 
      id: "1", 
      title: "인사이드 아웃 2", 
      year: "2024",
      age: "전체관람가",
      duration: "1h 36m",
      language: "EN",
      openDt: "2024-06-12", 
      rating: "8.7",
      poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", 
      backdrop: "https://image.tmdb.org/t/p/original/xg2bc3DwrViaDWj6lBoq1mSYAKM.jpg",
      synopsis: "13살이 된 라일리의 머릿속 감정 컨트롤 본부...",
      director: "켈시 맨",
      casts: "에이미 포엘러, 마야 호크",
      genres: ["애니메이션", "모험"],
      gallery: []
    }
  ];
}