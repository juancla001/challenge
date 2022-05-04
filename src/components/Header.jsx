import React from 'react';
import { Link } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    let ubicacionPrincipal = window.pageYOffset;
    window.onscroll = function () {
        let Desplazamiento_principal = window.pageYOffset;
        if (ubicacionPrincipal >= Desplazamiento_principal) {
            document.getElementById('navBar').style.top = '0';
        }
        else {
            document.getElementById('navBar').style.top = '-100px';
        }
        ubicacionPrincipal = Desplazamiento_principal;
    }
    const navigate = useNavigate([]);


    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        console.log(keyword);

        if (keyword.length === 0) {
            swAlert(<h4>Tienes que escribir una palabra el campo de busqueda</h4>)
        } else if (keyword.length < 4) {
            swAlert(<h5>Debes escribir mas de 3 caracteres</h5>)
        } else {
            e.currentTarget.keyword.value = '';
            navigate(`/result?keyword=${keyword}`)
        }
    }


    return (
        <>
            <nav id="navBar" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/*">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/listado">List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto" tabindex="-1">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={submitHandler}>
                            <input className="form-control me-2" type="search" placeholder="Search..." name="keyword" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
