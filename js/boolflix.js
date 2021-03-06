var app = new Vue(
  {
    el: '#flix',
    data: {
      libreriaFilm: [],
      libreriaSerieTV : [],
      libreriaCompleta: [],
      generi: [] ,
      genereSelezionato: 'All',
      ricerca: '' ,
      stelle: ['', '', '', '', ''],
      attori: []
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
              }
              for(var i = 0; i < this.libreriaFilm.length; i++) {
                    axios.get('https://api.themoviedb.org/3/movie/' + this.libreriaFilm[i].id + '/credits', {
                      params: {
                        api_key: 'd8981d977157659ad91b21c7715d6d58',
                        language: 'it-IT',
                      }

                    }
                  )
                  .then((attori) => {
                    this.attori = attori.data.cast;
                    console.log(this.attori)
                  }
                )
              }
              // 2° chiamata serie tv
              axios.get('https://api.themoviedb.org/3/search/tv' , {
                  params: {
                    api_key: 'e99307154c6dfb0b4750f6603256716d',
                    query: this.ricerca,
                    language: 'it-IT'
                  }
                }
              )
              .then( (series) => {
                  this.libreriaSerieTV = series.data.results;
                  console.log(this.libreriaSerieTV)
                  for(var i = 0; i < this.libreriaSerieTV.length; i++) {
                    this.libreriaSerieTV[i].vote_average = Math.ceil(this.libreriaSerieTV[i].vote_average/2)
                  }
                  this.libreriaCompleta = [...this.libreriaFilm, ...this.libreriaSerieTV]
                  this.libreriaCompleta.sort(function(a, b) {
                      if(b.popularity < a.popularity){
                        return -1;
                      }
                      if(b.popularity > a.popularity) {
                        return 1;
                      }
                      return 0;
                    }
                  )
                  this.libreriaCompleta.sort()
                  console.log(this.libreriaCompleta)


                  axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                      api_key: 'd8981d977157659ad91b21c7715d6d58',
                      query: this.ricerca,
                      language: 'it-IT',
                    }
                  })
                  .then((generi) => {
                    this.generi = generi.data.genres;
                    console.log(this.generi)
                  })
                }
              )
            }
          );
        }
      },
    },
    mounted: function() {

    }
  }
)
