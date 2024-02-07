import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ArticlesHome from './components/ArticlesHome';
import BestSeller from './components/BestSeller';
import Footer from './components/Footer';


const App = () => {
  

  
  return (
    <div>
      <Header />
      <div className="box-articles-home">
      <ArticlesHome />
      <BestSeller/>
      </div>
      <Footer />
    </div>
  );
};

export default App;

