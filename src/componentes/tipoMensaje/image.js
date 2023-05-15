import React from "react";
import '../estilos.css';
import { useState } from "react";

function Image() {
    const [urlImage, setUrl] = useState('');
    const [disable, setDisable] = useState(true);
    const submitCourse = async (e) => {
    
        const resetForm = () => {
            setUrl('');
            setDisable(true);
        };

        e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from":"51939642805",
                    "to":"573114610919",
                    "type":"image",
                       "recipient_type":"individual",
                       "image":{
                          "link":urlImage
                       }
                }),

            });
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="row">

                <div className="offset-2 col-6">
                    <div className="text-center enviarimagen border border-muted">
                        <img className="mw-100 mh-100" src={urlImage} alt="" />
                    </div>
                    <form className="" onSubmit={submitCourse}>
                        <label htmlFor="name">Ingresar el link de la imagen a enviar</label>
                        <textarea
                            rows="2"
                            cols="50"
                            type="text"
                            name="name"
                            value={urlImage}
                            className="form-control"
                            onChange={(e) => {setUrl(e.target.value);
                                if (e.target.value==""){
                                    setDisable(true)
                                }else{setDisable(false)}
                            }}
                        />
                        <button type="submit" disabled={disable} className="btn btn-primary w-100">
                            Enviar Imagen
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
}

export { Image };