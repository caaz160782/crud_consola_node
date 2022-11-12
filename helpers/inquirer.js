const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
      value:'1' ,
      name:`${'1'.magenta}. Crear tarea`
      },
      {
      value:'2',
      name:`${'2'.magenta}. Listar tareas`
      },
      {
      value:'3',
      name:`${'3'.magenta}. Listar tareas completas`
      },
      {
      value:'4',
      name:`${'4'.magenta}. Listar tareas pendientes`
      },
      {
      value:'5',
      name:`${'5'.magenta}. Completar tarea(s)`
      },
      {
      value:'6',
      name:`${'6'.magenta}. Borrar Tarea`
      },
      {
      value:'7',
      name:`${'7'.random}. Salir`
      },

    ]
  }
];

const inquirerMenu = async () => {
    console.clear();
    console.log("**************************".green);
    console.log(' Seleccione una opción '.yellow);
    console.log('**************************\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
   return opcion;
}

const pausa = async () => {
  const question = [{
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.blue} para continuar`,
  }];
  console.log(`\n`);
  await inquirer.prompt(question);

}

const leerInput = async (msg) => {
    const question = [{
    type: 'input',
    name: 'desc',
      message: msg,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
    }
    }];
  
  console.log(`\n`);
  const quest = await inquirer.prompt(question);
  return quest.desc;  
}

const listadoTareasBorrar = async (tareas) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + 'Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }]
  
  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar =async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
    const { ok } = await inquirer.prompt(question)
  return ok 
}

const mostrarListadoCheck = async (tareas) => {
 
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked:(tarea.completadoEn)? true:false
    }
  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }]
  
  const { ids } = await inquirer.prompt(pregunta)
  return ids
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheck
}