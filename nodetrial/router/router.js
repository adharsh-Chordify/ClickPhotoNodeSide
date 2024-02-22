const express=require('express')
const router=express.Router()
const midllewares=require('../middlewares/jwtmiddleware')
const Joi=require('joi')
const validator=require('express-joi-validation').createValidator()
const multer=require('multer')
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, img, callback) {
      const timestamp = Date.now(); // Get the current timestamp
      // Assuming img.originalname contains the original filename
      const uniqueFilename = `${timestamp}-${img.originalname}`;
      callback(null, uniqueFilename);
    }
  });
  
  const upload = multer({ storage: storage });

const registerSchema=Joi.object({
    Email:Joi.string().email().required(),
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    Password:Joi.string().min(3).max(8).required()
})




const functionApi=require('../controller/controller')


router.post('/adduser',upload.single('img'),validator.body(registerSchema),functionApi.Register)

router.post('/adddata',upload.single('img'),midllewares  ,functionApi.post)
router.post('/login',functionApi.Login)
router.get('/getall',functionApi.getAll)
router.get('/getIndvitual/:uuid',midllewares,functionApi.getIndivitualdata)
router.post('/updatepost',upload.single('img'),midllewares,functionApi.updateData)
router.get('/deletepost/:id',midllewares,functionApi.DeletePost)
router.get('/editpost/:id',functionApi.EditFunction)
router.post('/forgotpassword',functionApi.ForgotPassword)
router.get('/getuser',functionApi.searchUser)


module.exports=router