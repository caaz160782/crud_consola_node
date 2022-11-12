const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  

  get listadoArr() {
    const listado = []
    Object.keys(this._listado).forEach(key => {
      const tarea =this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
 
  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })    
  }


  crearTareas(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this, this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'Completado'.green
        : 'Pendiente'.red;
        
      console.log(`${idx}. ${desc} :: ${estado}`);

    })
  }

  listarPendientesCompletadas(select) {
    const completado = 3;
    const pendiente = 4;
    let contador = 0;
    this, this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'Completado'.green
        : 'Pendiente'.red;
        
      if (select === completado && completadoEn !== null) {
        contador += 1;
        console.log(`${contador.toString().green}. ${desc} :: completada el ${completadoEn.blue}`);
       }
      if (select === pendiente && completadoEn === null) {
        contador += 1;
         console.log(`${contador.toString().green}. ${desc} :: ${completadoEn}`);
       }

    })
  }

  toggleCompletadas(ids =[]) {
    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
        
    });
    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;