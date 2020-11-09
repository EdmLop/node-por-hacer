const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.description);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('=======Por hacer======='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('======================='.green);
        }
        break;
    case 'actualizar':
        let result = porHacer.actualizar(argv.description, argv.completado);
        if (result) {
            console.log("El objeto se actualizo");
        } else {
            console.log(`No se encontro la tarea ${argv.description}`);
        }
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.description);
        console.log(borrado);
        break;
    default:
        console.log("accion incorrecta");
        break;
}