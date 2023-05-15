import React from "react";
import '../estilos.css';
import { useState } from "react";

function List() {


    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [footer, setFooter] = useState("");
    const [button1, setbButton1] = useState("");
    const [button2, setbButton2] = useState("");
    const [button3, setbButton3] = useState("");
    const [button4, setbButton4] = useState("");
    const [button5, setbButton5] = useState("");
    const [button6, setbButton6] = useState("");
    const [button7, setbButton7] = useState("");
    const [button8, setbButton8] = useState("");
    const [button9, setbButton9] = useState("");
    const [button10, setbButton10] = useState("");
    const [lista, setLista] = useState([{
        "id": "<ID 1.1>",
        "title": ""
    },{
        "id": "<ID 1.2>",
        "title": ""
    }]);


    var rows = [{
        "id": "<ID 1.1>",
        "title": ""
    },{
        "id": "<ID 1.2>",
        "title": ""
    }]



    const submitCourse = async (e) => {

        // actualizarbotones();


        // const resetForm = () => {
        //     setInformacion('');

        // };

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
                        "type": "list",
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
                            "button": "Send",
                            "sections": [
                                {
                                    "rows": lista
                                }
                            ]
                        }
                    }
                }
                ),

            });
            // resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mb-5">
            <div className="row">

                <div className=" col-11">
                    <p className="d-flex">Para enviar lista de botones deberas llenar los siguientes campos. los campos con <span className="text-danger mx-2"> *  </span> son obligatorios.</p>

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

                        <div className="conteiner-fluid mt-3">
                            <div className="row">
                                <div className="col-6">
                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button1">Button 1 <span className="text-danger d-inline-flex ">(*)</span></label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button1"
                                            value={lista[0].title}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => {
                                                
                                                rows[0] = {
                                                    "id": "<ID 1.1>",
                                                    "title": e.target.value
                                                }
                                                setLista(rows);
                                            }}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button2">Button 2 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button2"
                                            value={lista[1].title}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => {
                                                
                                                rows[1] = {
                                                    "id": "<ID 1.2>",
                                                    "title": e.target.value
                                                }
                                                setLista(rows);
                                            }}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button3">Button 3 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button3"
                                            value={button3}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton3(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button4">Button 4 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button4"
                                            value={button4}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton4(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button5">Button 5 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button5"
                                            value={button5}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton5(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button6">Button 6 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button6"
                                            value={button6}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton6(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button7">Button 7 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button7"
                                            value={button7}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton7(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button8">Button 8 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button8"
                                            value={button8}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton8(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button9">Button 9 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button9"
                                            value={button9}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton9(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex flex-row">
                                        <label className="w-25 " htmlFor="button10">Button 10 </label>
                                        <input maxLength="20"
                                            type="text"
                                            name="button10"
                                            value={button10}
                                            className="form-control text-center text-primary"
                                            onChange={(e) => setbButton10(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

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



export { List };