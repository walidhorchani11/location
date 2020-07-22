const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true, },
  password: {type: String, required: true},
  job:{type: String, required: true},
  email:{type:String, required: true, unique: true},
  isAdmin:{type: String, required:true, default:'USER'},
  photo: String,
  confirmPassword: String,
  agency: [{type: mongoose.Schema.Types.ObjectId, ref: 'Agency'}],
  
  });
UserSchema.virtual('agencies', {ref: 'Agency', localField:'_id', foreignField:'user'})

module.exports = mongoose.model('User', UserSchema);
