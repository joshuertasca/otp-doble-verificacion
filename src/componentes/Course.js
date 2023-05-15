import React, { Fragment } from 'react'

const Course = ({ course }) => {


    return (
        <React.Fragment>


            <div className="container d-none d-md-inline fs-6  ">
                <div className="row">
                    <div className="border border-white py-2  col-2">{course.nombre}</div>
                    <div className="border border-white py-2  col-2">{course.nps}</div>
                    <div className="border border-white py-2  col-2">{course.Id}</div>
                    <div className="border border-white py-2  col-1">{course.genero}</div>
                    <div className="border border-white py-2  col-1">{course.edad}</div>
                    <div className="border border-white py-2  col-2">{course.date}</div>
                    <div className="border border-white py-2  col-1 text-primary">Enviar mensaje</div>
                    <div className="border border-white py-2  col-1">{course.SesionActiva}</div>
                </div>
            </div>
            

            <div className='container mx-0 d-flex d-md-none'>
                <div className="accordion w-100 mx-0 px-0" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                {course.nombre}
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <li className="list-group-item"> <strong>NPS: </strong> {course.nps} </li>
                                <li className="list-group-item"> <strong>Telefono: </strong>{course.Id}</li>
                                <li className="list-group-item"><strong>Edad: </strong> {course.edad}</li>
                                <li className="list-group-item"><strong>Genero: </strong> {course.genero}</li>
                                <li className="list-group-item"> <strong>Fecha: </strong> {course.date}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )

}
export default Course
