var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//https://www.w3schools.com/nodejs/nodejs_email.asp
function sendEmail(email)
{
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'music.app.adm123@gmail.com',
    pass: 'music.app.ADM123'
  }
});

var mailOptions = {
  from: 'music.app.adm123@gmail.com',
  to: email,
  subject: 'Comentariu APaX',
  text: 'Comentariul tau a fost inregistrat, multumim pentru timpul acordat!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
async function insert(email,nume,comentariu, callBack) {
    const client = new MongoClient(url, {useUnifiedTopology: true});

    try {
        await client.connect();
        var comentariuJson = "{ ";
        if (!email)
        return callBack(0);
        else
          {  comentariuJson = comentariuJson + "\"EMAIL\" : \"" + email + "\" , "; }
        if (!nume)
        return callBack(0);
        else
          {  comentariuJson = comentariuJson + "\"NUME\" : \"" + nume + "\" , "; }
          if (!comentariu)
          return callBack(0);
          else
            {  comentariuJson = comentariuJson + "\"COMENTARIU\" : \"" + comentariu + "\""; }
         comentariuJson = comentariuJson + "}";
        console.log(comentariuJson)
        comentariuJson = JSON.parse(comentariuJson);
       

        client.db("TW").collection('comentarii').insertOne(comentariuJson, function(err, res) {  
            if (err) throw err;  
            client.close();  
            return callBack(1);
            });  
       
    } catch (e) {
        console.error(e);
    }
}

module.exports = {insert,sendEmail}
