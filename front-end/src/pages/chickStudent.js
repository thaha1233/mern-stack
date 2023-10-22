import React, { useState } from "react";
import { Form, Button, Alert, Row, Col, InputGroup } from "react-bootstrap";
import { FaSearch, FaUser, FaIdCard, FaCalendar, FaInfoCircle, } from "react-icons/fa";
import './testStudent.css';


const ChickStudent1 = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/checkStudent/${identityNumber}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="CheckStudent" dir="rtl">
      <div className="container mt-5">
        <Row className="mb-4">
          <Col className="text-center">
            <h2>בדיקת תוקף</h2>
          </Col>
        </Row>

        <Form>
          <Row className="mb-4">
            <Col sm={8}>
              <Form.Group controlId="formIdentityNumber">
                <Form.Control
                  type="text"
                  placeholder="הזן מספר זהות"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Button id="btn-search" onClick={handleSearch} className="w-100">
                <FaSearch className="mr-2" />
                חיפוש
              </Button>
            </Col>
          </Row>
        </Form>

        {result && (
          <Alert variant={result.student ? 'success' : 'danger'} className="mt-4">
            <p id="result-student">{result.message}</p>
            {result.student && (
              <div>
                <Row className="mt-4">
                  <Col sm={3} className="text-center">
                    <FaUser size={40} className="mb-3" />
                    <p id="p-black">שם התלמיד:</p>
                    <p id="p-black">{result.student.fName} {result.student.lName}</p>
                  </Col>
                  <Col sm={3} className="text-center">
                    <FaInfoCircle size={40} className="mb-3" />
                    <p id="p-black">תאריך התחלה:</p>
                    <p id="p-black">{result.student.startValidity}</p>
                  </Col>
                  <Col sm={3} className="text-center">
                    <FaIdCard size={40} className="mb-3" />
                    <p id="p-black">שם האב:</p>
                    <p id="p-black">{result.student.fatherName}</p>
                  </Col>
                  <Col sm={3} className="text-center">
                    <FaCalendar size={40} className="mb-3" />
                    <p id="p-black">תאריך תפוגה:</p>
                    <p id="p-black">{result.student.endValidity}</p>
                  </Col>
                  <hr />
                  <h4 id="sec-chick">סעיפים</h4> <br />

                  <hr />
                  <Col sm={3} className="text-center">

                    <p id="p-black1"> על סולמות</p>
                    <p id="p-black1">{result.student.sec1}</p>
                  </Col>


                  <hr />

                  <Col sm={3} className="text-center">
                    <p id="p-black1"> מתוך סלים להרמת אדם</p>
                    <p id="p-black1">{result.student.sec2}</p>
                  </Col>

                  <hr />
                  <Col sm={3} className="text-center">
                    <p id="p-black1"> מתוך בימות הרמה מתרוממות ופיגומים ממוכנים</p>
                    <p id="p-black1">{result.student.sec3}</p>
                  </Col>

                  <hr />
                  <Col sm={3} className="text-center">
                    <p id="p-black1"> בתוך מקום מוקף</p>
                    <p id="p-black1">{result.student.sec4}</p>
                  </Col>

                  <hr />

                  <Col sm={3} className="text-center">
                    <p id="p-black1"> מעל לפיגומים נייחים</p>
                    <p id="p-black1">{result.student.sec5}</p>
                  </Col>
                  <hr />
                  <Col sm={3} className="text-center">
                    <p id="p-black1">  מעל גגות</p>
                    <p id="p-black1">{result.student.sec6}</p>
                  </Col>

                  <hr />
                  <Col sm={3} className="text-center">
                    <p id="p-black1">  מעל מבנה קונסטרוקציה</p>
                    <p id="p-black1">{result.student.sec7}</p>
                  </Col>
                  <hr />


                  <Col sm={3} className="text-center">
                    <p id="p-black1">בטיפול בעצים וגיזומם</p>
                    <p id="p-black1">{result.student.sec8}</p>
                  </Col>

                  <hr />
                  <Col sm={3} className="text-center">
                    <p id="p-black1">בהקמת בימות והתקנת מערכות תאורה והגברה</p>
                    <p id="p-black1">{result.student.sec9}</p>
                  </Col>

                </Row>
              </div>
            )}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ChickStudent1;
