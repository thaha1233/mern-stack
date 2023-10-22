var express = require('express');
var app = express();
 const port = process.env.PORT || 8080;
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');
const cors = require('cors');
var moment = require('moment');

app.use(cors());
const { MongoClient } = require('mongodb');
var url = "mongodb+srv://backuptaha932:1my1tTzhwjuIyJtm@cluster0.5dntfz6.mongodb.net/?retryWrites=true&w=majority";

// CORS Headers => Required for cross-origin/ cross-server communication
//this for set data to front end react to Allow
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'PUT,GET, POST, PATCH, DELETE');

  next();
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
//  app.use(upload.array());
//  app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/tahaa/OneDrive/Desktop/aiman students/front-end/public/imgUsers/imgs');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload1 = multer({ storage: storage });

app.post('/addStudents', upload1.single('avatar'), async (req, res) => {  //API => http://localhost:8080/addStudents/
  try {
    MongoClient.connect(url, async (err, db) => {
      if (err) {
        console.log('Failed to connect to MongoDB' + err);
        res.status(404).json({ success: false, message: 'Failed to connect to MongoDB' });
        return;
      }

      const dbo = db.db('student-management-system');

      const avatar = req.file;


      console.log('Avatar filename:', avatar.filename);

      const birthDate = req.body.birthDate;
      const endValidity = moment().add(2, 'years').subtract(1, 'day').format('YYYY-MM-DD');

      const info = {
        fName: req.body.fName,
        lName: req.body.lName,
        fatherName: req.body.fatherName,
        idd: req.body.idd,
        birthDate: birthDate,
        address: req.body.address,
        startValidity: req.body.startValidity,
        endValidity: endValidity,
        profession: req.body.profession,
        imgUser: avatar.filename,
        sec1: req.body.sec1,
        sec2: req.body.sec2,
        sec3: req.body.sec3,
        sec4: req.body.sec4,
        sec5: req.body.sec5,
        sec6: req.body.sec6,
        sec7: req.body.sec7,
        sec8: req.body.sec8,
        sec9: req.body.sec9,

      };

      await dbo.collection('student').insertOne(info);
      console.log('1 document inserted');
      db.close();

      // Return success message
      res.json({ success: true, message: 'Insert Successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


var admin = require('./admin/admin.js');
var adminlogin = require('./admin/admin.js');
var addStudents = require('./admin/admin.js');
var getStudents = require('./admin/admin.js');
var checkStudent = require('./admin/admin.js');
var senduser = require('./admin/admin.js');
var deleteStudent = require('./admin/admin.js');
var updateStudent = require('./admin/admin.js');
var deleteStudentImg = require('./admin/admin.js');

app.use('/admin', admin);
app.use('/adminlogin', adminlogin);
app.use('/addStudents', addStudents);
app.use('/students', getStudents);
app.use('/checkStudent', checkStudent);
app.use('/senduser', senduser);
app.use('/deleteStudent', deleteStudent);
app.use('/updateStudent', updateStudent);
app.use('/deleteStudentImg', deleteStudentImg);

app.get('/test', (req, res) => {

  res.send(`hello taha Server is running on port ${port}`);
})

app.get('/', (req, res) => {

  res.send(`Server is running on port ${port}`);
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});