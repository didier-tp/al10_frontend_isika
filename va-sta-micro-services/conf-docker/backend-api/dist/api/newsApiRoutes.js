"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MongoNewsDataService_1 = require("../core/mongo/MongoNewsDataService");
const apiHandler_1 = require("./apiHandler");
var newsService = new MongoNewsDataService_1.MongoNewsService();
exports.newsApiRouter = express_1.Router();
// http://localhost:8282/news-api/public/news renvoyant tout [ {} , {}]
// http://localhost:8282/news-api/public/news?... renvoyant [{}] selon critere
exports.newsApiRouter.route('/news-api/public/news')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    //let  critereXy = req.query.critereXy;
    let newsArray = await newsService.findAll();
    return newsArray;
}));
