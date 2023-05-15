import React from "react";
import '../estilos.css';
import { useState } from "react";

function Button() {


    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [footer, setFooter] = useState("");
    const [button1, setbButton1] = useState("");
    const [button2, setbButton2] = useState("");
    const [button3, setbButton3] = useState("");
    const [botones, setbBotones] = useState([]);

    var Botones = [
        {
            "type": "reply",
            "reply": {
                "id": "btn1",
                "title": button1
            }
        }, {
            "type": "reply",
            "reply": {
                "id": "btn2",
                "title": button2
            }
        }, {
            "type": "reply",
            "reply": {
                "id": "btn3",
                "title": button3
            }
        }
    ]



    const submitCourse = async (e) => {

        actualizarbotones();


        const resetForm = () => {
            setInformacion('');

        };

        e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    "from": "51939642805",
                    "to": "573114610919",
                    "recipient_type": "individual",
                    "type": "interactive",
                    "interactive": {
                        "type": "button",
                        "header": {
                            "type": "text",
                            "text": header
                        },
                        "body": {
                            "text": body
                        },
                        "footer": {
                            "text": footer
                        },
                        "action": {
                            "buttons": botones
                        }
                    }
                }),

            });
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mb-5">
            <div className="row">

                <div className=" col-11">
                    <p className="d-flex">Para enviar botones deberas llenar los siguientes campos. los campos con <span className="text-danger mx-2"> *  </span> son obligatorios.</p>

                    <form className="" onSubmit={submitCourse}>

                        <label htmlFor="header">header </label>
                        <input maxLength="20"
                            type="text"
                            name="header"
                            value={header}
                            className="form-control bold"
                            onChange={(e) => setHeader(e.target.value)}
                        />

                        <label htmlFor="body">Body <span className="text-danger ">(*)</span></label>
                        <textarea
                            rows="3"
                            cols="50"
                            type="text"
                            name="body"
                            value={body}
                            className="form-control"
                            onChange={(e) => setBody(e.target.value)}
                        />

                        <label htmlFor="footer">Footer</label>
                        <input maxLength="20"
                            type="text"
                            name="footer"
                            value={footer}
                            className="form-control text-muted"
                            onChange={(e) => setFooter(e.target.value)}
                        />

                        <label htmlFor="button1">Button 1 <span className="text-danger ">(*)</span></label>
                        <input maxLength="20"
                            type="text"
                            name="button1"
                            value={button1}
                            className="form-control text-center text-primary"
                            onChange={(e) => setbButton1(e.target.value)}
                        />

                        <label htmlFor="button2">Button 2 </label>
                        <input maxLength="20"
                            type="text"
                            name="button2"
                            value={button2}
                            className="form-control text-center text-primary"
                            onChange={(e) => setbButton2(e.target.value)}
                        />

                        <label htmlFor="button3">Button 3 </label>
                        <input maxLength="20"
                            type="text"
                            name="button3"
                            value={button3}
                            className="form-control text-center text-primary"
                            onChange={(e) =>setbButton3(e.target.value)}
                        />

                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Enviar Botones
                        </button>
                    </form>
                </div>
            </div>


        </div>
    );


    function actualizarbotones() {
        (button2 == "" && button3 == "") ? setbBotones([Botones[0]]) : "";
        (button2 == "" && button3 != "") ? setbBotones([Botones[0], Botones[2]]) : "";
        (button2 != "" && button3 == "") ? setbBotones([Botones[0], Botones[1]]) : "";
        (button2 != "" && button3 != "") ? setbBotones([Botones[0], Botones[1], Botones[2]]) : "";
    }
}



export { Button };