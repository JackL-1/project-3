import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

//! Seller Rating schema 
// Embedded Relationship , canadd a second argument checking if user has infact traded with seller 
const sellerRatingsSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})


//! User schema 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 25 },
  location: { type: String, required: true, maxlength: 30 },
  borough: { type: String, required: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ratings: [sellerRatingsSchema],
})


//Average rating 

userSchema.virtual('averageRating')
  .get(function () {
    if (!this.ratings.length) return 'No ratings for the user'

    const sum = this.ratings.reduce((acc, rating) => {
      return acc + rating.rating
    }, 0)

    return parseFloat((sum / this.ratings.length).toFixed(2))
  })


userSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'owner',
})


userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password
  },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (userPasswordConfirmation) {
    this._passwordConfirmation = userPasswordConfirmation
  })

userSchema.pre('validate', function (next) {
  if (this.isModified('password') && this.password !== this._passwordConfirmation) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(12)
    this.password = bcrypt.hashSync(this.password, salt)
  }
  next()
})

userSchema.methods.validatePassword = function (plainTextPassword) {
  return bcrypt.compare(plainTextPassword, this.password)
}


export default mongoose.model('User', userSchema)


