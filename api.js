const axios = require("axios");
require("dotenv").config();
//goes through github to find the user
const api = {
  getUser(username) {
    return axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`
      )
      //thorws error if user can not be found
      .catch(err => {
        console.log(`User not found`);
        process.exit(1);
      });
  },
  //gets total star rating to put on card
  getTotalStars(username) {
    return axios
      .get(
        `https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
      )
      .then(response => {
        // After getting user, count all their repository stars
        return response.data.reduce((acc, curr) => {
          acc += curr.stargazers_count;
          return acc;
        }, 0);
      });
  }
};

module.exports = api;