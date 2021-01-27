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
  const fileName = (newName.split("..")[1]).slice(1)
  // 给文件名添加后缀
  fs.rename(file.path, newName, (err) => {
    if (!err) {
      file.url = `http://localhost:3000/article_cover/${fileName}`;
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
  let fileNameArr = []
  for (let i = 0; i < files.length; i++) {
    const newName = files[i].path + "/../" + new Date().getTime() + '_' + files[i].originalname
    const fileName = (newName.split("..")[1]).slice(1)
    fileNameArr.push(fileName)
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
  files = files.map((item, index) => ({
    ...item, url: `http://localhost:3000/album/${fileNameArr[index]}`
  }))
  return res.send({
    code: 0,
    data: {
      files
    }
  });
})


/* demo文件上传 */
const demo_upload = multer({ dest: __dirname + "/../uploads/demo" })
router.post('/pic/demo', demo_upload.array('file', 12), async (req, res) => {
  let files = req.files;

  let fileNameArr = []
  for (let i = 0; i < files.length; i++) {
    const newName = files[i].path + "/../" + new Date().getTime() + '_' + files[i].originalname
    const fileName = (newName.split("..")[1]).slice(1)
    fileNameArr.push(fileName)
    fs.rename(files[i].path, newName, (err) => {
      if (!err) {
      } else {
        return res.send({
          code: 999,
          data: {
            message: '上传文件出错'
          }
        });
      }
    })
  }
  files = files.map((item, index) => ({
    ...item, url: `http://localhost:3000/demo/${fileNameArr[index]}`
  }))
  return res.send({
    code: 0,
    data: {
      files
    }
  });

})

/* 用户头像上传 */
const avator_upload = multer({dest: __dirname+ "/../uploads/avatar"})
router.post('/pic/avatar' , avator_upload.single('file') ,async (req,res)=>{
  const file=req.file
  const newName=file.path + "/../" + new Date().getTime() + file.originalname
  const fileName=newName.split("..")[1].slice(1)
  fs.rename(file.path, newName,(err,data)=>{
    if(!err){
      file.url= `http://localhost:3000/avatar/${fileName}`
      return res.send({
        code: 0,
        data: {
          file
        }
      })
    }else{
      res.send({
        code: 999,
        data: {
          file
        }
      })
    }
  })
} )

module.exports = router;
