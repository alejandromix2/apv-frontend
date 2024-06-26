
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from "../components/alerta"

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){ // includes es si contienen un string vacio

      setAlerta({msg: 'Hay campos Vacios', error: true}) // asignar mensaje al set alerta y el error true
      return;
    }

    if(password !== repetirPassword){

      setAlerta({msg: 'Los password no son iguales', error: true})
      return;
    }

    if(password.length < 6){
      
      setAlerta({msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true})
      return;
    }
    
    setAlerta({})


    // crear el usuario en la api

    try {
      
      await clienteAxios.post('/veterinarios', {nombre, email, password})
      setAlerta({msg: 'Registrado Correctamente, revisa tu email', error: false})
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  
  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl"> Crea tu Cuenta y Administra {""} tus <span className="text-black">Pacientes </span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>  
          { msg && <Alerta
            alerta={alerta}  // revisar si condicionalmente hay un mensaje y retornar el set Alerta vacio
          />}
          <form 
            onSubmit={handleSubmit}> 
            {/*  una vez enviado revisar y validar los campos con la funcion handle submit */}

            <div className="my-5"> 
                <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                  Nombre
                </label>
                <input 
                type="text" 
                placeholder="Tu Nombre" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nombre}
                onChange={e => setNombre (e.target.value)}
                />
            </div>
            <div className="my-5"> 
                <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                  E-mail
                </label>
                <input 
                type="email" 
                placeholder="Email de Registro" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail (e.target.value)}
                />
            </div>
           
            <div className="my-5"> 
                <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                  password
                </label>
                <input 
                type="password" 
                placeholder="Tu password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword (e.target.value)} // revisar el evento y pasarle el valor y setearle el valor
                />
            </div>

            <div className="my-5"> 
                <label 
                className="uppercase text-gray-600 block text-xl font-bold">
                  Repetir Password
                </label>
                <input 
                type="password" 
                placeholder="Repetir password" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={e => setRepetirPassword (e.target.value)}
                />
            </div>
           

              <input 
              type="submit" 
              value="Crear Cuenta" 
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
              <Link to="/" className="block text-center font-medium my-5 text-gray-500">Ya tienes una cuenta? <span className="text-indigo-700">Inicia Sesion</span></Link>
              <Link to="/olvide-password" className="block my-5 font-medium text-center text-gray-500">Olvide mi password</Link>
          </nav>
      </div>

    </>
  )
}

export default Registrar