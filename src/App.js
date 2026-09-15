import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HeroSection from './components/home/HeroSection';
import DestinationGrid from './components/home/DestinationGrid';
import CurationSection from './components/home/CurationSection';
import MegaboxGuide from './components/home/MegaboxGuide';
import Carousel3D from './components/Carousel3D';
import FadeInSection from './components/common/FadeInSection';
import SchedulePage from './pages/SchedulePage';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

// 💡 지웠던 플로팅 바 컴포넌트 다시 불러오기
import FloatingEmotionBar from './components/home/FloatingEmotionBar'; 
import EmotionRecommendPage from './components/home/EmotionRecommendPage'; 

import { getLatestMovies } from './api/tmdb';
import './App.css';

function Home({ movies, currentIndex, setCurrentIndex }) {
  const currentMovie = movies[currentIndex] || movies[0] || null;

  return (
    <div className="w-full flex flex-col bg-[#fbfbfa]">
      <FadeInSection>
        <div className="w-full pt-0 pb-6">
          <HeroSection currentMovie={currentMovie} />
        </div>
      </FadeInSection>
      
      <FadeInSection>
        <div className="w-full py-6">
          <Carousel3D movies={movies} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </div>
      </FadeInSection>
      
      <FadeInSection>
        <div className="w-full py-6">
          <DestinationGrid movies={movies} />
        </div>
      </FadeInSection>
      
      <FadeInSection>
        <div className="w-full pt-6 pb-0">
          <MegaboxGuide />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="w-full py-0">
          <CurationSection />
        </div>
      </FadeInSection>

      {/* 💡 메인 페이지 하단 스크롤을 따라다니는 플로팅 바 다시 추가! */}
      <FloatingEmotionBar movies={movies} />
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getLatestMovies();
      if (data && data.length > 0) {
        setMovies(data);
      }
    };
    fetchMovies();
  }, []);

  return (
    /* 💡 깃허브 페이지 경로 인식을 위해 basename 추가 */
    <Router basename={process.env.PUBLIC_URL}>
      <div className="bg-[#fbfbfa] min-h-screen text-zinc-900 font-sans flex flex-col justify-between selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  movies={movies} 
                  currentIndex={currentIndex} 
                  setCurrentIndex={setCurrentIndex} 
                />
              } 
            />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/emotion" element={<EmotionRecommendPage movies={movies} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;