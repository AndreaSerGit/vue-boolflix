var app = new Vue(
  {
    el: '#flix',
    data: {
      libreriaFilm: [],
      ricerca: '' ,
    },
    created: function() {

    },
    methods: {
      cercaFilm: function() {
        if(this.ricerca != '') {
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
          console.log(this.libreriaFilm)
          for(var i = 0; i < this.libreriaFilm.length; i++) {
            this.libreriaFilm[i].vote_average = Math.ceil(this.libreriaFilm[i].vote_average/2)
            console.log(this.libreriaFilm[i].vote_average)
          }

        }

      )

        }

      }
    },
    mounted: function() {

    }
  }
)
