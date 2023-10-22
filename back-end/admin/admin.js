var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://backuptaha932:1my1tTzhwjuIyJtm@cluster0.5dntfz6.mongodb.net/?retryWrites=true&w=majority";
var bcrypt = require('bcrypt');
var moment = require('moment');
var multer = require('multer');
var upload = multer();
const { ObjectId } = require('mongodb');
const fs = require('fs');


router.post('/adminlogin', function (req, res) {    //API => http://localhost:8080/admin/adminlogin
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Failed to connect to MongoDB' + err);
      res.status(404).json({ err: 'Failed to connect to MongoDB' });
      return;
    }

    var {
      userName,
      password
    } = req.body;

    var dbo = db.db('student-management-system')
    dbo.collection("adminLogin").findOne({ userName }, function (err, result) {
      if (err) {
        console.log('Failed to connect to MongoDB' + err);
        res.status(500).json({ err: 'Failed to connect to MongoDB' });
        return;

      }

      if (!result) {
        console.log('Incorrect username ');
        res.json({ success: false, msg: 'שם המשתמש שגוי', });
        return;
      }
      bcrypt.compare(password, result.password, function (err, result) {
        if (err) {
          console.log('err bcrypt :' + err);
          res.send('err bcrypt :' + err);
          return;
        }

        else if (!result) {
          console.log('The password is incorrect. Please try again.');
          res.json({ success: false, msg: 'שגיאת סיסמה, נסה שוב', });
          return;
        }

        console.log('Login successful');
        res.json({ success: true, msg: 'Login successful', });
        db.close();
      });
    });
  });
});



router.delete('/deleteStudent/:id', async (req, res) => {  //API => http://localhost:8080/admin/deleteStudent

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    const deleteObject = { _id: ObjectId(req.params.id) };

    db.db("student-management-system").collection("student").findOne(deleteObject, function (err, student) {
      if (err) throw err;

      if (student) {
        const imagePath = `C:/Users/tahaa/OneDrive/Desktop/aiman students/front-end/public/imgUsers/imgs/${student.imgUser}`;

        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log('Failed to delete the image file:', unlinkErr);
            } else {
              console.log('Image file deleted successfully!' + imagePath);
            }
          });
        } else {
          console.log('Image file not found:', imagePath);
        }

        db.db("student-management-system").collection("student").deleteOne(deleteObject, function (err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          res.send("1 document deleted");
          db.close();
        });
      } else {
        console.log('student not found');
        db.close();
      }
    });
  });
});


 router.get('/students', async (req, res) => { //API => http://localhost:8080/admin/students

  let client;

  try {
    client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });

    const dbo = client.db('student-management-system');
    const result = await dbo.collection('student').find({}).toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.json(result);
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    if (client) {
      client.close();
    }
  }
});


router.get('/checkStudent/:identityNumber', (req, res) => {   //API => http://localhost:8080/admin/checkStudent

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Failed to connect to MongoDB' + err);
      res.status(404).json({ err: 'Failed to connect to MongoDB' });
      return;
    }
    const identityNumber = req.params.identityNumber;

    const dbo = db.db("student-management-system");

    const collection = dbo.collection("student");

    collection.findOne({ idd: identityNumber }, (err, student) => {
      if (err) {
        res.send('Failed to connect to MongoDB' + err);
        console.log('Failed to connect to MongoDB' + err);

      }
      else if (student) {
        const currentDate = moment();
        const endValidityDate = moment(student.endValidity, 'MM/DD/YYYY');

        if (endValidityDate.isBefore(currentDate)) {
          // const message = 'סיום תוקף פרטי התלמיד ';
          const message = 'סיום תוקף פרטי התלמיד לחידוש נא להתקשר: 046335323 ';

          console.log(message);
          res.json({ message, student: null });
        } else {
          const message = 'תוקף זמין';
          console.log(message);
          res.json({ message, student });
        }
      } else {
        const message = 'לא נמצא מספר זהות';
        console.log(message);
        res.json({ message, student: null });
      }
    });
  });
});





//export this router to use in our index.js
module.exports = router;