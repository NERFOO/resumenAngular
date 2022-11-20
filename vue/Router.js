import { createWebHistory, createRouter } from "vue-router";
import HomeComponent from './components/HomeComponent.vue';
import PeliculasComponent from './components/PeliculasComponent.vue';
import DetallesPelicula from './components/DetallesPelicula.vue';
import UpdateComponent from './components/UpdateComponent.vue';

const routes = [
    {
        path : "/" , component : HomeComponent
    },
    {
        path : "/peliculas/:genNac/:id" , component : PeliculasComponent
    },
    {
        path : "/detalles/:genNac/:id" , component : DetallesPelicula
    },
    {
        path : "/update/" , component : UpdateComponent
    }
]

const router = createRouter({
    history : createWebHistory() ,
    routes : routes
})

export default router;