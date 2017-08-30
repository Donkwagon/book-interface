const express = require('express');
const imp = express.Router();

const BOOK_COLLECTION = "books";

var ObjectID = require('mongodb').ObjectID;

var request = require('request');
var cheerio = require('cheerio');


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

////////////////////////////////////////////////////////////////////////////////
//Get user list
imp.get("/library", function(req, res) {

    crawlLibraryPage(0);

});

crawlLibraryPage = function(pageNum){
    var URL = 'https://read.douban.com/people/not_your_man/library?start=' + pageNum + '&sort=time&mode=grid';
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Cookie':'bid=Pvg4i4SQSYw; gr_user_id=26eaae22-30ef-4544-9721-b019ed1555d9; ct=y; ps=y; ll="108288"; dbcl2="43387531:jljcVJ1pHRE"; ck=nPhV; ap=1; _vwo_uuid_v2=C59C764FAC3032868E5AF181689734A8|e31c5e1f7d672ed25c65be3a6d373905; _ga=GA1.2.986235821.1502083962; _gid=GA1.2.1735521066.1504053368; push_noty_num=0; push_doumail_num=0; __utma=30149280.986235821.1502083962.1504055255.1504059054.17; __utmc=30149280; __utmz=30149280.1504055255.16.11.utmcsr=developers.douban.com|utmccn=(referral)|utmcmd=referral|utmcct=/wiki/; __utmv=30149280.4338; _pk_ref.100001.a7dd=%5B%22%22%2C%22%22%2C1504061149%2C%22https%3A%2F%2Fwww.douban.com%2Fgroup%2Fdbapi%2F%22%5D; _ga=GA1.3.986235821.1502083962; _gid=GA1.3.1760887556.1504035767; _pk_id.100001.a7dd=65d44f7d5b1ff516.1503086500.7.1504061318.1504056594.; _pk_ses.100001.a7dd=*',
            'referer':'https://read.douban.com/people/not_your_man/library',
            'Host':'read.douban.com'
        }
    },  function (error, response, html) {

        console.log(pageNum);
        console.log(response.statusCode);

        var books = [];

        $ = cheerio.load(html);
                
        $('.library-item').each(function(i, el) {
            var title = "";
            var coverImg = $('img', this).attr('data-src');
            var title = $('.rating-info', this).attr('data-article-title');
            var subtitle = $('.subtitle', this).text();
            var bookId = $('.rating-info', this).attr('data-rating-aid');
            var url_info = "https://read.douban.com" + $('.title', this).children('a').attr('href');
            var url_reader = $('.btn-read', this).attr('href');
            var bought_at = $('.bought-date', this).text();
            var authors = [];

            $('.author-item', this).each(function(i, el) {
                var author = {
                    name: $(this).text(),
                    url_search: "https://read.douban.com" + $(this).attr('href')
                }

                authors.push(author);
            });

            var book = {
                title:title,
                subTitle:subtitle,
                bookId:bookId,
                url_info:url_info,
                url_reader:url_reader,
                coverImg:coverImg,
                authors:authors,
                bought_at:bought_at,
            }

            books.push(book);
        });

        if(books.length > 0){
            
            db.collection(BOOK_COLLECTION).insertMany(books, function(err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });

            pageNum+=10;
            crawlLibraryPage(pageNum);
        }

    });

}

crawlBookInfoPage = function(bookId){

}


module.exports = imp;