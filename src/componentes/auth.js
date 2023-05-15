import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { set } from 'mongoose';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const AuthContext = React.createContext();



function AuthProvider({ children }) {


    const [res, setRes] = React.useState([]);

    const ingreso = async (e) => {

        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "type": "ingreso"
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD
                }


            });

        } catch (err) {
            console.error(err);
        }
    };



    const navigate = useNavigate();

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        var passC = Cookies.get('pass');
        if (passC === process.env.REACT_APP_PASSWORD) {
            setUser(passC)
        }
    }, [])


    const login = ({ username, password }) => {


        if (password == process.env.REACT_APP_PASSWORD && username == process.env.REACT_APP_USER) {

            ingreso();

            setUser({ username });
            Cookies.set('pass', password)
            navigate('/registro');


        } else {
            window.alert("Contraseña o Usuario Erroneo")
        }

    };


    const loginCode = async ({ codigo, idCodigo }) => {

        

        try {
            const res = await fetch('/.netlify/functions/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD,
                    'table': 2
                }
            }).then(response => response.json())
                .then(data => {


                    const result = data.find(obj => obj.id == idCodigo);
                   
                    if (result == 0) {
                        window.alert("Codigo de autenticación no valido")
                    } else {
                        const codigoEncriptado = result.hash;
                        const bytes = CryptoJS.AES.decrypt(codigoEncriptado, process.env.REACT_APP_CLAVE_CRYPTO);
                        const mensajeDesencriptado = bytes.toString(CryptoJS.enc.Utf8);

                        if (codigo == mensajeDesencriptado) {

                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Su codigo ha sido validado correctamente',
                                showConfirmButton: false,
                                timer: 3500,
                                background: '#22bb33',
                              })


                        } else {
                            window.alert("Codigo de autenticación no valido")
                        }
                    }
                });


        } catch (error) {
            console.error(error);
        }


    };

    const logout = () => {
        setUser(null); navigate('/');
        Cookies.set('pass', null);
    };

    const auth = { user, login, logout, loginCode };

    return (<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>);
}

function useAuth() {
    const auth = React.useContext(AuthContext); return auth;
}

function AuthRoute(props) {
    const auth = useAuth(); if (!auth.user) {
        return <Navigate to="/" />;
    }
    return props.children;
}

export { AuthProvider, useAuth, AuthRoute };