require('dotenv').config();
const express=require('express');
const app=express();
const morgan=require('morgan');
const hbs=require('hbs');
const multer=require('multer');
const port = process.env.PORT || 3377;

app.set((__dirname));
app.set('view engine','hbs');
app.use('/uploads', express.static('uploads'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname == 'profilePic')
            cb(null,'./uploads/pics/');
        else
            cb(null,'./uploads/files/');
    },
    filename:(req,file,cb)=>{
        let filename= Math.floor( Math.random() * 100000);
        let fileExtension = file.originalname.split('.').pop();// של הסיומת שליפת הקובץ
        cb(null,filename+"."+fileExtension);
    }
});
const uploadFiles=multer({
    storage:storage
});
   
app.post("/register",uploadFiles.single("profilePic"),(req,res)=>{
    let parms = req.body;
    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
    res.status(200).json({fileUrl,parms});
});    


app.post('/contact',(req,res)=>{
  
    const to = req.body.email;
    const Fullname = req.body.fullname;
    const Phone = req.body.phone;
    const Content = req.body.content;

    const json = `{"fullname":"${Fullname}", "phone":"${Phone}", "content":"${Content}"}`;
    const body = JSON.parse(json);

    require('./emailsend').SendEmail(to,body);
    res.status(200).json({msg:"email send successfully"});

    return;

})



app.listen(port,()=>{
    console.log("server is on the air");
});


app.get('/emailsend',(req,res)=>{
    res.render('emailsend');
});
app.get('/',(req,res)=>{
    res.render('vocal');
});
app.get('/uploads',(req,res)=>{
    res.render('uploadfile');
});