var app = new Vue({
    el: '#app',
    data: {
        //Default message to show
        message: 'Welcome to Top 100 Movies~',
        //Data Received
        movies: "None"
    },
    methods:{
        loadMovies: function(){
            var app = this;
            //Use Axios to fetch the data
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=c886b1430121b5768bc22f4117e5cdc2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
            .then(function (response){
                //Display app message when data is fetched
                app.message = response.data.results[0].title+": "+response.data.results[0].popularity;
                //Display response data in console log
                console.log(response.data.results);
                //Save movies Data
                app.movies = response.data.results;
            })
            .catch(function (error){
                //Log the error onto the page
                app.message = "Error occured: "+ error;
            })
            console.log();
        }
    },
    computed:{

    }
  })