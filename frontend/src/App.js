import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIBuild from './components/WhatIBuild';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Timeline from './components/Timeline';
import './App.css';

function App() {
  return (
    <div className="App">
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <Hero />
      <WhatIBuild />
      <Skills />
      <Projects />
      <Timeline />
      <Achievements />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
