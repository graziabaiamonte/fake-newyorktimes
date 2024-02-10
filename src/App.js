import './App.css';
import Header from './components/Header/Header';
import ArticlesHome from './components/ArticlesHome/ArticlesHome';
import BestSeller from './components/BestSeller/BestSeller';
import Footer from './components/Footer/Footer';


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

