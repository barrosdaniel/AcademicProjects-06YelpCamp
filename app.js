// Initialise express
var express = require('express');
var app = express();

// Initialise body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Initialise ejs
app.set('view engine', 'ejs');

// Initialise mongoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

// Mongoose Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create({
    name: 'Denmark',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Greens_Pool%2C_William_Bay%2C_Denmark_WA.jpg',
    description: "Denmark is a small tourist oriented town in Western Australia. It has numerous arts and craft shops, coffee shops and lots of holiday accommodation. It has surrounding wineries and places of scenic beauty and is within an hour's drive of Albany."
}, function (err, campground) {
    if (err) {
        console.log('Error writing to the database');
    } else {
        console.log('Record successfully added to the database');
        console.log(campground);
    }
});

// Routes
// var campgrounds = [
    // {name: 'Denmark', image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Greens_Pool%2C_William_Bay%2C_Denmark_WA.jpg'},
    // {name: 'Augusta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Colour_patch_near_Blackwood_mouth.jpg/800px-Colour_patch_near_Blackwood_mouth.jpg'},
    // {name: 'Esperance', image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/West_Beach_WA.JPG'},
    // {name: 'Busselton', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Busselton_Jetty_%2830_12_2010%29_%285345721580%29.jpg'},
    // {name: 'Walpole', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/TREE_TOP_WALK_WA.JPG'},
    // {name: 'Shark Bay', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxw0pHsLLQ5s0ROM2IL84-7P5SP28yi_UeA-55weLd5Iwx_Auf4A'}];
    
app.get('/', function (req, res) {
    res.render('home');
});

// INDEX route
app.get('/campgrounds', function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
       if (err) {
           console.log('Error loading data from the database');
           console.log(err);
       } else {
           console.log('All campgrounds: ');
           console.log(allCampgrounds);
           res.render('index', {campgrounds: allCampgrounds});
       } 
    });
});

// NEW route
app.get('/campgrounds/new', function (req,res) {
    res.render('new');
});

// CREATE route
app.post('/campgrounds', function (req, res) {
    var campgroundName = req.body.name;
    var campgroundImgUrl = req.body.image;
    var campgroundDescription = req.body.description;
    var newCampground = {name: campgroundName, image: campgroundImgUrl, description: campgroundDescription};
    Campground.create(newCampground, function (err, newlyCreatedCampground) {
        if (err) {
            console.log('Error writing to the database');
        } else {
            console.log('Record successfully added to the database');
            console.log(newlyCreatedCampground);
            res.redirect('campgrounds');
        }
    });
});

// SHOW route - Shows info about one campground
app.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log('Error accessing the database. Record not found.');
        } else {
            console.log('Record successfully retrieved from database.');
            console.log(foundCampground);
            res.render('show', {campground: foundCampground});
        }
      });
});

// Initialise server
app.listen(3000, function () {
    console.log('YelpCamp server has started on port 3000');
});