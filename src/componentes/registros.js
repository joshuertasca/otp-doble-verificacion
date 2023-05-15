import React, { useEffect, useState } from "react";
import CourseList from "./CourseList"
import Select from 'react-select'
import { EnviarSMS } from "./tipoMensaje/enviarSMS";
import DOMPurify from 'dompurify';

// import { useAuth } from './auth';



// const options1 = [
//     { value: 1, label: 'Cualquier Genero' },
//     { value: 2, label: 'Hombre' },
//     { value: 3, label: 'Mujeres' },
//     { value: 4, label: 'Otros' }
// ]
// const options2 = [
//     { value: 1, label: 'Cualquier edad' },
//     { value: 2, label: '12-18' },
//     { value: 3, label: '19-25' },
//     { value: 4, label: '26-45' },
//     { value: 5, label: '46-59' },
//     { value: 6, label: '60+' }
// ]
// const options3 = [
//     { value: 1, label: 'todo tiempo de interacción' },
//     { value: 2, label: 'ultimas 24 horas' },
//     { value: 3, label: '1 semana' },
// ]
// const options4 = [
//     { value: 1, label: 'Cualquier NPS' },
//     { value: 2, label: 'si recomiendo' },
//     { value: 3, label: 'indiferente' },
//     { value: 4, label: 'no recomiendo' }
// ]

var fechaMenosSemana = new Date();
fechaMenosSemana.setDate(fechaMenosSemana.getDate() - 8);
var fechaMenosDia = new Date();
fechaMenosDia.setDate(fechaMenosDia.getDate() - 2);

function Registros() {

   
    return (
        <React.Fragment>
            <div className="p-4 pt-5 mt-5">

                <div className="container mt-0 fs-bold"><h4 className="text-center">El Codigo OTP ingresado es correcto</h4></div>
                    <div>
                        <p>
                            Bienvenido, está es una pagina de pruebas de codigo OTP de Aldeamo. si deseas probar otro envio de codigo OTP clickea el boton "Salir" que se encuentra el la esquina superior derecha.
                        </p>
                    </div>                                     
            </div>
        </React.Fragment>
    );

}

export { Registros };