var app = new Vue(
  {
    el: '#flix',
    data: {
      libreriaFilm: [],
      ricerca: ''
    },
    created: function() {

    },
    methods: {
      cercaFilm: function() {
            axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: 'd8981d977157659ad91b21c7715d6d58',
                query: this.ricerca,
                language: 'it-IT'
              }
            }
          )
          .then( (result) => {
            this.libreriaFilm = result.data.results;
            console.log(result)
            console.log(this.libreriaFilm)
          }

        )

      }
    },
    mounted: function() {

    }
  }
)
