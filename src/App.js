
import './App.css';
import React from 'react';
import { Navbar } from './componentes/navbar';
import { Barralateral } from './componentes/barralateral';
import { AuthProvider, AuthRoute } from './componentes/auth'
import { Registros } from './componentes/registros';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Enviarplantillas } from './componentes/Enviarplantillas';
import { Enviarmensaje } from './componentes/enviarmensaje';
import { LoginPage } from './componentes/LoginPage';
import { LogoutPage } from './componentes/Logoutpage';
import { Enviarnotificacion } from './componentes/EnviarNotificacion';
import { Enviarcodigo } from './componentes/EnviarCodigoWA';
import { LoginCode } from './componentes/loginCode';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://ab6e41e6bd0843fd9d51c5b9e95209d5@o4504773415665664.ingest.sentry.io/4504773419663360",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

function App() {
  return (
  <Sentry.ErrorBoundary fallback={"Error ocurrido"}> 
    <HashRouter>
      <AuthProvider>
        <div className='container-fluid m-0 p-0'>
          <div className='row mx-0 px-0'>
            <div className='d-md-flex  mx-0 px-0 col-md-2 d-sm-none d-none'>
              <Barralateral />
            </div>
            <Navbar className='p-0 m-0' />
            <div className='col-md-10 col-12'>
              <Routes>
                <Route
                  path='registro'
                  element={
                    <AuthRoute>
                      <Registros />
                    </AuthRoute>
                  }
                />
                <Route
                  path='enviarplantilla/:numero'
                  element={
                    <AuthRoute>
                      <Enviarplantillas />
                    </AuthRoute>
                  }
                />
                <Route
                  path='enviarmensaje/:numero'
                  element={
                    <AuthRoute>
                      <Enviarmensaje />
                    </AuthRoute>
                  }
                />
                <Route
                  path='enviarnotificacion'
                  element={
                    <AuthRoute>
                      <Enviarnotificacion />
                    </AuthRoute>
                  }
                />
                <Route
                  path='enviarcodigo'
                  element={
                    <AuthRoute>
                      <Enviarcodigo />
                    </AuthRoute>
                  }
                />
                <Route path='/:pass?' element={<LoginCode />} />
                <Route path='/login2' element={<LoginPage />} />
                <Route path='logout' element={<LogoutPage />} />
                <Route path='*' element={<h1>No se encontró la pagina</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </HashRouter>
  </Sentry.ErrorBoundary>

  );
}

export default App;
