import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Text() {
    const [text, setTexto] = useState('');
    const [disable, setDisable] = useState(true);
    const numero =useParams().numero
    const submitCourse = async (e) => {
        const resetForm = () => {
            setTexto('');
            setDisable(true);

        };

        e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from": "51939642805",
                    "to":numero ,
                    "type": "text",
                    "recipient_type": "individual",
                    "text": { "body": text },
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
                <div className="col-6">

                    <form className="" onSubmit={submitCourse}>
                        <label htmlFor="name">Ingresar el Texto a enviar</label>
                        <textarea
                            rows="10" 
                            cols="50"
                            type="text"
                            name="name"
                            value={text}
                            className="form-control"
                            onChange={(e) => {setTexto(e.target.value);
                                if (e.target.value==""){
                                    setDisable(true)
                                }else{setDisable(false)}
                            }}
                        />
                        <button type="submit" disabled={disable} className="btn btn-primary w-100">
                            Enviar Texto
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );
}

export { Text };