// mongod root directory 
// cd /c
// mkdir -p data/db
// mongo to open a new instance 
https://docs.mongodb.com/manual/reference/mongo-shell/

// collections = tables
// document = rows
// fields = columns 

// mongoose models the data in mongoDB databases, handles connect between 
// API and MongoDB database

// Mongoose is an ODM , Object Document Mapper

// two ways of writing object methods
const dogObject = {
    // this...
    bark: function() {
      console.log('Woof!');
    },
  
    // ... is the same as this
    bark() {
      console.log('Woof!');
    }
  }

// n MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany(). 
// ..But in Mongoose, we use the .create() method, which will actually handle
// .. either one or multiple inserts!

// update pizza by id
// .updateOne(), .updateMany() will update document without returning them.
updatePizza({ params, body }, res) {
    // if we dont set the third parameter{new:true}, the original will return instead of the
    // ..updated document
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

// delete pizza
// .deleteOne() or .deleteMany() also will delete one or many. 
deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }

// in pizza-routes.js, setting up API-specific routes
const router = require('express').Router();

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get()
  .post();

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router; 

// this code
router.route('/').get(getCallbackFunction).post(postCallbackFunction);
// is this same as this
router.get('/', getCallbackFunction);
router.post('/' postCallbackFunction);

// In Mongoose, though, we can instruct the parent to keep track of its children, 
// ..not the other way around

// mongoose virtuals allows you to add vittual properties to a document
// ..that arent stored in the database 
// add more inofrmation to a database reponse so that we dont have to 
// ..add in the information manually with a helper
const pizza = await Pizza.findOne()
pizza.commentCount // 5
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Even though the pizza stored the comment, all we can see is the comment _id. 
// ..We also ran into this issue with SQL. There, we joined two tables to resolve the problem,
// .. but in MongoDB we'll populate a field. To populate a field, 
// ..just chain the .populate() method onto your query, passing in an object with the key path 
// ..plus the value of the field you want populated.
// update getAllPizzas() method in pizza-controller
Pizza.find({})
  .populate({
    path: 'comments',
    // select option tell mongoose we dont care about the _v field on commments
    // the - sign in front indicates we dont want it to be returned. 
    // without the -sign , means it would return only the _v field
    select: '-__v'
  })
  .then(dbPizzaData => res.json(dbPizzaData))

// getters - transform the data by default everytime it s queried
// takes the stored data you are looking to retrieve and modifies or 
// ..formats it upon return
// mongoose has a built in GET method, use it within the schema 
createdAt: {
  type: Date,
  default: Date.now,
  get: (createdAtVal) => dateFormat(createdAtVal)
},

// Like .map(), the array prototype method .reduce() executes a function on each element in an array. 
//.. However, unlike .map(), it uses the result of each function execution 
//.. for each successive computation as it goes through the array. 
//.. This makes it a perfect candidate for getting a sum of multiple values.
// exmaple of a reduce method
const developers = [
  {
    name: "Eliza",
    experience: 7,
    role: "manager"
  },
  {
    name: "Manuel",
    experience: 2,
    role: "developer"
  },
  {
    name: "Kim",
    experience: 5,
    role: "developer"
  }
];

function calculateAverage(total, years, index, array) {
  total += years;
  return index === array.length-1 ? total/array.length: total
}

const average = developers.map(dev => dev.experience).reduce(calculateAverage);
// map grabs just the years of experience from each developer
// ..then reduce is used to continually add on to a value within the scope of
// ..the moethod known as the accumulator
// ..then divide by the length of the entire array

// $push allows for duplicates , $addtoset does not 
// subdocument routes requires both ids of the sub and the parent document
app.put('/api/pet/:id/owner/:owner_id',({params}, res)=>{
  Pet.findbyIDandUpdate({_id: params.id}, {$pull:{owners: {_id:params.owner_id}}})
}) 

// PWA - progressive web application . abililty to install the app on a home screen
// ..active push notification and offline experience

// indexedDB is similar to localStorage but more involved, less retricted in the 
// ..types of data that can be stored and behaves like an actual database
// ..only accepts primitive data types, strings, numbers and booleans, 
// .. more complex object or array needs to be converted into a string 

// in indexedDB, the table is called an object store

// under application # = number of the entry in the object store. 
// key = auto-generated when autoincrement set to true 

// Robo3T