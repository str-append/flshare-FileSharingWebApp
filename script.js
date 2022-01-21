const connectDB = require("./config/db");
const File = require("./models/files");
const fs = require("fs");

connectDB();

async function deleteData() {
  const pastdate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log(`date : ${Date.now()}`);
  console.log(`past Date : ${pastdate}`);
  const files = await File.find({ createdAt: { $lt: pastdate } });
  //   if (files.length) {
  //     for (const file of files) {
  //       console.log(file);
  //     }
  //   }

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`File removed succesfully ${file.filename}`);
      } catch (err) {
        console.log(`error in deleting ${err}`);
      }
    }
  }
}

deleteData().then(process.exit);
