Lets find how many movies in our movies collection are a "labor of love", where the same person appears in cast, directors, and writers


Here first we have to fetch all 3 arrays ie directors,cast and writers(int writers we have name as "Cecil M. Hepworth" (story),so we have to get only the name and remove story part)


Using $map. 
Map take 3 arguments.
1. input:- the array which we have to traverse
2. as:- the variable name which will be used to access a particular element in array. 
3. in:- the operation to be performed Element wise.


$setIntersection operator is used to find intersection within all the arrays passed as argument.

Step 1:-  Find the intersection.
db.movies.aggregate([{$project:{lol:{$setIntersection:["$directors","$cast",{$map:{input:"$writers",as:"writers",in:{$arrayElemAt:[{$split:["$$writers", " ("]} ,0 ]    }   }}                ]}}}  ])

Step 2:-Remove the intersections that have null in it.

db.movies.aggregate([{$project:{lol:{$setIntersection:["$directors","$cast",{$map:{input:"$writers",as:"writers",in:{$arrayElemAt:[{$split:["$$writers", " ("]} ,0 ]    }   }}                ]}}},{$match:{lol:{$ne:null}}}  ])

Step 3:-Find the count of entries that have size>0

db.movies.aggregate([{$project:{lol:{$setIntersection:["$directors","$cast",{$map:{input:"$writers",as:"writers",in:{$arrayElemAt:[{$split:["$$writers", " ("]} ,0 ]    }   }}                ]}}},{$match:{lol:{$ne:null}}},{$project:{siz:{$size:"$lol"}}},{$match:{siz:{$gt:0}}}  ]).itcount();