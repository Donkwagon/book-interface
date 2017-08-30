
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({

    title: String,
    subTitle: String,
    bookId: String,
    url_info: String,
    url_reader: String,
    coverImg: String,
    authors: Schema.Types.Mixed,
    bought_at: String,

    //detailed info
    intro: String,
    directory: Schema.Types.Mixed,
    classification: String,
    provider: String,
    published_at: String,
    ISBN: Number,
    press: String,
    tags: Schema.Types.Mixed,

    created_at: Date,
    updated_at: Date

});


var Book = mongoose.model('Book', bookSchema);

module.exports = Book;