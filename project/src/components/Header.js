import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/header.css';
import SearchBar from './SearchBar';

function Header () {

    const [articles, setArticles] = useState([]);
    const handleSearchResult = (articles) => {
        setArticles(articles);
    };

    return (
        <div className='header'>
            <SearchBar onSearch={handleSearchResult} />
            <h1>The new York Times</h1>
            <div></div>
        </div>
    )
}

export default Header