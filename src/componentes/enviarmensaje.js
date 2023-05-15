import React from "react";
import { Text } from "./tipoMensaje/text";
import { Image } from "./tipoMensaje/image";
import { Button } from "./tipoMensaje/button";
import { List } from "./tipoMensaje/list";
import { Location } from "./tipoMensaje/location";
import { useParams } from "react-router-dom";




function Enviarmensaje() {

   

    const [tipo, setTipo] = React.useState("text")
    const clase = 'text-center px-5 py-2 mb-3 rounded-5 bg-primary border-0 text-white'
    const clase2 = 'text-center rounded-5 mb-3 px-5 py-2  bg-whitr border border-dark'
    const [clases, setClases] = React.useState([clase, clase2, clase2, clase2,clase2])

    return (
        <div>
            <div className=" container m-4">
                <div className="row">
                    <div className="col-11 bg-light rounded-5 border border-secondary">
                        <p className="font-weight-bold text-center mt-2">Seleccione el tipo de mensaje que desea enviar:</p>
                        <div className="container">
                            <div className="row">
                                <div className="offset-1 col-2 text-center">
                                    <button onClick={() => {
                                        setTipo("text");
                                        setClases([clase, clase2, clase2, clase2,clase2])
                                    }} className={clases[0]} type="submit">Text</button>
                                </div>
                                <div className="col-2 text-center">
                                    <button onClick={() => {setTipo("image");
                                    setClases([clase2,clase2,clase2,clase,clase2])
                                }} className={clases[3]} type="submit">Image</button>
                                </div>
                                <div className="col-2 text-center">
                                    <button onClick={() => {
                                        setTipo("button");
                                        setClases([clase2, clase, clase2, clase2,clase2])
                                    }} className={clases[1]} type="submit">Button</button>
                                </div>
                                <div className="col-2 text-center">
                                    <button onClick={() => {
                                        setTipo("Location");
                                        setClases([clase2,clase2,clase2,clase2,clase])
                                    }} className={clases[4]} type="submit">Location</button>
                                </div>
                                {/* <div className="col-2 text-center">
                                    <button onClick={() => {
                                        setTipo("Interactive List");
                                        setClases([clase2,clase2,clase,clase2,clase2])
                                    }} className={clases[2]} type="submit">List </button>
                                </div> */}
                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="ms-5">Numero de destino: {useParams().numero}</h5>

            <div className="ms-5">
                {[0].map(() => {
                    if (tipo == "text") return (
                        <Text/>
                    )
                    if (tipo == "image") return (
                        <Image/>
                    )
                    if (tipo == "button") return (
                        <Button/>
                    )
                    if (tipo == "Interactive List") return (
                        <List/>
                    )
                    if (tipo == "Contact") return (
                        <Contact/>
                    )
                    if (tipo == "Location") return (
                        <Location/>
                    )


                }
                )}
            </div>
        </div>

    );

}

export { Enviarmensaje };