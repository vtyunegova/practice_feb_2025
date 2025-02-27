'use client'

import React, { useEffect, useState } from 'react';

const imgLimit = 16; 

const SearchPage = () => {
    const [images, setImages] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [search, setSearch] = useState('');
    const [timeoutId, setTimeoutId] = useState(null); 
    const [totalPages, setTotalPages] = useState(0); 

    useEffect(() => {
        const fetchImages = async () => {
            if (!search) return; 

            try {
                const response = await fetch(`/api/search?query=${search}&page=${currentPage}&per_page=${imgLimit}`);
                
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                setImages(data.results);
                setTotalPages(data.total_pages); 
            } catch (error) {
                console.error("Ошибка при загрузке изображений:", error);
            }
        };
        fetchImages();
    }, [currentPage, search]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(() => {
            setCurrentPage(1);
        }, 500); 

        setTimeoutId(id);
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="p-4">
            <center>
                <input 
                    type="text" 
                    placeholder="Поиск изображений" 
                    className="px-40 py-2 border border-solid border-gray-400 rounded-md" 
                    value={search} 
                    onChange={handleSearch} 
                />
            </center> 
            <div className="image-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {images.length > 0 ? image.map(image => (
                    <div key={image.id} className="image-card border border-gray-300 rounded-lg">
                        <img src={image.urls.small} alt={image.description || 'Без описания'} className="w-full h-48 object-cover" />
                        <div className="p-2">
                            <p className="text-sm">{image.description || 'Без описания'}</p>
                            <p className="text-xs text-gray-500">Автор: {image.user.name}</p>
                        </div>
                    </div>
                )) : <p>Изображение не найдено</p>}
            </div>

            <div className="pagination flex flex-wrap justify-center mt-4">
                {pages.map(page => (
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(page)} 
                        className={`mx-1 px-3 py-1 border rounded-lg ${currentPage === page ? 'bg-gray-500 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;