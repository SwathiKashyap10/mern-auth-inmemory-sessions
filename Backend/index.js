const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const {main} = require("./db");

const protect = require("./middelware/protected")

// routes 
const userRoute = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Allow only your frontend origin & enable credentials
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
  })
);

app.get("/",(req,res)=>{
    res.json({message:"hello"})
})

app.get("/protected",protect,(req,res)=>{
  res.send("this is protected route");
})

app.use("/user",userRoute);


const server = () => {
    //mongodb connection
    main().then(()=>{
        console.log("Database connection successful");
        // Start Node.js server after DB connection is established
        app.listen(process.env.PORT_NO,()=>{
           console.log(`server is listening at post ${process.env.PORT_NO}`)
        })
    }).catch((err)=>{
        console.error("Database connection failed:", err);
        process.exit(1);  // Exit process if DB connection fails
    });
}
server();
