import '../css/Listado.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Navigate } from 'react-router-dom';



const Listado = () => {

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

    //console.log(movieList);

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

export default Listado;
