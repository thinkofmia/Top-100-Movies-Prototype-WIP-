var app = new Vue({
    el: '#app',
    data: {
        //Default message to show
        message: 'Welcome to Top 100 Movies~',
        //Data Received
        movies: [],
        api_key: "c886b1430121b5768bc22f4117e5cdc2"
    },
    methods:{
        callAxios: function(PageNo){
        var app = this;
        //Use Axios to fetch the data
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key='+app.api_key+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+PageNo)
        .then(function (response){
            //Display app message when data is fetched
            app.message = "Fetching from page "+PageNo;
            //Display response data in console log
            console.log(response.data.results);
            //For each movie found, save to list of movies
            for (movie in response.data.results){
                //console.log(response.data.results[movie]);
                app.movies.push(response.data.results[movie]);
            }
            app.message = "Data successfully fetched!";
        })
        .catch(function (error){
            //Log the error onto the page
            app.message = "Error occured: "+ error;
        })
        },
        loadMovies: function(){
            var app = this;
            //Each page consists of 20 movies. Call 5 pages to call all 100 movies
            app.callAxios(1);
            app.callAxios(2);
            app.callAxios(3);
            app.callAxios(4);
            app.callAxios(5);
            console.log(app.movies);
        }
    },
    computed:{

    }
  })