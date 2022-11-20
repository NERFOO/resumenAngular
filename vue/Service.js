import Global from "@/Global";
import axios from "axios";

import ServicesPeliculas from './../services/ServicesPeliculas';
const service = new ServicesPeliculas();

export default class ServicesPeliculas {
    getGeneros() {
        return new Promise(function (resolve) {
            var request = "/api/Generos/";
            var url = Global.urlPeliculas + request;

            axios.get(url).then( res => {
                resolve(res.data);
            })
        })
    }

    postPersonaje(personaje) {
        return new Promise(function (resolve) {
            var request = "/api/personajes/";
            var url = Global.urlSeries + request;

            axios.post(url, personaje).then( res => {
                resolve(res);
            })
        })
    }

    putPelicula(idPeli, idGen) {
        return new Promise(function (resolve) {
            var request = `/api/peliculas/UpdatePeliculaGenero/${idPeli}/${idGen}`;
            var url = Global.urlPeliculas + request;

            axios.put(url).then( res => {
                resolve(res);
            })
        })
    }

    deletePelicula(id) {
        return new Promise(function (resolve) {
            var request = "/api/peliculas/" + id;
            var url = Global.urlPeliculas + request;

            axios.delete(url).then( res => {
                resolve(res);
            })
        })
    }




POST CON AUTENTICACION EN EL LOGIN POR HEADERS
    post(usuario) {
        return new Promise(function (resolve) {
            var json = JSON.stringify(usuario);
            var header = {
                "Content-Type" : "application/json" ,
                "responseType" : "json"
                // "Authorization" : "Bearer " + token
            }
            var request = "/auth/login/";
            var url = Global.url + request;

            axios.post(url, json, {headers : header}).then( res => {
                resolve(res.data);
            })
        })
    }
    cargarToken() {
        service.post(this.usuario).then( res => {
            localStorage.setItem('token', res.response);
            this.$router.push(`/empleados`);
        })
    }

    getUsuarios() {
        return new Promise(function (resolve) {
            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            };

            var request = "/api/Empleados/";
            var url = Global.url + request;
            axios.get(url, { headers: headers }).then(response=>{
                resolve(response.data)
            })
        })
    }
    mounted() {
        service.getUsuarios().then( res => {
            this.usuarios = res;
        })
    }
}