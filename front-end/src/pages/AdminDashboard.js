import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './AdminDashboard.css';
import { Link } from "react-router-dom";
import { FaIdCard, FaEdit } from 'react-icons/fa';



function AdminDashboard() {
  const [dataUsers, setDataUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);


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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = dataUsers.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPageCount = Math.ceil(dataUsers.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div dir="rtl">
      <Container id='Container-card'>
        <Row>
          <Col md={4} xl={3}>
            <Card id='card-1' text="white" className="mb-2">
              <Card.Body>
                <Card.Title>
                  <i id='icon-card' className="fa fa-user"></i>
                  מספר סטודנטים
                </Card.Title>
                <h2 className="text-right">
                  <span id="num-s">{dataUsers.length}</span>
                </h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} xl={3}>
            <Card id='card-2' text="white" className="mb-2">
              <Card.Body>
                <Card.Title>
                  <i id='icon-add' className="fa fa-plus"></i>
                  הוסף תלמיד
                </Card.Title>

                <h2 className="text-right">
                  <Link id="card-link" to='/addstudent'>לחץ כאן</Link>
                </h2>
              </Card.Body>
            </Card>
          </Col>


          <Col md={4} xl={3}>
            <Card id='card-3' text="white" className="mb-2">
              <Card.Body>
                <Card.Title>
                  <i id='icon-card' className="fa fa-id-card"></i>
                  בדיקת תוקף                </Card.Title>
                <h2 className="text-right">
                  <Link id="card-link" to='/ChickStudent1'>לחץ כאן</Link>
                </h2>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} xl={3}>
            <Card id='card-4' text="white" className="mb-2">
              <Card.Body>
                <Card.Title>
                <FaEdit id='icon-card' /> תיקון פרטים
                </Card.Title>
                <h2 className="text-right">
                
                  <Link id="card-link" to='/edstudents'>
                    לחץ כאן
                  </Link>
                </h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <hr />
      <h1 className='header-tabls' > סטודנטים<i id='icon-tabls' className="fa fa-user"></i></h1>
      <table id="responsive-data-table" className="table dt-responsive nowrap">
        <thead>
          <tr>
            <th>שם</th>
            <th>משפחה</th>
            <th>שם האב</th>
            <th>מספר תעודת זהות</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={uuidv4()}>
              <td>{student.fName}</td>
              <td>{student.lName}</td>
              <td>{student.fatherName}</td>
              <td>{student.idd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">


        {Array.from({ length: totalPageCount }).map((_, index) => (
          <Button
            key={index}
            id="btn-nextPage"
            onClick={() => paginate(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}


      </div>
    </div>
  );
}

export default AdminDashboard;
