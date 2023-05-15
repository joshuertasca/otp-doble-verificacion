const texto= "hola como va"
export default function CourseForm() {
    
    const submitCourse = async (e) => {
        e.preventDefault();
        try {
            await fetch('/.netlify/functions/courses', {
                method: 'POST',
                body: JSON.stringify({
                    tipo:"text",
                    numero: "573114610919",
                    texto: "hosajsjnajksdn"
                }),
            });
            
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <div className="card">
            <div className="card-header">enviar Objeto prueba</div>
            
                <form className="" onSubmit={submitCourse}>
                    
                    <button type="submit" className="btn btn-primary">
                        Enviar Objeto
                    </button>
                </form>

        </div>
    );
}
