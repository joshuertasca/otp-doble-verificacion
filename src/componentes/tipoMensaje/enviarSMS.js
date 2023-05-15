import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../auth';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

function EnviarSMS({ courses }) {
    const token = useAuth().user
    const [text, setTexto] = useState('');
    const [disable, setDisable] = useState(true);
    const [numeros, setNumeros] = useState([]);
    const [class1, setClass1] = useState(" btn btn-primary w-100 mt-2")
    const [class2, setClass2] = useState(" d-none")
    const [class3, setClass3] = useState(" d-none")


    const handleTextChange = (e) => {
        setTexto(e.target.value);
        var numeros1 = courses.map(e => e.Id);
        setNumeros(numeros1);
        if (e.target.value == "") {
            setDisable(true)
        } else { setDisable(false) }
        

    };

    const verificarURLs =()=>{
        const regex = /(https?:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi;
        const urls = text.match(regex)
        if (urls) {
            setDisable(true)
            setClass3("text-danger")
        }else{
            setClass3("d-none")
        }
    }

    useEffect(() => {
        verificarURLs()
    }, [text]);

    const submitCourse = async (e) => {

        setClass1("d-none")
        setClass2("text-center border py-1 rounder-3 w-100 mt-2")
        setTexto('');
        setDisable(true);




        const numerosenviar = numeros.map((numero) => {
            var nuevonumero2 = numero.toString();
            var nuevonumero3 = nuevonumero2.substring(2);
            var nuevonumero4 = nuevonumero3.toString();
            return { "mobile": nuevonumero4 }
        })
        console.log(numerosenviar)

        console.log(courses)
        await e.preventDefault();

        const cleanText = DOMPurify.sanitize(text);
        try {
            await fetch('/.netlify/functions/controller-background', {
                method: 'POST',
                body: JSON.stringify({
                    "type": "MSM",
                    "records": [{
                        "fields": {
                            "country": "57",
                            "message": cleanText,
                            "encoding": "GSM7",
                            "messageFormat": 1,
                            "addresseeList": numerosenviar
                        }

                    }],
                    "courses": courses,
                    'tipo': "web"
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD
                }


            });


            Swal.fire('Mensaje Enviado.');
            setClass2("d-none")
            setClass1(" btn btn-primary w-100 mt-2")

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h6><b>Total de usuarios para envio: {courses.length}</b></h6>
                    <form className="" onSubmit={submitCourse}>
                        <label htmlFor="name">Ingresar el Texto a enviar:</label>
                        <br></br>
                        <textarea
                            rows="5"
                            cols="50"
                            type="text"
                            name="name"
                            maxLength={135}
                            value={text}
                            className="form-control"
                            onChange={handleTextChange}
                        />
                        <span className={class3}><strong>No puedes enviar urls dentro del SMS</strong></span>
                        <button type="submit" disabled={disable} className={class1}>
                            Enviar SMS a {courses.length} usuarios
                        </button>
                        <div className={class2}>
                            cargando ... <div class="spinner-border text-primary" role="status">
                        </div>
                        </div>
                        
                    </form>
                </div>
            </div>

            <div className="row my-4 justify-content-center">
                <h6><b>Ejemplo en el Movil</b></h6>
                <div className="col-12 celular">
                    <div className="mt-4"  >
                        <div className="msm">
                        {text}
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
}

export { EnviarSMS };