const description = {
    alias: 'd',
    demand: true,
    desc: 'Nombre de la tarea'
}

const completed = {
    alias: 'c',
    dafault: true,
    desc: 'Estatus de la tarea'
}

const argv = require('yargs')
    .command("crear", "Crea una tarea", {
        description
    })
    .command("listar", "Lista todas las tareas", )
    .command("actualizar", "actualiza una tarea", {
        description,
        completed
    })
    .command('borrar', 'Borra la tarea del listado', {
        description
    })
    .help()
    .argv;

module.exports = {
    argv
}