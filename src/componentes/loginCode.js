import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './auth';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { NavLink } from "react-router-dom";
import DOMPurify from 'dompurify';


const ingresoLink = async (e) => {


    try {
        await fetch('/.netlify/functions/courses', {
            method: 'POST',
            body: JSON.stringify({
                "type": "ingresoLink"
            }),
            headers: {
                'Content-Type': 'application/json',
                'token': DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)
            }


        });

    } catch (err) {
        console.error(err);
    }
};

function LoginCode() {


    const [class11, setClass11] = useState('text-center my-2 py-1 rounded-5 bg-success border-0 w-100')
    const [class22, setClass22] = useState(" d-none")
    const [class33, setClass33] = useState(" d-none")
    const auth = useAuth();
    const { pass } = useParams();
    const [number, setNumber] = (pass == DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) ? React.useState(DOMPurify.sanitize(process.env.REACT_APP_USER)) : React.useState('');
    const [password, setPassword] = (pass == DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) ? React.useState(DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) : React.useState('');
    const [codigo, setCodigo] = (pass == DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) ? React.useState(DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) : React.useState('');
    const [idCodigo, setIdCodigo] = React.useState(0);
    const [class1, setClass1] = React.useState(true);



    React.useEffect(() => {
        if (pass == DOMPurify.sanitize(process.env.REACT_APP_PASSWORD)) {
            ingresoLink();

        }

    }, [pass])


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

                            setClass33('d-none')
                            setCodigo("")
                        } else {
                            setClass33('text-danger text-center font-weight-bold')
                            setCodigo("")
                        }
                    }
                });


        } catch (error) {
            console.error(error);
        }


    };


    const login = (e) => {
        loginCode({ codigo, idCodigo });
    };

    if (auth.user) {

    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

          login();
        }
      };

    const enviarcodigoWA = async (e) => {

        setCodigo("")
        const IdAleatorio = await Math.floor(Math.random() * 1e12);
        await setIdCodigo(IdAleatorio)
        const codigo = Math.floor(Math.random() * 900000) + 100000;
        const claveSecreta = DOMPurify.sanitize(process.env.REACT_APP_CLAVE_CRYPTO);
        const codigoEncriptado = CryptoJS.AES.encrypt(codigo.toString(), claveSecreta).toString();

        setClass11("d-none")
        setClass22("spinner-border m-0 text-center")
        setClass33('d-none')

        await e.preventDefault();

        const numeroindicativo = opcionSeleccionada + number



        try {


            if (isChecked==true) {
                await fetch('/.netlify/functions/courses', {
                    method: 'POST',
                    body: JSON.stringify({
                        "from": process.env.REACT_APP_NUMERO,
                        "to": DOMPurify.sanitize(numeroindicativo),
                        "type": "template2",
                        "template": {
                            "namespace": process.env.REACT_APP_NAMESPACE,
                            "language": {
                                "policy": "deterministic",
                                "code": "es"
                            },
                            "name": "prueba_banco_otp",
                            "components": [
                                {
                                    "type": "body",
                                    "parameters": [
                                        {
                                            "type": "text",
                                            "text": codigo
                                        }
                                    ]
                                },
                                {
                                    "type": "button",
                                    "sub_type": "url",
                                    "index": "0",
                                    "parameters": [
                                        {
                                            "type": "text",
                                            "text": codigo
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
            } else {
                await fetch('/.netlify/functions/courses', {
                    method: 'POST',
                    body: JSON.stringify({
                        "from": process.env.REACT_APP_NUMERO,
                        "to": DOMPurify.sanitize(numeroindicativo),
                        "type": "template",
                        "template": {
                            "namespace": process.env.REACT_APP_NAMESPACE,
                            "language": {
                                "policy": "deterministic",
                                "code": "es"
                            },
                            "name": "prueba_banco_otp",
                            "components": [
                                {
                                    "type": "body",
                                    "parameters": [
                                        {
                                            "type": "text",
                                            "text": codigo
                                        }
                                    ]
                                },
                                {
                                    "type": "button",
                                    "sub_type": "url",
                                    "index": "0",
                                    "parameters": [
                                        {
                                            "type": "text",
                                            "text": codigo
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

            }




            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "type": "codificacionCodigo",
                    "codigo": codigoEncriptado,
                    "id": IdAleatorio,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'token': process.env.REACT_APP_PASSWORD
                }

            });

            Swal.fire('OTP enviada. por favor revise su telefono y digité el codigo de validación')
            setClass1(false)
            setClass22("d-none")
            setClass11('text-center my-2 py-1 rounded-5 bg-success border-0 w-100')

        } catch (err) {
            console.error(err);
        }



    };

    const [opcionSeleccionada, setOpcionSeleccionada] = useState("57");

    const handleSeleccionarOpcion = (event) => {
        setOpcionSeleccionada(event.target.value);
    };


    //Check box
    const [isChecked, setIsChecked] = useState(false);

    function handleCheckboxChange() {
        setIsChecked(!isChecked);
    }


    return (
        <div className='container-fluid  me-0 pe-0  '>
            <div className='row mt-5 me-3 pt-5 me-0 pe-0'>
                <div className='offset-lg-2 offset-md-1 col-lg-5 offset-sm-1  col-sm-9 offset-1 col-11 bgGris  pt-3 pb-5 rounded-5 border' >
                    <h1 className='text-center'>Inicio de sesión</h1>

                    <div className='d-flex row'>

                        <label className='text-center my-1'>Selecciona el indicativo del pais y escribe los numeros de celular para recibir OTP por Whatsapp que te permita iniciar sesión. </label>



                        <div className='d-flex'>
                            <div className='text-center my-1 rounded-3 border-0'>
                                <select id="opciones" value={opcionSeleccionada} onChange={handleSeleccionarOpcion}>
                                    <option selected value="57"> +57 - Colombia </option>
                                    <option value="51"> +51 - Perú </option>
                                    <option value="52"> +52 - México </option>
                                    <option value="593"> +593 - Ecuador </option>
                                    <option value="504"> +504 - Honduras</option>
                                    <option value="502"> +502 - Guatemala</option>
                                    <option value="503"> +503 - El Salvador</option>
                                    <option value="505"> +505 - Nicaragua</option>
                                    <option value="506"> +506 - Costa Rica</option>
                                    <option value="507"> +507 - Panamá</option>
                                    <option value="591"> +591 - Bolivia</option>
                                    <option value="809">+809 - República Dominicana</option>
                                    <option value="829">+829 - República Dominicana</option>
                                    <option value="849">+849 - República Dominicana</option>
                                    <option value="47">+47 - Noruega</option>
                                </select>
                            </div>

                            <input className='text-center my-1 rounded-3 border-0 w-100'
                                value={DOMPurify.sanitize(number)}
                                onChange={e => setNumber(DOMPurify.sanitize(e.target.value))}
                            />
                        </div>


                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            {" "} Doble verificación
                        </label>


                        <div className='text-center'>

                            <button className={class11} onClick={enviarcodigoWA}>Enviar OTP</button>
                            <div class={class22} role="status"></div>
                        </div>
                        <label className='text-center my-1'>Escribe el codigo de verificación recibido:</label>
                        <input className='text-center my-1 rounded-3 border-0'
                        onKeyPress={handleKeyPress}
                            value={DOMPurify.sanitize(codigo)}
                            onChange={e => setCodigo(DOMPurify.sanitize(e.target.value))}
                        />
                        <span className={class33}>El codigo ingresado es erroneo, por favor reviselo nuevamente e intente otra vez</span>
                        <button className='btn text-center mt-4 py-2 rounded-5 bg-primary border-0' onClick={login} disabled={class1}>Entrar</button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export { LoginCode };