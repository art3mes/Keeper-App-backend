const express = require("express");
const cors =require ("cors");           //to enable access from multiple domains
const bodyParser =require("body-parser");
const mongoose=require("mongoose");
require('dotenv').config();

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect(process.env.DB_URL)
.then(()=>console.log("DB connected"))
.catch(err=>console.log(err));
const noteSchema={                               
    title:String,
    content:String
};

const Note=mongoose.model('Note',noteSchema);
let noteArray=[];

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/",function(req,res){
    Note.find().then(function(foundNote){       //printing the items stored in the backend to the console
        //console.log(foundNote);
        const foundNoteJSON = JSON.stringify(foundNote);
        //console.log(foundNoteJSON)
        noteArray=foundNoteJSON;
        res.send(noteArray);
    });
    //console.log(noteArray);
    
}); 

app.post("/", function(req,res){
    const titleName=req.body.title;
    const contentData=req.body.content;
    //console.log(titleName," ",contentData);
    Note.findOne({title:titleName }).then((foundNote)=>{
        if(!foundNote){
            //make a new list
            const note =new Note({          //creating new list whenever new custom list is called
               title:titleName,
               content:contentData
            });
            note.save()  //saving the made list to db
            .then(()=>console.log("data saved"))
            .catch(err=>console.log(err));
            res.redirect("/"); //redirect to current directory
        }
    });                   
});

app.listen(process.env.ROOT||4000,function(){
    console.log("server is running");
});