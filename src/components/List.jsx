import '../css/List.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Navigate } from 'react-router-dom';



const List = (props) => {

    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;
    if (favMovies === null) {
        tempMoviesInFavs = [];
    } else {
        tempMoviesInFavs = JSON.parse(favMovies)
    }


    const addOrRemoveFromFavs = (e) => {
        const btn = e.currentTarget;
        const parent = btn.parentElement;
        const imgUrl = parent.querySelector('img').getAttribute('src')
        const titleMovie = parent.querySelector('h5').innerText
        const overviewMovie = parent.querySelector('p').innerText
        const movieData = {
            imgUrl, titleMovie, overviewMovie,
            id: btn.dataset.movieId
        }
        let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
            return oneMovie.id === movieData.id
        })
        if (!movieIsInArray) {
            tempMoviesInFavs.push(movieData);
            localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
            console.log('se agrego la pelicula a favs');
        } else {
            let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
                return oneMovie.id !== movieData.id
            });
            localStorage.setItem('favs', JSON.stringify(moviesLeft));
            console.log('se elimino la pelicula');
        }
    }



    let token = sessionStorage.getItem('token');



    const [movieList, setMovieList] = useState([]);




    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=07de9387a9d5a1772b767076d3f3d757&language=es-US&page=1';
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovieList(apiData.results);
            })
            .catch(err => {
                swAlert(<h2>Hubo errores, intenta mas tarde</h2>)
            })
    }, [setMovieList]);



    return (
        <>
            {!token && <Navigate replace to="/*" />}
            <div className="row">
                {
                    movieList.map((oneMovie, index) => {
                        return (
                            <div className="col-3" key={index}>
                                <div className="card my-3">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <button
                                        className="favourite-btn"
                                        onClick={addOrRemoveFromFavs}
                                        data-movie-id={oneMovie.id}
                                    >
                                        🖤
                                    </button>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {oneMovie.title}
                                        </h5>
                                        <p className="card-text"> {oneMovie.overview.substring(0, 100)}... </p>
                                        <Link to={`/detail?movieID=${oneMovie.id}`} className="btn btn-primary">Ver mas</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    );

}

export default List;
