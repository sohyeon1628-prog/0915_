import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLatestMovies } from '../api/tmdb';

function SchedulePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cinemaRegions = {
    "서울(18)": ['강남', '코엑스', '홍대', '신촌', '목동', '상봉', '군자', '동대문', '마곡', '백석', '성수', '이수', '창동', '합정', 'KINTEX', '남주안', '검단', '송도'],
    "경기(32)": ['수원', '동탄', '판교', '일산', '부천', '안양', '평택', '용인', '고양', '구리', '남양주', '의정부', '파주', '하남', '시흥', '광명', '김포', '이천', '안성', '오산', '의왕', '포천', '양주', '여주', '동두천', '가평', '연천', '과천', '군포', '오포', '광주', '서수원'],
    "인천(7)": ['인천터미널', '송도', '청라', '연수구청', '주안역', '검단', '영종'],
    "대전/충청/세종(16)": ['공주', '논산', '대전신세계', '대전유성', '대전중앙로', '대전현대아울렛', '세종(조치원)', '세종나성', '오창', '진천', '천안', '청주', '서산', '당진', '제천', '충주'],
    "부산/대구/경상(25)": ['서면', '센텀시티', '대구신세계', '동성로', '경주', '구미', '포항', '창원', '마산', '진주', '김해', '양산', '거제', '통영', '안동', '영주', '상주', '경산', '영천', '김천', '칠곡', '문경', '울산', '정관', '사상'],
    "광주/전라(9)": ['광주상무', '광주하남', '전주', '익산', '군산', '목포', '순천', '여수', '광양'],
    "강원(4)": ['춘천', '원주', '강릉', '속초'],
    "제주(3)": ['제주아라', '제주서귀포', '제주노형']
  };

  const regionKeys = Object.keys(cinemaRegions);
  const [selectedRegion, setSelectedRegion] = useState(regionKeys[0]);
  const [selectedCinema, setSelectedCinema] = useState(cinemaRegions[regionKeys[0]][0]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const [bookingStep, setBookingStep] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [adultCount, setAdultCount] = useState(1);
  const [youthCount, setYouthCount] = useState(0);

  const navigate = useNavigate();

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return {
      dateObj: d,
      dayLabel: i === 0 ? '오늘' : dayNames[d.getDay()],
      dateNum: d.getDate(),
    };
  });

  const selectedDate = dates[selectedDateIndex];
  const formattedSelectedDate = `${selectedDate.dateObj.getFullYear()}.${String(selectedDate.dateObj.getMonth() + 1).padStart(2, '0')}.${String(selectedDate.dateObj.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getLatestMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const handleTimeClick = (movie, timeSlot) => {
    setSelectedMovie(movie);
    setSelectedTimeSlot(timeSlot);
    setBookingStep('peopleSelect');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center text-zinc-800" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        <p className="text-sm font-bold animate-pulse text-[#503396]">상영시간표를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-zinc-800 pb-24" style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      
      {/* 상단 타이틀 영역 */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900">상영시간표</h2>
        <p className="text-xs text-zinc-500 mt-1">메가박스 전국 지점별 실시간 상영시간을 확인하세요.</p>
      </div>

      {/* 극장 선택 영역 */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-4">
          
          <div className="flex border-b border-zinc-200 pb-3 gap-6 text-sm font-black">
            <span className="text-[#503396] border-b-2 border-[#503396] pb-1 cursor-pointer">전체</span>
            <span className="text-zinc-400 hover:text-zinc-700 cursor-pointer transition">특별관</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            
            <div className="border border-zinc-200 rounded-xl bg-white p-2.5 h-60 overflow-y-auto space-y-1.5">
              {regionKeys.map((region) => (
                <div
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setSelectedCinema(cinemaRegions[region][0]);
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-xs font-bold cursor-pointer transition flex justify-between items-center whitespace-nowrap ${
                    selectedRegion === region
                      ? 'bg-[#503396] text-white shadow-sm'
                      : 'text-zinc-700 hover:bg-zinc-100 bg-zinc-50/50'
                  }`}
                >
                  <span className="truncate">{region}</span>
                </div>
              ))}
            </div>

            <div className="md:col-span-3 border border-zinc-200 rounded-xl bg-white p-3 h-60 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cinemaRegions[selectedRegion].map((cinema) => (
                  <div
                    key={cinema}
                    onClick={() => setSelectedCinema(cinema)}
                    className={`h-11 flex items-center justify-center px-3 rounded-lg text-xs font-semibold cursor-pointer transition truncate ${
                      selectedCinema === cinema
                        ? 'bg-zinc-900 text-white font-bold shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                    }`}
                  >
                    {cinema}점
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 날짜 선택 바 영역 (박스 형태 및 이모지 제거) */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {dates.map((item, idx) => {
              const isSelected = selectedDateIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDateIndex(idx)}
                  className={`flex flex-col items-center justify-center min-w-[56px] h-16 rounded-xl transition-all font-bold ${
                    isSelected 
                      ? 'bg-[#503396] text-white shadow-md scale-105' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  <span className="text-[11px] font-semibold">{item.dayLabel}</span>
                  <span className="text-base font-black mt-0.5">{item.dateNum}</span>
                </button>
              );
            })}
          </div>

          <div className="text-sm font-black text-zinc-800 tracking-tight">
            [{selectedCinema}점] {formattedSelectedDate} 
          </div>

        </div>
      </div>

      {/* 상영 스케줄 목록 영역 */}
      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        {movies.map((movie, index) => {
          const numericId = movie.id || index + 1;
          const releaseDate = movie.release_date ? movie.release_date.replace(/-/g, '.') : '2026.08.05';
          
          const screeningTimes = [
            { t: "10:00", seat: `${(numericId * 7) % 120 + 10}석 (조조)` },
            { t: "13:30", seat: `${(numericId * 13) % 90 + 5}석 (일반)` },
            { t: "16:50", seat: `${(numericId * 5) % 60 + 2}석 (일반)` },
            { t: "20:10", seat: numericId % 4 === 0 ? "0석 (마감)" : `${(numericId * 9) % 80 + 10}석 (일반)` }
          ];

          return (
            <div key={numericId} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-purple-300 transition">
              
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-50 text-[#503396] border border-purple-200">
                    {index % 2 === 0 ? '돌비시네마 (1관)' : '일반상영관 2관'}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">개봉일 {releaseDate}</span>
                </div>
                <span className="text-xs font-semibold text-zinc-500">
                  전체관람가 &bull; 120분
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <img 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/100x150"} 
                    alt={movie.title} 
                    className="w-12 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <h3 className="text-base font-black text-zinc-900 tracking-tight">
                    {movie.title || movie.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {screeningTimes.map((timeSlot, tIdx) => {
                    const isClosed = timeSlot.seat.includes('마감');
                    return (
                      <div 
                        key={tIdx} 
                        onClick={() => !isClosed && handleTimeClick(movie, timeSlot)}
                        className={`flex flex-col items-center justify-center border rounded-xl px-4 py-2 transition shadow-sm ${
                          isClosed 
                            ? 'bg-zinc-100 border-zinc-200 opacity-50 cursor-not-allowed' 
                            : 'bg-white border-zinc-300 hover:border-[#503396] cursor-pointer group'
                        }`}
                      >
                        <span className={`text-sm font-black ${isClosed ? 'text-zinc-400' : 'text-zinc-900 group-hover:text-[#503396]'}`}>
                          {timeSlot.t}
                        </span>
                        <span className="text-[10px] font-semibold text-zinc-400 mt-0.5">
                          {timeSlot.seat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 인원수 선택 모달 (이모지 제거) */}
      {bookingStep === 'peopleSelect' && selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
              <h3 className="text-lg font-black text-zinc-900">관람 인원 선택</h3>
              <button onClick={() => setBookingStep(null)} className="text-zinc-400 hover:text-zinc-700 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-1.5 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700">
              <p>영화: <span className="text-[#503396] font-bold">{selectedMovie.title}</span></p>
              <p>극장: {selectedCinema}점 | 상영시간: {selectedTimeSlot?.t}</p>
              <p>상영일자: {formattedSelectedDate}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-800">성인 (14,000원)</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-8 h-8 rounded-lg border border-zinc-300 bg-white font-bold text-zinc-700 hover:bg-zinc-100"
                  >-</button>
                  <span className="text-sm font-black w-4 text-center">{adultCount}</span>
                  <button 
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="w-8 h-8 rounded-lg border border-zinc-300 bg-white font-bold text-zinc-700 hover:bg-zinc-100"
                  >+</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-zinc-800">청소년 (11,000원)</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setYouthCount(Math.max(0, youthCount - 1))}
                    className="w-8 h-8 rounded-lg border border-zinc-300 bg-white font-bold text-zinc-700 hover:bg-zinc-100"
                  >-</button>
                  <span className="text-sm font-black w-4 text-center">{youthCount}</span>
                  <button 
                    onClick={() => setYouthCount(youthCount + 1)}
                    className="w-8 h-8 rounded-lg border border-zinc-300 bg-white font-bold text-zinc-700 hover:bg-zinc-100"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
              <div>
                <span className="text-xs text-zinc-500">총 결제 금액</span>
                <p className="text-lg font-black text-[#503396]">{((adultCount * 14000) + (youthCount * 11000)).toLocaleString()}원</p>
              </div>
              <button 
                onClick={() => setBookingStep('complete')}
                className="px-6 py-3 bg-[#503396] hover:bg-[#432a7e] text-white rounded-xl text-sm font-bold shadow-md transition"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 예매 완료 모달 (이모지 제거) */}
      {bookingStep === 'complete' && selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-purple-100 text-[#503396] rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-zinc-900">예매가 완료되었습니다!</h3>
              <p className="text-xs text-zinc-500">즐거운 관람 되시기를 바랍니다.</p>
            </div>

            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-left space-y-1.5 text-xs text-zinc-600">
              <p><strong className="text-zinc-900">{selectedMovie.title}</strong></p>
              <p>극장: {selectedCinema}점 상영관</p>
              <p>일시: {formattedSelectedDate} ({selectedTimeSlot?.t})</p>
              <p>인원: 성인 {adultCount}명{youthCount > 0 ? `, 청소년 ${youthCount}명` : ''}</p>
              <p className="pt-2 border-t border-zinc-200 font-bold text-[#503396]">
                결제금액: {((adultCount * 14000) + (youthCount * 11000)).toLocaleString()}원
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setBookingStep(null)}
                className="flex-1 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition"
              >
                시간표로 돌아가기
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-[#503396] hover:bg-[#432a7e] text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                홈으로 가기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default SchedulePage;