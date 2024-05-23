import { useState, useEffect } from 'react';

import Alerta from '../components/alerta'

import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams(); // use params para extraer parametros de la url como tokens que se asignan en el routin luego de "/:"

  const { token } = params;

  useEffect (() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ 
          msg: 'Coloca tu nuevo password'
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error en el enlace',
          error: true
        })
      }
    }
    comprobarToken();
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password } ) // extraer { data } de la respuesta (await) de axios y envio la url y el password 
      setPasswordModificado(true)
      setAlerta({
        msg: data.msg
      })
    } catch (error) {
      console.log(error)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alerta


  return (
    <>
         <div>
              <h1 className="text-indigo-600 font-black text-6xl"> Restablece tu password y no pierdas acceso a tus{""} <span className="text-black">Pacientes </span> </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'> 

          { msg && <Alerta
            alerta={alerta}  // revisar si condicionalmente hay un mensaje y retornar el set Alerta vacio
          />}

          {tokenValido && (
            <>
            <form 
              onSubmit={handleSubmit}
            >

              <div className="my-5"> 
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                      Nuevo Password
                    </label>
                    <input 
                    type="password" 
                    placeholder="Tu nuevo password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e => setPassword (e.target.value)} // revisar el evento y pasarle el valor y setearle el valor
                    />

                    <input 
                    type="submit" 
                    value="Guardar Nuevo Password" 
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
              </div>
            </form>
            
          </>
          )}

          {passwordModificado && 
            
            <Link to="/" className="block text-center font-medium my-5 text-gray-500">Iniciar Sesion</Link>
            
            
          }
          
        </div>
    </>
  )
}

export default NuevoPassword