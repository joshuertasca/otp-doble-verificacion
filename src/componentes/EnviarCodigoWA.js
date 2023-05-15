import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { useAuth } from './auth';
import DOMPurify from 'dompurify';

var fechaMenosSemana = new Date();
fechaMenosSemana.setDate(fechaMenosSemana.getDate() - 8);
var fechaMenosDia = new Date();
fechaMenosDia.setDate(fechaMenosDia.getDate() - 2);
console.log(fechaMenosDia)



function Enviarcodigo() {



    const [disable, setDisable] = useState(false);
    const [numeroDestinoWA, setNumeroDestinoWa] = React.useState(573114610919)
    const [nombre, setNombre] = React.useState("Sebastian")
    const [codigo, setCodigo] = React.useState("0000")
    
    const [class1, setClass1] = useState("m-3 p-2 bg-success border badge badge-pill ")
    const [class2, setClass2] = useState(" d-none")



    const submitCourseWA = async (e) => {
        setClass1("d-none")
        setClass2("spinner-border m-5")
        await e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from": process.env.REACT_APP_NUMERO,
                    "to": numeroDestinoWA,
                    "type": "template",
                    "template": {
                        "namespace": process.env.REACT_APP_NAMESPACE ,
                        "language": {
                            "policy": "deterministic",
                            "code": "es"
                        },

                        "name": "code_itanos",
                        "components": [
                            {
                                "type": "body",
                                "parameters": [
                                    {
                                        "type": "text",
                                        "text": DOMPurify.sanitize(nombre)
                                    },
                                    {
                                        "type": "text",
                                        "text": DOMPurify.sanitize(codigo)
                                    }
                                ]
                            }
                        ]
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD
                }

            });

            Swal.fire('Mensaje Enviado')
            setClass2("d-none")
            setClass1("m-3 p-2 bg-success border badge badge-pill ")
        } catch (err) {
            console.error(err);
        }

    }



    return (
        <div className="mt-5 pt-5">

            <div className="mb-5 text-center mx-5">

                <p> Plantilla a Enviar </p>

                <div className="border">
                    <p>Hola <strong>{DOMPurify.sanitize(nombre)}</strong>. Este es tu codigo de acceso <strong>{DOMPurify.sanitize(codigo)}</strong>. No lo compartas.</p>

                </div>





            </div>
            <div className="container">
                <div className="row">
                    <div className="col-10 offset-1 col-sm-8 offset-sm-2 text-center">

                        <h5 className="ms-5 text-center">Nombre de destino: </h5>
                        <div className="d-flex justify-content-center"><input type="text" className="form-control  w-50 text-center" value={DOMPurify.sanitize(nombre)} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setNombre(DOMPurify.sanitize(e.target.value))}></input></div>

                        <h5 className="ms-5 text-center">Codigo de acceso </h5>
                        <div className="d-flex justify-content-center"><input type="text" className="form-control  w-50 text-center" value={DOMPurify.sanitize(codigo)} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setCodigo(DOMPurify.sanitize(e.target.value))}></input></div>


                        <h5 className="ms-5 text-center">Numero de destino Para enviar codigo por Whatsapp: <strong>{numeroDestinoWA}</strong></h5>
                        <div className="d-flex justify-content-center"><input type="text" className="form-control  w-50 text-center" value={DOMPurify.sanitize(numeroDestinoWA)} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setNumeroDestinoWa(DOMPurify.sanitize(e.target.value))}></input></div>

                        <button disabled={disable} className={class1} onClick={submitCourseWA}>   Enviar mensaje de Whatsapp    </button>
                        <div class={class2} role="status"></div>

                    </div>
                </div>
            </div>

        </div>

    );

}

export { Enviarcodigo };