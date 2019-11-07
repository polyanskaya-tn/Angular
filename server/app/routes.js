var mongoose = require('mongoose');
var Category = require('../models/category');
var Author = require('../models/author');
var Events = require('../models/events');
var Errors = require('./errors.js');

module.exports = function(app) {

    app.get('/api/category', function (req,res){
        Category.find({}, function(err, result) {
            if (err) return Errors.handleError(err, res);
            res.json(result);
        });
    });

    app.get('/api/author', function (req,res){
        Author.find({}, function(err, result) {
            if (err) return Errors.handleError(err, res);
            res.json(result);
        });
    });

    app.get('/api/event', function (req,res){

        var category = req.query.category;
        var author = req.query.author;
        var offset = req.query.offset;
        var limit = req.query.limit;

        var filter = {};
        if (category) {
            filter.category = category;
        }
        if (author)
            filter.authors = author;

        Events
        .find(filter).skip(offset).limit(limit)
        .populate('category') //подменяет идентификатор автора информацией об авторе!
        .populate('authors')
        .exec(function (err, result) {
            if (err) return Errors.handleError(err);
            res.json(result);
        });
    });

    //add category
    app.post('/api/category', function(req, res) {
        console.log('Add Category');
        var cat = new Category({
          category: req.body.category,
        });
        cat.save(function(err, result) {
            if (err) return Errors.handleError(err, res);
            res.json( {
                message:"Successfully added category",
                result
            });
        });
    });
    //add author
    app.post('/api/author', function(req, res) {
        console.log('Add Author');
        var author = new Author({
          name: req.body.name,
          surname: req.body.surname,
        });
        author.save(function(err, result) {
            if (err) return Errors.handleError(err, res);
            res.json( {
                message:"Successfully added author",
                result
            });
        });
    });
    //add author
    app.post('/api/event', function(req, res) {
        console.log('Add Event');

        var arr = req.body.authors.split(',');
     
        var dt= req.body.date;
        if (!dt)
            dt = new Date();

        var event = new Events({
          category: req.body.category,
          title: req.body.title,
          info: req.body.info,
          date: dt,
          authors: arr,
        });
        event.save(function(err, result) {
            if (err) return Errors.handleError(err, res);
            res.json( {
                message:"Successfully added event",
                result
            });
        });
    });
};