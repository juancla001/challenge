import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Result = () => {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [movieResult, setMovieResult] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=07de9387a9d5a1772b767076d3f3d757&language=es-US&query=${keyword}`;
        axios.get(endPoint)
            .then(response => {
                const movieArray = response.data.results;
                setMovieResult(movieArray);
            })
            .catch(err => console.log(err));

    })

    return (
        <>
            <div>Buscaste: <em>{keyword}</em> </div>
            {movieResult.length === 0 && <h3>No result</h3>}
            <div className="row">
                {
                    movieResult.map((oneMovie, index) => {
                        return (
                            <div className="col-3" key={index}>
                                <div className="card my-3">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
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
    )
}

export default Result;