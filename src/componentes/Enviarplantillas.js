import React from "react";
import CourseForm from "./CourseForm";
import { useParams } from "react-router-dom";

function Enviarplantillas() {
    const parametros= useParams();

    return (
        <div>
            <p> {parametros.numero}</p>
            < CourseForm />
        </div>

    );

}

export { Enviarplantillas };
