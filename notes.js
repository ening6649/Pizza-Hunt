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