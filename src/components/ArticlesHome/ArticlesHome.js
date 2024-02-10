import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './articlesHome.css';
const apiKey = process.env.REACT_APP_API_KEY;

function ArticleHome({ searchFunction, searchTerm }) {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true); 
    const articlesPerPage = 6;
    


    useEffect(() => {
        setLoading(true); 
        if (searchTerm) {
            handleSearch(searchTerm);
        } else {
            fetchTopStories();
        }
    }, [searchTerm]);

    const fetchTopStories = async () => {
        try {
            const response = await axios.get(
                'https://api.nytimes.com/svc/topstories/v2/home.json',
                {
                    params: {
                        'api-key': apiKey,
                    },
                }
            );
            setArticles(response.data.results);
            setTotalPages(Math.ceil(response.data.results.length / articlesPerPage));
        } catch (error) {
            console.error('Errore nel recupero degli articoli:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}`);
            setArticles(response.data.response.docs);
            setTotalPages(Math.ceil(response.data.response.docs.length / articlesPerPage));
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false); 
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <div className='article-home'>
            {loading && <div className="loader">Loading...</div>} 
            {currentArticles.map((article, index) => (
                <div className='box-articles' key={index}>
                    <div className='text-article'>
                        <a
                            className='title-article'
                            href={article.url}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <h2>{article.title}</h2>
                        </a>
                        <p>{article.abstract}</p>
                    </div>
                    
                    {article.multimedia.length > 0 && (
                        <img
                            className='img-article'
                            src={article.multimedia[0].url}
                            alt={article.multimedia[0].caption}
                        />
                    )}
                </div>
            ))}
            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button className='pagination-btn' key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                ))}
            </div>
        </div>
    );
}

export default ArticleHome;

