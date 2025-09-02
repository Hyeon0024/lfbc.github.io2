import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Research from './components/Research/Research';
import Publications from './components/Publications/Publications';
import Team from './components/Team/Team';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Research />
      <Publications />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
