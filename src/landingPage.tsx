import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from './network/store';
import { fetchMovies, MovieListProp } from './network/movieApi';


const sortingDDOptions = [
    { value: "Title", label: "Title" },
    { value: "Year", label: "Year" },
    { value: "Plot", label: "Plot" },
];


export default function LandingPage() {
    const [moviesList, setMoviesList] = useState<MovieListProp[]>([]);
    const [isMoviesLoading, setIsMoviesLoading] = useState(false);
    const [sortinValue, setSortingValue] = useState('');
    const [searchText, setSearchText] = useState('');
    const [newFilterValue, setNewFilterValue] = useState<MovieListProp[]>([]);


    const dispatch: AppDispatch = useDispatch();
    const { movieList, loading, error } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies("Guardians"));
    }, []);


    useEffect(() => {

        const filtered = movieList.filter(movie =>
            movie.Title.toLowerCase().includes(searchText.toLowerCase())
          );
          setMoviesList(filtered);

    }, [searchText]);


    const handleSort = (event: { target: { value: any; }; }) => {
        const sortingValue = event.target.value;
        setSortingValue(sortingValue);

        if (sortinValue === 'Title') {
            const newMoviesList = moviesList.sort((a, b) => a.Title.localeCompare(b.Title));
            setMoviesList(newMoviesList);
        }
        else if (sortinValue === 'Plot') {
            const newMoviesList = moviesList.sort((a: any, b: any) => a - b);
            setMoviesList(newMoviesList);
        }
        else if (sortinValue === 'Year') {
            const newMoviesList = moviesList.sort((a, b) => Number(a.Year) - Number(b.Year));
            setMoviesList(newMoviesList);
        }
    }

    const handleSearchChange = (event: any) => {
        const searchNewValue = event.target.value
        setSearchText(searchNewValue);
        const newSearchValue = moviesList.filter(movie => {
            return movie.Title.toLowerCase().includes(searchNewValue.toLowerCase());
        });
        setNewFilterValue(newSearchValue);
    };


    useEffect(() => {
        setMoviesList(movieList);
    }, [movieList]);

    //   const updatedMovieList: MovieListProp[] = searchText?.length ? newFilterValue : movieList;

    if (isMoviesLoading) {
        return (<div></div>)
    }

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
                        moviesList.map((obj, index) => {
                            return (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{obj.imdbID}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{obj.Title}</td>
                                    <td className="px-6 py-4"> <img src={obj.Poster} /> </td>
                                    <td className="px-6 py-4">{obj.Year}</td>
                                    <td className="px-6 py-4">{obj.Plot}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

        </div>


    );
}
