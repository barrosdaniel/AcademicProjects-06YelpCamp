// Initialise express
var express = require('express');
var app = express();

// Initialise ejs
app.set('view engine', 'ejs');

// Routes
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/campgrounds', function (req, res) {
    var campgrounds = [
        {name: 'Denmark', image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Greens_Pool%2C_William_Bay%2C_Denmark_WA.jpg'},
        {name: 'Augusta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Colour_patch_near_Blackwood_mouth.jpg/800px-Colour_patch_near_Blackwood_mouth.jpg'},
        {name: 'Esperance', image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/West_Beach_WA.JPG'},
        {name: 'Busselton', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Busselton_Jetty_%2830_12_2010%29_%285345721580%29.jpg'},
        {name: 'Walpole', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/TREE_TOP_WALK_WA.JPG'}
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
});

// Initialise server
app.listen(3000, function () {
    console.log('Yelp Camp server has started on port 3000');
});