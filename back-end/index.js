const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database connect with MongoDB
mongoose.connect(
  "mongodb+srv://bavya:Bavya18@cluster0.rlinlz0.mongodb.net/e-commerce"
);

//API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Creating Upload Endpoint for image
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Shema for creating products
// const product = mongoose.model("product", {
//     id: {
//         type: Number,
//         required:true,
//     },
//     name: {
//         type: String,
//         required:true,
//     },
//     image: {
//         type: String,
//         required:true,
//     },
//     category: {
//         type: String,
//         required:true,
//     },
//     new_price :{
//         type: Number,
//         required:true,
//     },
//     old_price :{
//         type: Number,
//         required:true,
//     },
//     date: {
//         type: Date,
//         default:Date.now,
//     },
//     avilable: {
//         type: Boolean,
//         default: true,
//     },
// })

// app.post('/addproduct', async (req,res) => {
//     const product = new product({
//         id: req.body.id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     });
//     console.log(product);
//     await product.save();
//     console.log("Saved");
//     res.json({
//         success: true,
//         name:req.body.name,
//     })
// })

const productSchema = new mongoose.Schema({
  id: {
      type: Number,
      required: true,
  },
  name: {
      type: String,
      required: true,
  },
  image: {
      type: String,
      required: true,
  },
  category: {
      type: String,
      required: true,
  },
  new_price: {
      type: Number,
      required: true,
  },
  old_price: {
      type: Number,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now,
  },
  available: {
      type: Boolean,
      default: true,
  },
});

const Product = mongoose.model('Product', productSchema);



app.post('/addproduct', async (req, res) => {
  try {
      const { id, name, image, category, new_price, old_price } = req.body;

      const product = new Product({
          id,
          name,
          image,
          category,
          new_price,
          old_price,
      });

      console.log(product);
      await product.save();
      console.log("Saved");
      res.json({
          success: true,
          name: req.body.name,
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});
