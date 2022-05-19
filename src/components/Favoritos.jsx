import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const Favoritos = () => {

    const [addFavourites, setAddFavourites] = useState([]);

    useEffect(() => {
        const favInLocal = localStorage.getItem('favs');

        if (favInLocal !== null) {
            const favsArray = JSON.parse(favInLocal);
            console.log(favsArray)
            setAddFavourites(favsArray)
        }
    }, [setAddFavourites]);

    let token = sessionStorage.getItem('token');


    return (
        <>
            {!token && <Navigate replace to="/*" />}

            <h2>Seccion favoritos</h2>
            <div className="row">

                {
                    addFavourites.map((oneMovie, index) => {
                        return (
                            <div className="col-3" key={index}>
                                <div className="card my-3">
                                    <img src={oneMovie.imgUrl} className="card-img-top" alt="..." />

                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {oneMovie.titleMovie}
                                        </h5>
                                        <p className="card-text"> {oneMovie.overviewMovie.substring(0, 100)}... </p>

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

export default Favoritos;
