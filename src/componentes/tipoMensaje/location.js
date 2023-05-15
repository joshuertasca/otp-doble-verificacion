import React from "react";
import '../estilos.css';
import { useState } from "react";

function Location() {
    const [titulo, setTitulo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const submitCourse = async (e) => {

        // const resetForm = () => {
        

        // };

        e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from":"51939642805",
                    "to":"573114610919",
                    "type":"location",
                    "recipient_type":"individual",
                    "location":{
                          "longitude":longitud,
                          "latitude":latitud, 
                          "name":titulo,
                          "address": direccion
                       }
                }),

            });
            // resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">

                <div className="offset-2 col-6">
                    <form className="" onSubmit={submitCourse}>
                        <label htmlFor="titulo">Titulo </label>
                        <input maxLength="20"
                            type="text"
                            name="titulo"
                            value={titulo}
                            className="form-control bold"
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        <label htmlFor="direccion">Dirección </label>
                        <input maxLength="20"
                            type="text"
                            name="direccion"
                            value={direccion}
                            className="form-control bold"
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                        <label htmlFor="latitud">Latitud </label>
                        <input maxLength="20"
                            type="text"
                            name="latitud"
                            value={latitud}
                            className="form-control bold"
                            onChange={(e) => setLatitud(e.target.value)}
                        />
                        <label htmlFor="longitud">Longitud </label>
                        <input maxLength="20"
                            type="text"
                            name="longitud"
                            value={longitud}
                            className="form-control bold"
                            onChange={(e) => setLongitud(e.target.value)}
                        />
                        <button type="submit"  className="btn btn-primary w-100">
                            Enviar Imagen
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
}

export { Location };