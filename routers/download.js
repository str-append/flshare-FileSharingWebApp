//downloading...

const router = require("express").Router();
const File = require("../models/files");

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });  //mongoDB method for searching a file in database
  if (!file) {
    return res.render("download", {
      error: "Link has expired",
    });
  }
  const filepath = `${__dirname}/../${file.path}`;  //file path for downloading... its in uploads folder
  res.download(filepath);
});

module.exports = router;
