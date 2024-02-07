import React , { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/bestSeller.css';

function BestSeller () {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
   
    useEffect(() => {
        const fetchArticles = async () => {
          try {
            const response = await axios.get(
              'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Sixb74KeLAPkbmTX8DGohGzAYyAqAAa5',
              
            );
            setArticles(response.data.results.books);
  } catch (error) {
    if (error.response.status === 429) {
      
      setTimeout(fetchArticles, 5000); 
    } else {
      console.error('Errore nel recupero degli articoli:', error);
    }
  }
};
        fetchArticles();
      }, []);
 
      const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
        
    };
    
    return (
        <div className="bestseller">
            <h3>Best Seller</h3>
            {articles.slice(currentPage * 2, currentPage * 2 + 2).map((article, index) => (
                <div className="box-bestseller" key={index}>
                    <h2>{article.title}</h2>
                    <p><span>Author:</span> {article.author}</p>
                    <p className="description"><span>Description: </span> {article.description}</p>
                    <p><span>Weeks on list: </span> {article.weeks_on_list}</p>
                    {article.book_image && (
                        <img
                            className="img-bestseller"
                            src={article.book_image}
                            alt={article.title}
                        />
                    )}
                    <a href={article.amazon_product_url} target="_blank" rel="noopener noreferrer">
                        <button className="amazon-btn">VIEW ON AMAZON</button>
                    </a>
                  </div>
            ))}
            <div>
                {currentPage > 0 && (
                    <button className="pagination-btn" onClick={handlePreviousPage}>Previous</button>
                )}
                {(currentPage + 1) * 2 < articles.length && (
                    <button className="pagination-btn" onClick={handleNextPage}>Next</button>
                )}
            </div>
        </div>
    )
}

export default BestSeller;