require('colors');
//funciones de ingreso de datos manual
// const {mostrarMenu,pausa }= require('./helpers/mensajes')
const { inquirerMenu,
               pausa,
           leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheck } = require('./helpers/inquirer');
const { guardarDb,leerDB}=require('./helpers/crud')
const Tareas = require('./models/tareas');


const main = async () => {
  
  let opt = '';
  const tareas = new Tareas();
  
  do {
    opt = await inquirerMenu();    
    const tareasDB = leerDB();

    if (tareasDB) {
      tareas.cargarTareasFromArray(tareasDB);
    }
    //console.log(opt)  
    switch (opt) {
      case '1':
        //crear opcion
        const crear = await leerInput("Descripcion:")
      //  console.log(crear);
        tareas.crearTareas(crear);        
        break;
      case '2':
        tareas.listadoCompleto();
      break;
      case '3':
        tareas.listarPendientesCompletadas(3)
       break;
      case '4':
        tareas.listarPendientesCompletadas(4)
        break;
       case '5':
        const ids = await mostrarListadoCheck(tareas.listadoArr);
        tareas.toggleCompletadas(ids)
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr)
        if (id !== '0') {
          const ok = await confirmar('Deseas borrar esta tarea')
          if (ok) {
            tareas.borrarTarea(id)
            console.log("Tarea Borrada ");
          }
        }
        
      break;
   
    }
    guardarDb(tareas.listadoArr)
    await pausa();
  }while(opt !=='0' )
  
  
  
}

main();