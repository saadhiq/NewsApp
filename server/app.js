require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "successfully fetched the data",
          data: response.data,
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "No more results to show",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        success: false,
        message: " Failed to fetch",
        error: error.message,
      });
    });
}
app.options("/all-news", cors());
app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

app.options("latest-news", cors());
app.get("latest-news", (req, res) => {
  let url = "http://localhost:8000/latest-results";
  fetchNews(url);
});

//top-headlines
app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "business";

  let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apikey=${API_KEY}`;
  fetchNews(url, res);
});

//country
app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;

  const country = req.params.iso;
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&apikey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
  fetchNews(url, res);
});

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
