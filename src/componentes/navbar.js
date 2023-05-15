import React from "react";
import './estilos.css';
import { useAuth } from './auth';

import { NavLink } from "react-router-dom";


const logoutregistro = async (e) => {

    try {
        await fetch('/.netlify/functions/courses', {
            method: 'POST',
            body: JSON.stringify({
                "type": "logout"
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
function Navbar() {


    const [visibilidad, setVisibilidad] = React.useState("d-none")
    const auth = useAuth();

    const logout = (e) => {
        logoutregistro();
        
        auth.logout();
    };


    return (
        <React.Fragment >
            <div className="fixed-top mx-0 px-0">

                {[0].map((e) => {
                    if (!auth.user) return null;

                    return (
                        <React.Fragment >
                            <nav className="navbar navbar-secondary bg-secondary ">

                                <div className="container-fluid">

                                    <button className="navbar-toggler d-flex d-sm-none" type="button" onClick={() => {
                                        (visibilidad == "d-flex") ? setVisibilidad("d-none") : setVisibilidad("d-flex")
                                    }}  >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>

                                    <h5 className="text-white ms-5">Demo - OTP</h5>
                                    
                                    <form onSubmit={logout}>
                                        <button className="btn btn-primary me-5" type="submit">Salir</button>
                                    </form>
                                </div>


                            </nav>

                            <div className={visibilidad} onBlur={() => setVisibilidad("d-none")}>
                                <div className="container-fluid bg-secondary">
                                    <div className="row">
                                        <div className="col-12 border border-white py-2">
                                            <NavLink className="text-white" to={'/registro'} key={'/registro'}>Bienvenido</NavLink>
                                        </div>                                       
                                    </div>
                                </div>
                            </div>

                        </React.Fragment>
                    )


                }
                )}


                <div className="linearoja "></div>



            </div>


        </React.Fragment>
    );

}

export { Navbar };
