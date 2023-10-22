import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './students.css';
import { Button } from "react-bootstrap";
import 'jspdf-autotable';

const Editstudent = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(15);

  useEffect(() => {

    fetchAllData();
  }, []);
  async function fetchAllData() {
    try {
      const responseUsers = await fetch('http://localhost:8080/admin/students');

      if (responseUsers.ok) {
        const usersData = await responseUsers.json();
        setDataUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const responseStudent = await fetch(`http://localhost:8080/admin/deleteStudent/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (responseStudent.ok) {
        alert('נמחק בהצלחה')
        fetchAllData();
  
        return;
      }
      
      if (!responseStudent.ok) {
        console.error('فشل في حذف الطالب');
        return;
      }

      fetchAllData();
    } catch (error) {
      console.error('خطأ في حذف الطالب والصورة:', error);
    }
  };



const filteredData = dataUsers.filter(student => {

  if (student.idd != null) {

    return student.idd.includes(searchTerm);

  }
  return false;
});



  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div dir="rtl" className="container-table">
      <h1 className='header-tabls'>סטודנטים<i id='icon-tabls' className="fa fa-user"></i></h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder=" חפש לפי מספר תעודת זהות"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length > 0 ? (
        <table id="responsive-data-table" className="table dt-responsive nowrap">

          <thead>
            <tr>
              <th>שם</th>
              <th>משפחה</th>
              <th>שם האב</th>
              <th>מספר תעודת זהות</th>
              <th>כתובת</th>
              <th>תוקף עד</th>
              <th>אחר</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id || uuidv4()}>
                <td>{student.fName}</td>
                <td>{student.lName}</td>
                <td>{student.fatherName}</td>
                <td>{student.idd}</td>
                <td>{student.address}</td>
                <td>{student.endValidity}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(student._id)}>
                  <i className="fas fa-trash"></i> 
                  </Button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
        <p id="err-stu">אין תלמיד עם תעודת זהות זו</p>
      )}

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredData.length / studentsPerPage) }).map(
          (item, index) => (
            <Button id="btn-nextPage" key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
}


export default Editstudent;          