const fs = require('fs');


fs.readFile('./server/top-rated-movies-02.json', (err, data) => {
  if (err) throw err;
  let movies = JSON.parse(data);


  let actors = {};
  let genre = {};
  let currentMovieId =1;
  let currentActorId =0;
  let currentGenreID =0;
  movies.movies.forEach((movie)=>{
    movie.id = currentMovieId;
    currentMovieId++;
    /*movie?.actors?.forEach((act,index)=>{
      if(actors[act.id]){
        movie.actors[index] = actors[act.id]
      }else{
        currentActorId++;
        actors[act.id] = {
          id: currentActorId,
          name: act.name,
          picture: "https://static.toiimg.com/photo/65675521.cms",
          movies: Math.floor(Math.random() * 500),
        }
        movie.actors[index] = actors[act.id];
      }
    });*/
    /*movie?.genres?.forEach((gen,index)=>{
      if(genre[gen]){
        movie.genres[index] = genre[gen]
      }else{
        currentGenreID++;
        genre[gen] = {
          id: currentGenreID,
          name: gen,
        }
        movie.genres[index] = genre[gen];
      }
    });*/
  })

  let jsonData = JSON.stringify({
    movies: movies.movies,
    actors: movies.actors,
    genres: movies.genres
  });
  fs.writeFileSync('./server/top-rated-movies-02.json', jsonData);



});
