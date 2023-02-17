require('dotenv').config();
const express=require('express');
const app=express();
const morgan=require('morgan');
const hbs=require('hbs');
const port = process.env.PORT || 3377;

app.set((__dirname));
app.set('view engine','hbs');



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post('/raz/:email',(req,res)=>{
    console.log(req.params);
    res.status(200).json({msg:"fdssd"});
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