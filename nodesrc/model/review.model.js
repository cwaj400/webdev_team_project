var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  strain: { type: Schema.Types.String, ref: 'Strain', required: true },
  star: { type: Number, 
          required: true,
          default: "3",
          validate: {
              validator: function(text) {
                return Number.isInteger(text) && text <= 5 && text > 0;
              },
              message: "rating is from 1-5"
          }
        },
  starLit: {type: Boolean, required: true, default: false },
  desc: { type: String, required: true, default: "" },
  time: { type: Date, required: true, default: Date.now }
});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
