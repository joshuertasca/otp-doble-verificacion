import React from "react";
import './estilos.css';
import { NavLink } from "react-router-dom";
import { useAuth } from './auth';

const navRegistros = async (e) => {

    try {
        await fetch('/.netlify/functions/courses', {
            method: 'POST',
            body: JSON.stringify({
                "type": "navRegistros",
                "componente": e
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



function Barralateral() {

    const [visibilidad, setVisibilidad] = React.useState("d-none")
    const auth = useAuth();
    return (

        <React.Fragment>
            {[0].map(() => {
                if (!auth.user) return null;
                return (
                <div className=" bg-secondary barra fixed-top pt-5">
                    <ul className="list-group pt-5 px-1">

                        {routes.map((ruta, i) => {

                            if (ruta.private && !auth.user) return null;

                            return (
                                <NavLink className="list-group-item bg-secondary border-white text-white"
                                    to={ruta.to} key={ruta.to} onClick={()=> navRegistros(ruta.to)}
                                >
                                    {ruta.text}
                                </NavLink>
                            )

                        }
                        )}

                    </ul>
                </div>
                )
            }
            )}

        </React.Fragment>
    );

}

const routes = [
    { to: '/registro', text: 'Bienvenido', private: true },
    // { to: '/enviarplantilla/573114610919', text: 'enviar plantilla', private: true },
    // {to:'/enviarmensaje/573114610919',text:'enviar mensaje', private:true},
    
];

export { Barralateral };