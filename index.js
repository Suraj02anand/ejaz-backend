require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

const app = express()

// Middlewares
app.use(express.json())
app.use(bodyParser())
app.use(cors())

app.get("/" , ( req, res) => {
        res.send("Backend for mailer");
})

app.post("/sendMail", (req,res) => {

    // Fetching values from frontend.
    const { name , phone, email , message} = req.body;


    console.log("Received Request  ===> " , req.body);

    // Config Transporter
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        auth : {
            user: process.env.email,
            pass: process.env.password
        }
    })

    let status1 = false, status2 = false;

    // Sending mail to admin
    transporter.sendMail({
        from: "suraj02anand@gmaiil.com",
        to: "ejazahmed4688@gmail.com",
        subject : "Hey! You've got a new form response",
        html: `
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Message:</b> ${message}</p>
        `},(err) => {
            if(err){
                console.log(err)
                status1 = false;
            }
            else{
                console.log('Done')
                status1 = true;
            }
    })


    // Sending mail to form filler
    transporter.sendMail({
        from: "suraj02anand@gmaiil.com",
        to: `${email}`,
        subject : "Thanks for filling man!",
        html: `
            Thanks for filling up the form, Have a nice day!
        `},(err) => {
            if(err){
                console.log(err)
                status2 = false;
            }
            else{
                console.log('Done')
                status2 = true;
                res.status(200).json({"status" : true});
            }
    })



})

app.listen(process.env.PORT || 8000 , () => {
    console.log('Server is up and running')
})
