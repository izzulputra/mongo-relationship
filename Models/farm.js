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

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products:[{ type: Schema.Types.ObjectId, ref: 'Product'}]
})
const Product = mongoose.model('Product', productSchema)
const Farm = mongoose.model('Farm', farmSchema)

// Product.insertMany([
//     {name: 'Goddess Melon', Price: '4.99', season: 'Summer'},
//     {name: 'Sugar Baby Melon', Price: '6.59', season: 'Fall'},
//     {name: 'Asparagus', Price: '5.29', season: 'Spring'},
//     {name: 'Water Melon', Price: '6.79', season: 'Winter'}
// ])

//// To make ONE
// const makeFarm = async () => {
//     const farm = new Farm ({ name: 'Full Belly Farms', city: 'Guinda, CA'});
//     const melon = await Product.findOne({ name: 'Goddess Melon'});
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm)
// }
// makeFarm();

//To add products to Full Belly farms
const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms'});
    const watermelon = await Product.findOne({ name: 'Sugar Baby Melon'});
    farm.products.push(watermelon)
    await farm.save()
    console.log(farm)
}

addProduct()