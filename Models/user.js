const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {id : false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})


const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({ //Have an object ID
        first: 'Harry',
        last: 'Kane'
    })
    u.addresses.push({ //when something push, it has a object ID too
        street: '54, Undar',
        city:'Jombang',
        state:'Jatim',
        country:'INA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const b = await User.findById(id);
    b.addresses.push({
        street: '99 st. Pittsburg',
        city:'Chicago',
        state:'CH',
        country:'USA'
    })
    const wait = await b.save()
    console.log(wait)
}

addAddress('621223ddf240a44fb6b6fd4e')
// makeUser()