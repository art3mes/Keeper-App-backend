const express = require("express");
const cors =require ("cors");           //to enable access from multiple domains
const bodyParser =require("body-parser");
const mongoose=require("mongoose");

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb+srv://admin-arty:admin-arty@cluster0.569qwxi.mongodb.net/KeeperApp');
const noteSchema={                               
    title:String,
    content:String
};

const Note=mongoose.model('Note',noteSchema);

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get("/",function(req,res){
    res.send("yes")
}); 

app.post("/data", function(req,res){
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
            note.save();  //saving the made list to db
            res.redirect("/"); //redirect to current directory
        }
    });                   
});

app.listen(4000,function(){
    console.log("server is running");
});