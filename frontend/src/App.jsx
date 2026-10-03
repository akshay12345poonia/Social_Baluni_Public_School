import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import NewsListPage from './pages/NewsListPage';
import NewsArticlePage from './pages/NewsArticlePage';
import ContentPage from './pages/ContentPage';
import AdmissionPage from './pages/AdmissionPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-brand-cream font-sans text-brand-ink">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/:slug" element={<NewsArticlePage />} />
            <Route path="/about" element={<ContentPage type="about" />} />
            <Route path="/academics" element={<ContentPage type="academics" />} />
            <Route path="/programs" element={<ContentPage type="programs" />} />
            <Route path="/programs/:slug" element={<ContentPage type="program-detail" />} />
            <Route path="/sports" element={<ContentPage type="sports" />} />
            <Route path="/achievements" element={<ContentPage type="achievements" />} />
            <Route path="/gallery" element={<ContentPage type="gallery" />} />
            <Route path="/admissions" element={<AdmissionPage />} />
            <Route path="/contact" element={<ContentPage type="contact" />} />
            <Route path="*" element={<ContentPage type="not-found" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;