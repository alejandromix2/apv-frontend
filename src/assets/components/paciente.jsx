import usePacientes from "../hooks/usePacientes";


const Paciente = ({paciente}) => {

    const { setEdicion, eliminarPaciente } = usePacientes();
    

    const {nombre, propietario, email, fecha, sintomas, _id} = paciente;

    // console.log(fecha);

    const formatearFecha = (fecha) => {
        let nuevaFecha
        if (fecha.includes('T00:00:00.000Z')) {
          nuevaFecha = new Date(fecha.split('T')[0].split('-'))
        } else {
          nuevaFecha = new Date(fecha)
        }
        const opciones = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
        return nuevaFecha.toLocaleDateString('es-ES', opciones)
      }
    // console.log(fecha)

  return (
    <>
    <div className="mx-5 my-10 bg-white shadow-lg px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-600 my-3">Nombre: {''}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-3">Propietario: {''}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-3">Email: {''}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600 my-3">Fecha de Alta: {''}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-600">Sintomas: {''}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type='button'
                className="py-2 px-10 bg-indigo-700 text-white rounded-md uppercase font-bold hover:bg-indigo-900"
                onClick={() => setEdicion(paciente)}>
                Editar
            </button>
            <button
                type='button'
                className="py-2 px-10 bg-red-700 text-white rounded-md uppercase font-bold hover:bg-red-900"
                onClick={() => eliminarPaciente(_id)}>
                Eliminar
            </button>
        </div>
    </div>
    
    </>
  )
}

export default Paciente