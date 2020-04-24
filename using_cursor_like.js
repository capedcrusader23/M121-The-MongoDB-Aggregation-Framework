
var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"]


db.movies.aggregate([ {$match:
    {countries:{$elemMatch:{$eq:"USA"}},"tomatoes.viewer.rating":{$gte:3} }},
    {$project:{
        "tomatoes.viewer.rating": 1,
            title: 1,
            num_favs: {
                $size: { $setIntersection: ["$cast", favorites] },
            }
    }},
    {$sort:{"num_favs": -1,
    "tomatoes.viewer.rating": -1,
    "title": -1}},
    {
        $skip: 24,
    } 
   
]).pretty()






db.movies.aggregate([

        {
            $match:{
                year:{$gte:1990},
                "imdb.votes":{$gte:1},
                "imdb.rating":{$gte:1},
                languages:{$in:["English"]}
            }
        },
        {$project:
        {
        title:1,
        "imdb.rating":1,
        "imdb.votes":1,
        normalized_rating:{
            $avg:[
                "$imdb.rating",
                {
                    $add: [
                      1,
                      {
                        $multiply: [
                          9,
                          {
                            $divide: [
                              { $subtract: ["$imdb.votes",5] },
                              { $subtract: [1521105,5] }
                            ]
                          }
                        ]
                      }
                    ]
                  }
            ]
        }
        }},
        {$sort:{normalized_rating:1}}
])

