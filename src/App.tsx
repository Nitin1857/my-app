import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import movieData from './data.json';
import { useState } from 'react';
import axios from 'axios';

const sortingDDOptions = [
  { value: "title", label: "Title" },
  { value: "releaseYear", label: "Year" },
  { value: "plot", label: "Plot" },
];

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [sortinValue, setSortingValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [newFilterValue, setNewFilterValue] = useState('');
  


  useEffect(() => {
    function loadAllMovies() {
      setIsMoviesLoading(true);
      axios
        .get('http://www.omdbapi.com/?apikey=adf8d3bc')  // Example API
        .then((response) => {
          setMoviesList(movieData);  // Store the response data
        })
        .catch((err) => {
          console.log('Error occured: ', err)
        }).finally(() => {
          setIsMoviesLoading(false);
        });
    }

    loadAllMovies();
  }, []);

  const handleSort = (event) => {
    const sortingValue = event.target.value;
    setSortingValue(sortingValue);

    if (sortinValue === 'title') {
      const newMoviesList = moviesList.sort((a, b) => a.title.localeCompare(b.title));
      setMoviesList(newMoviesList);
    }
    else if (sortinValue === 'plot') {
      const newMoviesList = moviesList.sort((a, b) => a - b);
      setMoviesList(newMoviesList);
    }
    else if (sortinValue === 'releaseYear') {
      const newMoviesList = moviesList.sort((a, b) => Number(a.releaseYear) - Number(b.releaseYear));
      setMoviesList(newMoviesList);
    }
  }

  const handleSearchChange = (event) => {
    const searchNewValue = event.target.value
    setSearchText(searchNewValue);
    const newSearchValue = moviesList.filter(movie => {
      return movie.title.toLowerCase().includes(searchNewValue.toLowerCase()) ;
    });
    setNewFilterValue(newSearchValue);
  };


  if (isMoviesLoading) {
    return <div>Loading...</div>
  }

  const updatedMovieList = searchText?.length ? newFilterValue : moviesList;


  return (
    <div className="App">
      <label form="year-filter" className="block text-lg font-medium text-gray-700 text-left">Filter by Year</label>
      <select id="search" onChange={handleSort} value={sortinValue} className="mt-2 block  px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="0">Select Year</option>
        {
          sortingDDOptions.map((obj) => {

            return (
              <option value={obj.value}>{obj.label}</option>
            );
          })
        }
      </select>

      <label form="search" className="block text-lg font-medium text-gray- text-left">Search</label>
      <div className="relative mt-2">
        <input
          onChange={handleSearchChange}
          value={searchText}
          type="text"
          id="search"
          name="search"
          placeholder="Search here..."
          className="w-full px-10 py-2  text-base bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Poster Name </th>
            <th scope="col" className="px-6 py-3">Year</th>
            <th scope="col" className="px-6 py-3">Plot</th>
          </tr>
        </thead>
        <tbody>
          {
            updatedMovieList.map((obj, index) => {
              return (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="px-6 py-4 font-medium text-gray-900">{obj.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{obj.title}</td>
                  <td className="px-6 py-4">{obj.PosterImage}</td>
                  <td className="px-6 py-4">{obj.releaseYear}</td>
                  <td className="px-6 py-4">{obj.plot}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

    </div>


  );
}

export default App;
