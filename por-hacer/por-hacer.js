const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB().catch(err => {
        console.log(err);
    });
    return porHacer;
}

const guardarDB = () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listadoPorHacer);
        fs.writeFile("./db/data.json", data, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Archivo guardado");
        })

    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    /*     let indice = listadoPorHacer.findIndex(tarea => {
            return tarea.descripcion === descripcion;
        });
        if (indice < 0) {
            return false;
        }
        listadoPorHacer.splice(indice, 1);
        guardarDB();
        return true;
     */
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (nuevoListado.length === listadoPorHacer.length) {
        return true;
    }
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}