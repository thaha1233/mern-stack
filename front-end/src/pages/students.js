import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './students.css';
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const Students = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(15);

  useEffect(() => {
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
    fetchAllData();
  }, []);

  const filteredData = dataUsers.filter(student => {
    
    if (student.idd != null) {
      return student.idd.includes(searchTerm);
    }
    return false;
  });
  

  
  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const generatePDF = async () => {
    const pdf = new jsPDF();
  
    pdf.text('Table students:', 10, 10);
  
    const table = document.getElementById('responsive-data-table');
  
    const canvas = await html2canvas(table);
  
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);
  
    pdf.save('students.pdf');
  };
  


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
      <button id="orther" onClick={generatePDF}>   קובץ הסטודנטים pdf</button>

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
                  
                <button id="orther" onClick={() =>
                    navigate('/view', {
                      state: {
                        fName: student.fName,
                        lName: student.lName,
                        fatherName: student.fatherName,
                        idd: student.idd,
                        birthDate: student.birthDate,
                        address: student.address,
                        startValidity: student.startValidity,
                        endValidity: student.endValidity,
                        profession: student.profession,
                        imgUser: student.imgUser,
                        sec1:student.sec1,
                        sec2:student.sec2,
                        sec3:student.sec3,
                        sec4:student.sec4,
                        sec5:student.sec5,
                        sec6:student.sec6,
                        sec7:student.sec7,
                        sec8:student.sec8,
                        sec9:student.sec9,
                      },
                    })
                  }>הצג פרטים</button>
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

export default Students;
