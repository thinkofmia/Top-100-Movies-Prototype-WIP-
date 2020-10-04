var app = new Vue({
    el: '#app',
    //Import vuetify
    vuetify: new Vuetify({
        theme: { dark: true },
    }
    ),
    data: {
        //Default message to show
        message: 'Welcome to Top 100 Movies~',
        //Data Received
        movies: [],
        //String for refresh/get data button
        getDataButton: "Get Data",
        //Current Movie Details
        movieDetails: {
        },
        movieScore: 0,
        movieDate: null,
        //API key that can be swapped
        api_key: "c886b1430121b5768bc22f4117e5cdc2"
    },
    methods:{
        //Function to retrieve particular movie details
        getDetails: function(movieID){
            //Use Axios to fetch the data
            axios.get('https://api.themoviedb.org/3/movie/'+movieID+'?api_key='+app.api_key+'&language=en-US')
            //Runs the following after fetching the data
            .then(function (response){
                //Show debug message of the data
                console.log(response.data);
                //Set movie details
                app.movieDetails = response.data;
                app.movieDate = "("+app.movieDetails.release_date.slice(0,4)+")";
                app.movieScore = app.movieDetails.vote_average*10;
                //Update app status
                app.message= "Displaying movie details of id: "+app.movieDetails.id;
                
            })
            //Catch any error
            .catch(function (error){
            //Log the error onto the page
            app.message = "Error occured: "+ error;
            })
        },
        //Function to retrieve movies data
        callAxios: function(PageNo){
        var app = this;
        //Use Axios to fetch the data
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key='+app.api_key+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+PageNo)
        //Runs the following after fetching the data
        .then(function (response){
            //Display app message when data is fetched
            app.message = "Fetching from page "+PageNo;
            //Display response data in console log
            console.log(response.data.results);
            //For each movie found, save to list of movies
            for (movie in response.data.results){
                app.movies.push(response.data.results[movie]);
            }
            //Update the app message that data has been successfully fetched
            app.message = "Data successfully fetched!";
        })
        //Catch any error
        .catch(function (error){
            //Log the error onto the page
            app.message = "Error occured: "+ error;
        })
        },

        /**
         * Function to fetch 100 movies from the button onclick
         */
        loadMovies: function(){
            var app = this;
            //Refresh the movies data, initialize the movies data into an empty array
            app.movies = [];
            //Each page consists of 20 movies. Call 5 pages to call all 100 movies
            app.callAxios(1);
            app.callAxios(2);
            app.callAxios(3);
            app.callAxios(4);
            app.callAxios(5);
            //Set the button string to Refresh Data instead
            app.getDataButton = "Refresh Data";
            console.log(app.movies);
        }
    },
    computed:{
        runtime: function(){
            return Math.floor(app.movieDetails.runtime/60)+"h "+app.movieDetails.runtime%60+"min";
        },
        //score: function(){
        //    return app.movieDetails.vote_average*10+"%";
        //}
    }
  })