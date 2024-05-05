import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AuthLayout  from './assets/layout/AuthLayout';
import  RutaProtegida  from './assets/layout/RutaProtegida';


import  Login  from './assets/paginas/Login';
import  Registrar  from './assets/paginas/Registrar'
import  Olvidepassword  from './assets/paginas/Olvidepassword'
import  ConfirmarCuenta  from './assets/paginas/ConfirmarCuenta'
import NuevoPassword from './assets/paginas/NuevoPassword';
import AdministrarPacientes from './assets/paginas/AdministrarPacientes'
import EditarPerfil from './assets/paginas/EditarPerfil'
import CambiarPassword from './assets/paginas/CambiarPassword'


import { AuthProvider } from './assets/context/AuthProvider';
import { PacientesProvider } from './assets/context/PacientesProvider';

function App() {
  

  return (
    <BrowserRouter>
        <AuthProvider>
            <PacientesProvider>
              <Routes>

                <Route path="/" element={<AuthLayout/>}>
                    <Route index element={<Login/>}/>
                    <Route path='registrar' element={<Registrar/>}/>
                    <Route path='olvide-password' element={<Olvidepassword/>}/>
                    <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
                    <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/>
                </Route>

                <Route path="/admin" element={<RutaProtegida/>}>
                  <Route index element={<AdministrarPacientes/>} />
                  <Route path="perfil" element={<EditarPerfil/>} />
                  <Route path="cambiar-password" element={<CambiarPassword/>} />

                  

                </Route>

              </Routes>
            </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
