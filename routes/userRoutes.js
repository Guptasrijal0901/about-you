const express = require ("express")
const collection = require ("../Models/you-model")
const router = express.Router()

//create api 
router.post ("/post", async(req, res)=>{
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
  router.get("/api/get", async (req, res)=>{
    try {
      const data = await collection.find().sort({ createdAt : -1})
      return res.status(200).json({ success: true, data: data});
      } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false , error : error.message })
    }
  })
  // get single user
  router.get("/api/single/:id", async (req, res)=>{
    // url se id bhaar nikalne k liye req.params use karte hai or input field se bhaar nikalne k liye req.body
    const {id} = req.params;
    try {
      const singleuser = await collection.findById({_id : id})
      return res.status(200).json({ success: true, singleuser});
      } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false , error : error.message })
    }
  })
  // delete
  router.delete("/delete/:id", async (req, res)=>{
    const {id} =  req.params;
    try {
      const deleteyou = await collection.findByIdAndDelete({_id: id})
      return res.status(200).json({ success: true, deleteyou});
      } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false , error : error.message })
    }
  })
  //update
  router.patch("/edit/:id", async (req, res)=>{
    // here we want to get id and body as well 
    const {id} =  req.params;
    const {name, email, date, age, intro, experience} = req.body
    console.log("get body", req.body)
    console.log("get id", id)
    try {
      const updateyou = await collection.findByIdAndUpdate(id, req.body,{
        new: true
      })
      return res.status(200).json({ success: true, updateyou});
      } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false , error : error.message })
    }
  })

module.exports = router;