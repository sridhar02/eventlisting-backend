require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const fs = require("fs").promises;

//middleware
app.use(cors());
app.use(express.json()); //req.body

async function getAllConferences() {
  try {
    const response = await axios.get(`${process.env.API_URL}`);
    const data = response.data;
    const allConferences = data.paid.concat(data.free);
    let ConferencesList = "";
    allConferences.forEach((conference,index) => {
      ConferencesList += `${index+1}\. ${conference.confName}, ${conference.confStartDate},${conference.city},${conference.country},${conference.entryType},${conference.confUrl}\n`;
    });
    console.log(ConferencesList);
    return fs.writeFile("conferences.csv", ConferencesList);
  } catch (error) {
    response.status(500);
  }
}

getAllConferences();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
