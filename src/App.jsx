
import React from 'react';
import Hero from './components/Hero';
import Demo from './components/Demo';
import './App.css';
import Particle from './components/Particle';


const App = () => {
  return (
    <main>
      <div className="main">  
          <div className="gradient"/>
      </div>
      <Particle/>

      <div className="app ">
        <Hero/>
        <Demo/>
      </div>
    </main>
  )
}

export default App