const mongoose = require('mongoose');
const cities = require('./cities');
const {places , descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const newCamp = new Campground({
            author: '64cbb4b8d886985f746ce40a',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} , ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eaque tempora ea alias eligendi vel asperiores provident porro enim debitis consequuntur blanditiis itaque rem architecto ex, assumenda quo neque officia!',
            price,
            geometry: { 
                type: 'Point',
                 coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
                },
            images: [
                {
                    
                    url: 'https://res.cloudinary.com/dinsklguv/image/upload/v1691273767/YelpCamp/ezvbupicbotq6b0ukvkc.avif',
                    filename: 'YelpCamp/ezvbupicbotq6b0ukvkc',
                },
                {
                    url: 'https://res.cloudinary.com/dinsklguv/image/upload/v1691273766/YelpCamp/bikfddcvvtou9n9pbdm3.jpg',
                    filename: 'YelpCamp/bikfddcvvtou9n9pbdm3',
                }
            ]
        })
        await newCamp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});

