mounted() {
        service.getPeliculas().then( res => {
            this.peliculas = res;
        });
        service.getGeneros().then( res => {
            this.generos = res;
        });
    },


    methods : {
        updatePelicula() {
            service.putPelicula(this.idPelicula, this.idGenero).then( () => {
                this.$router.push(`/peliculas/Genero/${this.idGenero}`);
            })
        }
    },


    watch : {
        '$route.params.id'(nextVal, oldVal) {
            if(nextVal != oldVal) {
                this.cargarPeliculas();
            }
        }
    }

    data() {
        return{
            peliculas : null ,
            genNac : "" ,
            idGenNac : 0,
            pelicula : {
                id : 0 ,
                titulo : "" ,
                descripcion : "" ,
                anyo : 0
            }
        }
    },