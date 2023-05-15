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



function Enviarnotificacion() {
    
    
    
    const [courses, setCourses] = useState([]);
    const [nuevos, setNuevos] = useState(0)
    const [disable, setDisable] = useState(false);
    const [total, setTotal] = useState(0)
    const [numeroDestinoMsm, setNumeroDestinoMsm] = React.useState(573114610919)
    const [numeroDestinoWA, setNumeroDestinoWa] = React.useState(573114610919)
    const [text, setTexto] = useState(' total inscritos: ' + total + ' . En el ultimo dia ' + nuevos + ' usuarios nuevos ingresaron. enviales una promocion aqyí.');
    const [class1, setClass1] = useState("m-3 p-2 bg-primary border badge badge-pill")
    const [class2, setClass2] = useState(" d-none")
    const [class3, setClass3] = useState("m-3 p-2 bg-success border badge badge-pill ")
    const [class4, setClass4] = useState(" d-none")
    


    const token =useAuth().user


   const loadCourses = async () => {
        try {
            const res = await fetch('/.netlify/functions/courses',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD,
                    'table':1
                  }
            });
            const courses = await res.json();
            setCourses(courses);
            console.log(courses)
            setTotal(courses.length);
            var nuevo = courses.filter(course => {
                var fechaAcceso = course.date.split("T")
                fechaAcceso = new Date(fechaAcceso[0])
                return fechaAcceso > fechaMenosDia
            })

            setNuevos(nuevo.length)
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        loadCourses();
        setTexto('Hola Itanos Admin, total inscritos: ' + DOMPurify.sanitize(total) + ' . En el ultimo dia ' + DOMPurify.sanitize(nuevos) + ' usuarios nuevos ingresaron. enviales una promocion aquí.')
    }, [total]);

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });

    const dateNumbersOnly = formattedDate.split("/").join("");

    var mensajeEnviar = 'Hola Itanos Admin, total inscritos: ' + DOMPurify.sanitize(total) + ' . En el ultimo dia ' + DOMPurify.sanitize(nuevos) + ' usuarios nuevos. Enviales una promocion aquí.';
    // var URLEnviar = `https://dashboardbot.netlify.app/#/enviarnotificacion/${dateNumbersOnly}`;
    var URLEnviar = `https://dashboardbot.netlify.app/#/Y2YyLWIxZTAtN`;
    // console.log(mensajeEnviar + URLEnviar)

  
    const submitCourseSMS = async (e) => {

        setClass1("d-none")
        setClass2("spinner-border m-5")
        var numeroDestinoMsm2 = numeroDestinoMsm.toString();
        await e.preventDefault();
        try {
            if (numeroDestinoMsm2.length==12) {
                 
                 numeroDestinoMsm2 = numeroDestinoMsm2.substring(2);
             }
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "type": "Notificacion",
                    "records": {
                        "country": "57",
                        "message": DOMPurify.sanitize(text),
                        "encoding": "GSM7",
                        "messageFormat": 1,
                        "addresseeList": [
                            {

                                "mobile": DOMPurify.sanitize(numeroDestinoMsm2),
                                "correlationLabel": "corelation ejemplo",
                                "url": DOMPurify.sanitize(URLEnviar)
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
            setClass1("m-3 p-2 bg-primary border badge badge-pill")
        } catch (err) {
            console.error(err);
        }
    };

    const submitCourseWA = async (e) => {

        setClass3("d-none")
        setClass4("spinner-border m-5")
        await e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from": process.env.REACT_APP_NUMERO,
                    "to": DOMPurify.sanitize(numeroDestinoWA),
                    "type": "text",
                    "recipient_type": "individual",
                    "text": { "body": DOMPurify.sanitize(text) + ": " + DOMPurify.sanitize(URLEnviar) },
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD
                  }

            });

            Swal.fire('Mensaje Enviado')
            setClass4("d-none")
            setClass3("m-3 p-2 bg-success border badge badge-pill ")
        } catch (err) {
            console.error(err);
        }

    }



    return (
        <div className="mt-5 pt-5">

            <div className="mb-5 text-center mx-5">

                <p> Mensaje a enviar: </p>


                        <textarea
                            rows="10"
                            cols="10"
                            type="text"
                            name="name"
                            maxLength={135}
                            value={DOMPurify.sanitize(text)}
                            className="form-control"
                            onChange={(e) => {
                                setTexto(DOMPurify.sanitize(e.target.value));
                                if (e.target.value == "") {
                                    setDisable(true)
                                } else { setDisable(false) }
                            }}
                        />


{/* <
                <div className="border border-black mx-5 py-5">
                    total inscritos {total}.
                    Ayer entraron {nuevos} usuarios nuevos.
                    enviales una promocion aca.
                </div>> */}



            </div>
            <div className="container">
                <div className="row">
                    <div className="col-10 offset-1 col-sm-8 offset-sm-2 text-center">
                        <h5 className="ms-5 text-center">Numero de destino Para enviar notificación por SMS: <strong>{DOMPurify.sanitize(numeroDestinoMsm)}</strong></h5>
                        <div className="d-flex justify-content-center"><input type="text" className="form-control text-center w-50 " value={DOMPurify.sanitize(numeroDestinoMsm)} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setNumeroDestinoMsm(DOMPurify.sanitize(e.target.value))}></input></div>

                        <button disabled={disable} className={class1} onClick={submitCourseSMS}>   Enviar SMS     </button>
                        <div class={class2} role="status"></div>

                        <h5 className="ms-5 text-center">Numero de destino Para enviar notificación por Whatsapp: <strong>{DOMPurify.sanitize(numeroDestinoWA)}</strong></h5>
                        <div className="d-flex justify-content-center"><input type="text" className="form-control  w-50 text-center" value={DOMPurify.sanitize(numeroDestinoWA)} aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setNumeroDestinoWa(DOMPurify.sanitize(e.target.value))}></input></div>

                        <button disabled={disable} className={class3} onClick={submitCourseWA}>   Enviar mensaje de Whatsapp    </button>
                        <div class={class4} role="status"></div>

                    </div>
                </div>
            </div>

        </div>

    );

}

export { Enviarnotificacion };