import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HeroSection from './components/home/HeroSection';
import DestinationGrid from './components/home/DestinationGrid';
import CurationSection from './components/home/CurationSection';
import Carousel3D from './components/Carousel3D';
import FadeInSection from './components/common/FadeInSection';
import SchedulePage from './pages/SchedulePage';
import MovieList from './pages/MovieList';
import MovieDetail from './components/MovieDetail'; // components 폴더 안의 MovieDetail 연동
import FeaturesSection from './components/home/FeaturesSection';
import FloatingEmotionBar from './components/home/FloatingEmotionBar'; 
import EmotionRecommendPage from './components/home/EmotionRecommendPage'; 
import { getLatestMovies } from './api/tmdb';
import './App.css';

function Home({ movies, currentIndex, setCurrentIndex }) {
  return (
    <div className="w-full flex flex-col bg-[#fbfbfa]">
      <FadeInSection>
        <div className="w-full pt-0 pb-6">
          <HeroSection movies={movies} currentIndex={currentIndex} />
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
        <div className="w-full py-0">
          <CurationSection />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="w-full pt-10 pb-16">
          <FeaturesSection />
        </div>
      </FadeInSection>

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

  useEffect(() => {
    if (movies.length <= 1) return;

    const slideTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 3000); 

    return () => clearInterval(slideTimer);
  }, [movies]);

  return (
    <Router basename={process.env.NODE_ENV === 'development' ? '' : process.env.PUBLIC_URL}>
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