import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate([]);

    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\\.,;:\\"]+(\.[^<>()[\\"]+)*)|(\\"))@(([^<>()[\\.,;:\\"]+\.)+[^<>()[\\.,;:\\"]{2,})$/i;
        if (email === '' || password === '') {
            swAlert(
                <div>
                    <h2>Los campos no pueden estar vacios</h2>
                </div>
            );
            return;
        }
        if (email !== '' && !regexEmail.test(email)) {
            swAlert(
                <div>
                    <h2>Escribe una direccion de correo valida</h2>
                </div>
            );
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(
                <div>
                    <h2>Credenciales invalidas</h2>
                </div>
            );
            return;
        }
        console.log('login correcto');
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert({
                    icon: "success",
                    closeOnEsc: true,
                  });
                const tokenRes = res.data.token;
                sessionStorage.setItem('token', tokenRes);
                navigate('/listado');
            }, [])
    }
    let token = sessionStorage.getItem('token');

    return (
        <>
            {token && <Navigate replace to="/" />}
            <div className="row" >
                <div className="col-6 offset-3">
                    <h2>Ingresar</h2>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="">
                            <input type="text" name="email" placeholder="Email" />
                            <br />
                        </label>
                        <label htmlFor="">
                            <input type="password" name="password" placeholder="Password" />
                            <br />
                        </label>
                        <button type="submit" name="login">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
