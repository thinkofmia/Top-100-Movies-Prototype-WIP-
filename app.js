var app = new Vue({
    el: '#app',
    //Import vuetify
    vuetify: new Vuetify({
        theme: { dark: true },
    }
    ),
    //State
    data: {
        //Default message to show
        message: 'Welcome to Top 100 Movies~',
        //Search keyword
        keyword: '',
        //List of movies to be displayed
        movies: [],
        //String for refresh/get data button
        getDataButton: "Top 100 Movies",
        //Current Movie Details
        movieDetails: {},
        movieScore: 0,
        movieDate: null,
        //API key that can be swapped
        api_key: "c886b1430121b5768bc22f4117e5cdc2"
    },
    //Actions
    methods:{
        //Function to search for movies
        searchMovies: function(){
            //Initialize movie data
            app.movies = [];
            //Check length of the keyword
            //If keyword exists
            if (app.keyword){
                //Use Axios to fetch the data
                axios.get('https://api.themoviedb.org/3/search/movie?api_key='+app.api_key+'&query='+app.keyword)
                //Runs the following after fetching the data
                .then(function (response){
                    //Show debug message of the data
                    console.log(response.data.results);
                    //For each movie found, save to list of movies
                    for (movie in response.data.results){
                        app.movies.push(response.data.results[movie]);
                    }
                    //Update app message
                    app.message = "Searched for "+app.keyword+"...";
                })
                //Catch any error
                .catch(function (error){
                    //Log the error onto the page
                    app.message = "Error occured: "+ error;
                })
            }
            //Else if keyword is empty, erase data
            else{
                app.movieDetail = [];
            }
            
        },
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
        //Function to retrieve a specific page of the top 100 movies 
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
            //Attempt to restart function
            callAxios(PageNo);
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
            //Log the movie data
            console.log(app.movies);
        }
    },
    computed:{
        //Calculates the runtime of the movie
        runtime: function(){
            return Math.floor(app.movieDetails.runtime/60)+"h "+app.movieDetails.runtime%60+"min";
        },
        //Returns the percentage of the movie score
        percentage: function(){
            return app.movieDetails.vote_average*10+"%";
        }
    }
  })