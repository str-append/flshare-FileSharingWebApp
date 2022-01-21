//uploading/mail sending...

const router = require("express").Router();
const multer = require("multer"); //middleware for file handling
const path = require("path"); //in-built module path.extname()
const File = require("../models/files");
const { v4: uuid4 } = require("uuid"); //generates uuid

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    //a Unique name generator since file name must be unique
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage, //same as storage:storage;
  limit: { fileSize: 100000 * 100 },
}).single("myfile"); //same name to be given as given by user

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    //validate request
    if (!req.file) {
      return res.json({ error: "Error" }); //used Multer for file handlling
    }
    //Store file
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //Store in Database
    console.log("running in file.js in routers -\\/ \n",req.file);
    const file = new File({
      filename: req.file.filename,
      originalfilename: req.file.originalname,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save(); //saves the file doceument

    //Response -> link
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});



//email sending using nodemailer
router.post("/send", async (req, res) => {
  const { uuid, to, from } = req.body;
  if (!uuid || !to || !from) {
    return res.status(422).send({ error: "all fields are required" });
  }
  const file = await File.findOne({ uuid: uuid });
  // if (file.sender) {
  //   return res.send("Email Already Send");
  // }

console.log(to);
console.log(from);

  file.sender = from;
  file.receiever = to;   //spelling mistake here not reciver its receiver ;)

  const response = await file.save();

  const sendmail = require("../services/emailservice");
  sendmail({
    from: from,
    to: to,
    subject: "flShare File Share",
    text: `${from} sent a file with you`,
    html: require("../services/emailtemplate")({
      emailFrom: from,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: `${parseInt(file.size / 1000)} KB`,
      expires: "24 Hours",
    }),
  });
  return res.send({sucess: 'true'})
});

module.exports = router;
