const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://localhost:27017/PROJECTB', {useNewUrlParser: true , useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
// app.use(express.static("public"));


let bookSchema = new mongoose.Schema({
    name:String,
    imgurl:String,
    desc:String
});

let books = mongoose.model("books",bookSchema);

// books.create(
//     {
//         name:"Berlcok",
//         imgurl:"https://i.chzbgr.com/full/4462870016/h48F4CC7E/wat-da-fack",
//         description:"Lock"
//     },function(error,fakeniw){
//                  if(error){
//                      console.log("Error");
//                  }
//                  else{
//                      console.log("Added");
//                      console.log(fakeniw);
//                  }
// })




app.get("/",function(req,res){
    res.render("index")
});

app.get("/book",function(req,res){
    books.find({},function(error,ALLData){
        if(error){
            console.log(error)
        }
        else{
            res.render("landing",{SongMa:ALLData})
        }
    })
});

app.get("/book/new",function(req,res){
    res.render("addnewbook");
})

app.post("/book", function(req, res){
    let n_name = req.body.name;
    let n_imgurl = req.body.imgurl;
    let n_desc = req.body.desc;
    let schema_post = {name:n_name,imgurl:n_imgurl,desc:n_desc};
    books.create(schema_post,function(err,newdata){
        if(err){
            console.log(err);
        }
        else{
            console.log(newdata);
            res.redirect("/book");
        }
    })
});
app.get("/register",function(req,res){
    res.render("register")
});

app.post("/register",function(req,res){
    console.log(req.body.name);
});

app.get("/book/login",function(req,res){
    res.render("login")
});


app.get("/book/:id",function(req,res){
    books.findById(req.params.id,function(error,idbook){
        if(error){
            console.log(error)
        }
        else{
            res.render("showdetail",{detail:idbook});
        }
    })
})


app.listen(2999, function(req,res){
    console.log("Hello Boi!!")
})
