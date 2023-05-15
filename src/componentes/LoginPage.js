import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './auth';
import { useParams } from 'react-router-dom';
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
        'token': process.env.REACT_APP_PASSWORD
      }


    });

  } catch (err) {
    console.error(err);
  }
};

function LoginPage() {
  const auth = useAuth();

  const { pass } = useParams();
  (pass == process.env.REACT_APP_PASSWORD)
  const [username, setUsername] = (pass == process.env.REACT_APP_PASSWORD) ? React.useState(process.env.REACT_APP_USER) : React.useState('');
  const [password, setPassword] = (pass == process.env.REACT_APP_PASSWORD) ? React.useState(process.env.REACT_APP_PASSWORD) : React.useState('');



  React.useEffect(() => {
    if (pass == process.env.REACT_APP_PASSWORD) {
      ingresoLink();
      auth.login({ username, password })
    }
  }, [pass])

  const login = (e) => {


    auth.login({ username, password });


  };
  if (auth.user) {
    return <Navigate to="/registro" />
  }
  return (
    <div className='container-fluid mt-5 me-0 pe-0 pt-2'>
      <div className='row mt-5 me-3 pt-5 me-0 pe-0'>
        <div className='offset-lg-2 offset-md-1 col-lg-5 offset-sm-1  col-sm-9 offset-1 col-11 bg-light  pt-3 pb-4 rounded-5 border' >
          <h1 className='text-center'>Inicio de sesión</h1>

          <form onSubmit={login} className='d-flex row'>

            <label className='text-center my-1'>Escribe tu nombre de usuario:</label>
            <input className='text-center my-1 rounded-3 border-0'
              value={DOMPurify.sanitize(username)}
              onChange={e => setUsername(e.target.value)}
            />
            <label className='text-center my-1'>Escribe La contraseña:</label>
            <input className='text-center my-1 rounded-3 border-0'
              value={DOMPurify.sanitize(password)}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='text-center mt-4 rounded-5 bg-primary border-0' type="submit">Entrar</button>

          </form>

          <div className="col-12 border text-center border-white pt-4 pb-0 mb-0">
            <NavLink className="text-primary text-center" to={DOMPurify.sanitize('/login2')} key={DOMPurify.sanitize('/login2')}>Logeo por envio de codigo</NavLink>
          </div>
        </div>
      </div>

    </div>
  );
}

export { LoginPage };