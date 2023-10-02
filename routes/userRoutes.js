const express = require ("express")
const app = express();
const collection = require ("./Models/you-model")
const router = express.Router()

//create api 
app.post ("/post", async(req, res)=>{
    try {
      const yourdata = {
        name : req.body.name,
        email : req.body.email,
        date : req.body.date,
        age : req.body.age,
        intro : req.body.intro,
        experience : req.body.experience
      }
      console.log(yourdata);
      const data = new collection(yourdata);
      await data.save()
      return res.status(200).json({success: true, message:"You data is saved."})
    } catch (error) {
      console.log(error);
    }
  })
  //read 
  app.get("/api/get", async (req, res)=>{
    try {
      const data = await collection.find().sort({ createdAt : -1})
      return res.status(200).json({ success: true, data: data});
      } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false , error : error.message })
    }
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