const mongoose = require('mongoose');
const {Schema} = mongoose //destructuring mongoose, root {const x = mongoose.Schema}
mongoose.connect('mongodb://localhost:27017/relationshipMongo', {
    useNewUrlParser: true, // version 6++ is no longer necessary
    useUnifiedTopology: true // its too
})
.then(() => {
    console.log('Mongo connection is OPEN!')
}).catch((err) => {
    console.log('Connection Error!!')
    console.log(err)
})

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 })
//     const user = await User.findOne({username: 'chickenfan99'})
//     const tweet2 = new Tweet({ text: 'omg I love my chicken family', likes: 1000 })
//     tweet2.user = user;
//     tweet2.save();
// }
// makeTweets()

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user', 'username')
    console.log(t);
}

findTweet();