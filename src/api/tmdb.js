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
      console.warn("KOBIS API 실시간 연동 대기 중입니다. 잠시 후 최신 영화로 자동 업데이트됩니다.");
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

          if (match) {
            overview = match.overview || overview;
            
            // TMDB 고유 ID가 있으면 감독 및 출연진(크레딧) 정보를 추가로 조회
            if (tmdbId) {
              const creditsUrl = `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=ko-KR`;
              const creditsRes = await fetch(creditsUrl);
              const creditsData = await creditsRes.json();

              // 감독 이름 찾기
              const foundDirector = creditsData.crew?.find(person => person.job === 'Director');
              if (foundDirector) {
                director = foundDirector.name;
              }

              // 주요 등장인물 상위 4명 이름 추출
              if (creditsData.cast && creditsData.cast.length > 0) {
                cast = creditsData.cast.slice(0, 4).map(actor => actor.name).join(', ');
              }
            }
          }

          return {
            id: tmdbId || movie.movieCd || index,
            title: movie.movieNm,
            rank: movie.rank,
            audiAcc: movie.audiAcc,
            openDt: movie.openDt,
            rate: movie.salesShare + '%',
            poster_path: match?.poster_path || '',
            backdrop_path: match?.backdrop_path || '',
            overview: overview,
            director: director,
            cast: cast
          };
        } catch (err) {
          return {
            id: movie.movieCd || index,
            title: movie.movieNm,
            rank: movie.rank,
            rate: '0%',
            poster_path: '',
            backdrop_path: '',
            overview: '등록된 줄거리가 없습니다.',
            director: '정보 없음',
            cast: '정보 없음'
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

function getFallbackMovies() {
  return [
    { 
      id: 1, 
      title: "인사이드 아웃 2", 
      openDt: "2024-06-12", 
      poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", 
      backdrop_path: "/xg2bc3DwrViaDWj6lBoq1mSYAKM.jpg",
      overview: "13살이 된 라일리의 머릿속 감정 컨트롤 본부. 새로운 감정들 앞에 비상등이 켜지는데...",
      director: "켈시 맨",
      cast: "에이미 포엘러, 마야 호크, 파트 마그리사"
    },
    { 
      id: 2, 
      title: "범죄도시4", 
      openDt: "2024-04-24", 
      poster_path: "/z1pufUDaUixWwIdXpeF54g2nS4G.jpg", 
      backdrop_path: "/vWzSuIZmNqMvI00sUSkFb9vMcVm.jpg",
      overview: "신종 마약 사건 3년 뒤, 괴물형사 마석도가 온라인 불법 도박 조직을 소탕하기 위해 나선다.",
      director: "허명행",
      cast: "마동석, 김무열, 박지환, 이동휘"
    },
    { 
      id: 3, 
      title: "파묘", 
      openDt: "2024-02-22", 
      poster_path: "/lWjrLW8YBWDvvnbz2rW1kUaJ70P.jpg", 
      backdrop_path: "/xOMo8DxID7PBBtT0q1hXo8sN7uG.jpg",
      overview: "거액의 돈을 받고 수상한 묘를 기이한 장례를 치르게 된 무당과 풍수사, 장의사에게 벌어지는 사건.",
      director: "장재현",
      cast: "최민식, 김고은, 유해진, 이도현"
    },
    { 
      id: 4, 
      title: "웡카", 
      openDt: "2024-01-31", 
      poster_path: "/qhb1qYhjpypsM13k0e2sY1K59pW.jpg", 
      backdrop_path: "/yyFc8UA5fscIAGlIe9qse41bZ21.jpg",
      overview: "세상에서 가장 달콤한 여정, 종잣돈도 없고 테이프도 없지만 꿈과 천재성만 있는 윌리 웡카의 이야기.",
      director: "폴 킹",
      cast: "티모시 샬라메, 칼라 레인, 칼 러너"
    },
    { 
      id: 5, 
      title: "듄: 파트 2", 
      openDt: "2024-02-28", 
      poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
      backdrop_path: "/xOMo8DxID7PBBtT0q1hXo8sN7uG.jpg",
      overview: "자신의능력을 깨닫고 각성한 폴 아트레이데스가 복수를 위한 여정에서 전사의 길을 걸어간다.",
      director: "드니 빌뇌브",
      cast: "티모시 샬라메, 젠데이아, 레베카 퍼거슨"
    }
  ];
}