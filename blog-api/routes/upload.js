var express = require("express");
var router = express.Router();
var multer = require("multer");
const fs = require("fs");
const Path = require("path");

/* 文章封面图上传. */
const cover_upload = multer({ dest: __dirname + "/../uploads/article_cover" });
router.post("/pic/article", cover_upload.single("file"), (req, res) => {
  const file = req.file;
  const newName = file.path + "/../" + new Date().getTime() + '_' + file.originalname
  // 给文件名添加后缀
  fs.rename(file.path, newName, (err) => {
    if (!err) {
      file.url = `http://localhost:3000/article_cover/${newName.split("..")[1]}`;
      return res.send({
        code: 0,
        data: {
          file
        }
      });
    } else {
      return res.send({
        code: 999,
        data: {
          file
        }
      });
    }
  });
});

/* 相册图片上传 */
const album_upload = multer({ dest: __dirname + "/../uploads/album" });
router.post('/pic/album', album_upload.array('file', 12), async (req, res) => {
  let files = req.files;
  let fileNameArr=[]
  for (let i = 0; i < files.length; i++) {
    const newName = files[i].path + "/../" + new Date().getTime() + '_' + files[i].originalname
    fileNameArr.push(newName.split("..")[1])
    fs.rename(files[i].path, newName, (err) => {
      if (!err) {
      } else {
        return res.send({
          code: 999,
          data: {
            message: '上传图片出错'
          }
        });
      }
    })
  }
  files=files.map((item,index)=>({
    ...item,url: `http://localhost:3000/album/${fileNameArr[index]}`
  }))
  return res.send({
    code: 0,
    data: {
      files
    }
  });
})

module.exports = router;
