////////////////////////////////////////////////////////////
CARD
////////////////////////////////////////////////////////////
<template>
    <div>
        <div v-if="!pelicula">
            <img src="./../assets/images/loading.gif" alt="cargando" style="width:100%">
        </div>
        <div class="card" style="width: 50%; margin: auto" v-else>
            <img :src="pelicula.foto" class="card-img-top" alt="foto" style="width:70%; height: 250px; margin: auto">
            <div class="card-body">
                <h5 class="card-title">{{pelicula.titulo}}</h5>
                <p class="card-text">{{pelicula.argumento}}</p>
                <a :href="pelicula.enlaceVideo" target="_blank" class="btn btn-primary">YouTube</a>
                <router-link :to="`/peliculas/${genNac}/${pelicula.idGenero}`" class="btn btn-success">Volver</router-link>
            </div>
        </div>
    </div>
</template>
////////////////////////////////////////////////////////////



MENU
////////////////////////////////////////////////////////////
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Generos
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li v-for="gen in generos" :key="gen.idGenero"><router-link class="dropdown-item" :to="`/peliculas/Genero/${gen.idGenero}`">{{gen.nombre}}</router-link></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Nacionalidad
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li v-for="nac in nacionalidades" :key="nac.idNacionalidad"><router-link class="dropdown-item" :to="`/peliculas/Nacionalidad/${nac.idNacionalidad}`">{{nac.nombre}}</router-link></li>
                        </ul>
                    </li>
                </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Titulo" aria-label="Search" v-model="nomPelicula" v-on:keyup="filtrarPelicula">
                <button class="btn btn-outline-success" v-on:click="filtrarPelicula" type="button">Buscar</button>
            </form>
            </div>
        </div>
    </nav>
</template>
////////////////////////////////////////////////////////////



TABLE
////////////////////////////////////////////////////////////
<template>
    <div>
        <h1>Peliculas</h1>

        <div v-if="!peliculas">
            <img src="./../assets/images/loading.gif" alt="cargando" style="width:100%">
        </div>
        <div v-else>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>IMAGEN</th>
                        <th>OPCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pel in peliculas" :key="pel.idPelicula">
                        <td>{{pel.titulo}}</td>
                        <td><img :src="pel.foto" alt="imagen" style="width:100px"></td>
                        <td>
                            <router-link :to="`/detalles/${this.genNac}/${pel.idPelicula}`" class="btn btn-success">Detalles</router-link>
                            <router-link :to="`/update/`" class="btn btn-info">Modificar</router-link>
                            <button type="submit" v-on:click="eliminarPelicula(pel.idPelicula)" class="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
////////////////////////////////////////////////////////////



SWEET ALERT
////////////////////////////////////////////////////////////
import Swal from 'sweetalert2';

eliminarPelicula(id) {
    service.deletePelicula(id).then( () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No se podrán deshacer los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'La película ha sido eliminada',
                    'success'
                )
            }
            location.reload();
        })
    })
}
////////////////////////////////////////////////////////////



FORM
////////////////////////////////////////////////////////////
<template>
    <div>
        <h1>Update component</h1>

        <form v-on:submit.prevent="updatePelicula()">
            <label>Selecciona una pelicula</label>
            <select class="form-select" v-model="idPelicula">
                <option v-for="pel in peliculas" :key="pel" :value="pel.idPelicula">{{pel.titulo}}</option>
            </select>

            <label>Selecciona un genero</label>
            <select class="form-select" v-model="idGenero">
                <option v-for="gen in generos" :key="gen" :value="gen.idGenero">{{gen.nombre}}</option>
            </select>
            <br/>
            <button class="btn btn-success">Realizar cambio</button>
        </form>
    </div>
</template>
////////////////////////////////////////////////////////////