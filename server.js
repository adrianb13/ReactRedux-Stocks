const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//Create Routes
//const routes = require("./routes");

//Require Table Models for MySQL Database
let db = require("./models");

//Express uses only static assets in production
if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
//app.use(routes);

//Sync Options for MySQL
const syncOptions = { force: false };

//Send every request to React App 
//**Make sure all other routes are listed previous to this code
app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//Connection to Server as well as MySQL
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port http://localhost:${PORT}`);
  });
});