import React, { useState } from "react";
import moment from "moment";
import "./addstudent.css";
import { useNavigate } from "react-router-dom";

const AddStudentPage = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    fatherName: "",
    idd: "",
    birthDate: "",
    address: "",
    startValidity: "",
    profession: "",
    sec1: "",
    sec2: "",
    sec3: "",
    sec4: "",
    sec5: "",
    sec6: "",
    sec7: "",
    sec8: "",
    sec9: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    const isInvalid = isNaN(inputValue) || Number(inputValue) > 9;

    setFormData((prevFormData) => ({
      ...prevFormData,
      idd: inputValue,
      iddColor: isInvalid ? 'red' : 'green',
    }));

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      console.error("لم يتم اختيار ملف");
      return;
    }

    const formDataWithFile = new FormData();
    formDataWithFile.append("avatar", avatar);


    for (const key in formData) {
      if (key.startsWith("sec")) {
        formDataWithFile.append(key, formData[key]);
      } else {
        formDataWithFile.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:8080/addStudents", {
        method: "POST",
        body: formDataWithFile,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data);

        if (data.success) {
          navigate("/success");
        }
      } else {
        console.error("فشل في جلب البيانات");
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="text-center mb-4">הוסף תלמיד </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fName" id="label-addstudent" className="form-label">שם פרטי </label>
          <input
            type="text"
            required
            id="fName"
            name="fName"
            value={formData.fName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lName" id="label-addstudent" className="form-label">שם משפחה</label>
          <input
            required
            type="text"
            id="lName"
            name="lName"
            value={formData.lName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fatherName" id="label-addstudent" className="form-label"> שם האב</label>
          <input
            required
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="idd" id="label-addstudent" className="form-label">מספר תעודת זהות</label>
          <input
            required
            type="text"
            id="idd"
            name="idd"
            value={formData.idd}
            onChange={handleInputChange}
            className="form-control"
          />
  <div className={`counter ${formData.iddColor}`}>
        <span id="numbers">מספרים {formData.idd.length}/9</span>  
        </div>
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" id="label-addstudent" className="form-label">תאריך לידה </label>
          <input
            required
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" id="label-addstudent" className="form-label">כתובת</label>
          <input
            required
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="startValidity" id="label-addstudent" className="form-label">תוקף התחל </label>
          <input
            required
            type="date"
            id="startValidity"
            name="startValidity"
            value={formData.startValidity}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profession" id="label-addstudent" className="form-label">מקצוע</label>
          <input
            required
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="customAvatar" id="label-addstudent" className="form-label">תמונת סטודנט</label>
          <input
            required
            type="file"
            id="customAvatar"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <hr />
        <h4 id="sec-h1">סעיפים</h4> <br />
        <h5 id="sec-h5"> בתשובת סעיפים תענה כן או לא</h5>
        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">על סולמות</label>
          <input
            required
            type="text"
            id="sec1"
            name="sec1"
            value={formData.sec1}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">מתוך סלים להרמת אדם</label>
          <input
            required
            type="text"
            id="sec2"
            name="sec2"
            value={formData.sec2}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label"> מתוך בימות הרמה מתרוממות ופיגומים ממוכנים</label>
          <input
            required
            type="text"
            id="sec3"
            name="sec3"
            value={formData.sec3}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">בתוך מקום מוקף</label>
          <input
            required
            type="text"
            id="sec4"
            name="sec4"
            value={formData.sec4}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label"> מעל לפיגומים נייחים</label>
          <input
            required
            type="text"
            id="sec5"
            name="sec5"
            value={formData.sec5}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <hr />
        <div className="mb-3">
          <label id="label-addstudent" className="form-label">מעל גגות</label>
          <input
            required
            type="text"
            id="sec6"
            name="sec6"
            value={formData.sec6}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">מעל מבנה קונסטרוקציה</label>
          <input
            required
            type="text"
            id="sec7"
            name="sec7"
            value={formData.sec7}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">בטיפול בעצים וגיזומם</label>
          <input
            required
            type="text"
            id="sec8"
            name="sec8"
            value={formData.sec8}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <hr />

        <div className="mb-3">
          <label id="label-addstudent" className="form-label">בהקמת בימות והתקנת מערכות תאורה והגברה</label>
          <input
            required
            type="text"
            id="sec9"
            name="sec9"
            value={formData.sec9}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" id="btn-submit">שלח</button>
      </form>

      {responseMessage && (
        <div
          className={`alert ${responseMessage.success ? "alert-success" : "alert-danger"} mt-4`}
        >
          {responseMessage.message}
        </div>
      )}
    </div>
  );
};

export default AddStudentPage;
