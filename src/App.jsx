
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import apiSearch from './components/services/services';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState({ src: '', description: '' });

  const [loadMoreBtn, setLoadMoreBtn] = useState(false)
  

  useEffect(() => {
    if (query.length === 0) return;

    async function fetchData() {
      try {

        setIsLoading(true);
        const { results, total_pages } = await apiSearch(query, page);
        if (results.length === 0) {
          return toast.error("This didn't work.");
        }
        setLoadMoreBtn(total_pages > page)
        
        setImages((prevImages) => [...prevImages, ...results]);
      } catch (error) {
        toast.error("This didn't work.");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const searchQuery = (search) => {
    setIsLoading(true);
    setQuery(search);
    setLoadMoreBtn(false)
    setPage(1);
    setImages([]);
    setError(false);
  };

  const openModal = (state, images) => {
    setIsModalOpen(true);
    if (state) setSelectedImg(images);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Toaster position="top-center" />
      <SearchBar searchQuery={searchQuery} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ImageGallery images={images} onSelect={openModal} />
      {loadMoreBtn && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal isOpen={isModalOpen} image={selectedImg} onClose={closeModal} />
    </div>
  );
}

export default App;
