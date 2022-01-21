//rendering page...

const router = require("express").Router(); 
const File = require("../models/files");

router.get("/:uuid", async (req, res) => {       //(res,req) gives error... do not interchange them ;)
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render("download", {
        error: "File not found or link expired",
      });
    }
    return res.render("download", {
      uuid: file.uuid,
      filename: file.originalfilename,
      filesize: `${Math.round((file.size)/1000)} KB`,
      downloadlink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong " });
  }
});

module.exports = router;
