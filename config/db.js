const mongoose = require("mongoose");
  const MONGODB_LIVE_URI = "mongodb+srv://olujide500:sDVOUtqA6ry55Vw5@cluster0.ujzb8nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  mongoose.connect(MONGODB_LIVE_URI)
  mongoose.connection.on("open",() =>{
    console.log("Connected to Database")
})
.once("error", () =>{
  console.log("Faile to connect to database")
});

module.exports =mongoose
  
