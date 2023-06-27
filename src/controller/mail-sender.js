import nodemailer from 'nodemailer'
import handlebars from "handlebars";
import fs from 'fs';


const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: 'hicoders_hrms@zohomail.eu',
    pass: "MysHH3h!zwjSex!"
  }
});

const sendMail = async (mParams)=>{

  const source = fs.readFileSync("./src/mailtemplate/" + mParams.html.templateName, 'utf-8').toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(mParams.html.params);

  const info = await transporter.sendMail({
    from: mParams.from,
    to: mParams.to,
    subject: mParams.subject,
    text: mParams.text,
    html: htmlToSend
  });

  console.log('Message sent: %s', info.messageId);
  return info;

}

export default sendMail;