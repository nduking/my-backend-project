// installed// Import the packages we installed
const express = require("express");
const mongoose=require('mongoose');
const cors=require('cors');

// application// Create our Express application
const app=express();

// request)// Set up middleware (code that runs for every request)
app.use(cors()); //Allow requests from other websites
app.use(express.json());//understand JSON data in requests


// Define the port our server will listen on
const PORT=process.env.PORT||5000;

// Create a simple route (URL endpoint)
app.get('/',(req,res)=>{
    res.json({message:'Hello! Your backend server is running!'});
});

//Start the server
app.listen(PORT, ()=>{
    console.log('Server is running on port ${PORT}');
});