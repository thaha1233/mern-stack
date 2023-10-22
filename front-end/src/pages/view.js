import React from 'react';
import './view.css';
import { useLocation } from 'react-router-dom';

const View = () => {
  const location = useLocation();
  const {
    fName,
    lName,
    fatherName,
    idd,
    birthDate,
    address,
    startValidity,
    endValidity,
    profession,
    imgUser,
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    sec7,
    sec8,
    sec9,
  } = location.state || {};


  return (
    <div dir='rtl'>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">שם פרטי</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>

                        {fName}

                      </h6>

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">שם המשפחה</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>

                        {lName}
                      </h6>


                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">שם האב</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>
                        {fatherName}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">תעודת זהות</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>
                        {idd}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">תאריך לידה</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>
                        {birthDate}
                      </h6>

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">כתובת</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>
                        {address}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id='h6-view' className="mb-0">מקצוע</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <h6 id='h6-view'>
                        {profession}
                      </h6>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">על סולמות</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec1}
                      </h6>
                    </div>
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0"> מתוך סלים להרמת אדם</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec2}
                      </h6>
                    </div>

                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0"> מתוך בימות הרמה מתרוממות ופיגומים ממוכנים</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec3}
                      </h6>
                    </div>

                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">בתוך מקום מוקף </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec4}
                      </h6>
                    </div>

                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">מעל לפיגומים נייחים</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec5}
                      </h6>
                    </div>

                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">מעל גגות</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec6}
                      </h6>
                    </div>

                  </div>


                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">מעל מבנה קונסטרוקציה
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec7}
                      </h6>
                    </div>

                  </div>


                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">  בטיפול בעצים וגיזומם
                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec8}
                      </h6>
                    </div>

                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 id="sec-page" className="mb-0">  בהקמת בימות והתקנת מערכות תאורה והגברה

                      </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                      <h6 id='h6-view'>
                        {sec9}
                      </h6>
                    </div>

                  </div>

                </div>


              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={`/imgUsers/imgs/${imgUser}`}
                      // className="rounded-circle"
                      width={250}
                    />
                    <div className="mt-3">
                      <h4>{fName} {lName}</h4>
                      <p id='p-view' className="text-secondary mb-1"> התחל תוקף: {startValidity}</p>
                      <p id='p-view' className="text-muted font-size-sm"> סוף תוקף: {endValidity}</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
