import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './search.css';
const apiKey = process.env.REACT_APP_API_KEY;

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [articlesSearched, setArticlesSearched] = useState([]);
    const [displayedArticles, setDisplayedArticles] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false); 

    const searchResultsRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true); 
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}`);
            setArticlesSearched(response.data.response.docs);
            setDisplayedArticles(response.data.response.docs.slice(0, 3));
            setShowResults(true);
            setLoading(false); 
            if (searchResultsRef.current) {
                searchResultsRef.current.scrollTop = 0;
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            setLoading(false); 
        }
    };

    const handleLoadMore = () => {
        const nextArticles = articlesSearched.slice(displayedArticles.length, displayedArticles.length + 3);
        setDisplayedArticles([...displayedArticles, ...nextArticles]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='search-input-box'>
            <div className='search-absolute'>
                <input
                    className='input'
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="SEARCH"
                />
                <button className='input-button' onClick={handleSearch}>Go</button>
            </div>

            {showResults && (
                <div className='search-results' ref={searchResultsRef}>
                    {loading && <div className="loader">Loading...</div>} 
                    {displayedArticles.map((article, index) => (
                        <div key={index}>
                            <a href={article.web_url} target="_blank" rel="noopener noreferrer">
                                <h2>{article.headline.main}</h2>
                            </a>
                            <p>{article.abstract}</p>

                            {article.multimedia && article.multimedia.length > 0 && (
                                <img
                                    src={`https://www.nytimes.com/${article.multimedia[0].url}`}
                                    alt="Article thumbnail"
                                    className='img-search-results'
                                />
                            )}
                        </div>
                    ))}

                    {articlesSearched.length > displayedArticles.length && (
                        <div className="load-more-container">
                            <button className='load-more-btn' onClick={handleLoadMore}>Load More</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
