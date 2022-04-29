import React from 'react'

const Result = () => {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    return (
        <>
            <div>Resultados obtenidos</div>
            <p>vas a buscar_ {keyword} </p>
        </>
    )
}

export default Result;