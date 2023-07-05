const express = require("express");
const cors =require ("cors");           //to enable access from multiple domains
const bodyParser =require("body-parser");

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.listen(4000,function(){
    console.log("server is running");
});