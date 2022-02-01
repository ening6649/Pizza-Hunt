const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // everytime we retrive a pizza, the createdAt field will be formatted by 
      // ..the dateFormat() function used instead of the default timestamp value
      // timestamp value is still used for storage, but formatted version of it for display
      get: createdAtVal => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    // adding comment table to parent table pizza 
    comments: [
      {
        // tell mongoose to expect an objectId and its data comes from the comment model
        type: Schema.Types.ObjectId,
        // tells the pizza model which documents to search to find the right comments
        ref: 'Comment'
      }
    ]
  },
  {
    // tells the schema that it can use virtuals 
    toJSON: {
      virtuals: true,
      // tell the model that it should use any getter function specified
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    // this is a virtual id that mongoose returns and would be a duplicate
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,0);
});

// create the pizza model using the PIzzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
