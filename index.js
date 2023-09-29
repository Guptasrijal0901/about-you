const express = require ("express")
const { connectDatabase } = require ("./Connect/you-connect")
const collection = require ("./Models/you-model")
const path = require ("path")
const dotenv = require ("dotenv");
dotenv.config();


const app = express();
app.use(express.json());
app.get("/get" , (req, res)=>{
    res.json("api running")
})

// connectDatabase()
const PORT = process.env.PORT || 5000
connectDatabase();
app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/client/build/index.html"),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
);
 });
app.listen(PORT, async()=>{
    console.log(`Server is running at port ${PORT}`)
});
