import { useContext, useEffect, useState } from "react";
import MentorContext from "../contexts/mentors/mentorContext";
import AlertContext from "../contexts/alert/alertContext";
import AuthContext from "../contexts/auth/authContext";

import Button from "../components/layout/Button";
import Student from "../components/layout/Student";

const Marks = () => {
  const mentorContext = useContext(MentorContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { fetchAssigned, Assigned, updateMarks, lock } = mentorContext;
  const { setAlert } = alertContext;
  const { user } = authContext;

  const [edit, setEdit] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAssigned();
    setStudents(JSON.parse(JSON.stringify(Assigned)));
  }, []);

  useEffect(() => {
    setStudents(JSON.parse(JSON.stringify(Assigned)));
  }, [Assigned]);

  useEffect(() => {}, [students]);

  const save = () => {
    if(students.length < 3 || students.length > 4){
      setAlert("Please assign 3 or 4 students", "danger");
      return;
    }
    
    updateMarks({ students });
    setEdit(false);
    setAlert("Saved", "success");
  };

  const cancel = () => {
    setStudents(JSON.parse(JSON.stringify(Assigned)));
    setEdit(false);
  };

  const onChange = (e, student) => {
    const i = students.indexOf(student);
    let temp = [...students];
    temp[i].Grades[e.target.name] = e.target.value;
    console.log(temp);
    setStudents(temp);
  };

  const onLock = () => {
    if(students.length < 3 || students.length > 4){
      setAlert("Please assign 3 or 4 students", "danger");
      return;
    }
    
    // Check if a grade for any student is null or -1
    for (let i = 0; i < students.length; i++) {
      if (
        students[i].Grades.Execution === null ||
        students[i].Grades.Execution === "-1"
      ) {
        setAlert(
          "Execution grade is not assigned for " + students[i].Name,
          "danger"
        );
        return;
      }
      if (
        students[i].Grades.Ideation === null ||
        students[i].Grades.Ideation === "-1"
      ) {
        setAlert(
          "Ideation grade is not assigned for " + students[i].Name,
          "danger"
        );
        return;
      }
      if (
        students[i].Grades.Viva === null ||
        students[i].Grades.Viva === "-1"
      ) {
        setAlert(
          "Viva grade is not assigned for " + students[i].Name,
          "danger"
        );
        return;
      }
    }
    // Lock the profile
    lock();

    setAlert("Profile Locked", "success");
  };

  return (
    <div style={{ paddingTop: "2rem", paddingLeft: "3rem" }}>
      {user.locked ? (
        <h1
          style={{
            textAlign: "center",
            color: "#bb2124",
            marginBottom: "0.5rem",
            textDecoration: "underline",
          }}
        >
          The Marks are locked!!!
        </h1>
      ) : (
        <div>
          {edit ? (
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  save();
                }}
                style={{ background: "#22bb33" }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  cancel();
                }}
                style={{ background: "#bb2124" }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  onLock();
                }}
                style={{ background: "#f0ad4e" }}
              >
                Lock
              </Button>
            </div>
          )}
        </div>
      )}
      {students.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2rem",
            height: "70vh",
            overflowY: "auto",
            justifyContent: "flex-start",
            padding: "3rem",
          }}
        >
          {students.map((student) => (
            <div key={student._id}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "1rem",
                  width: "300px",
                }}
              >
                <h2>{student.Name}</h2>
                <p>Execution(Out of 10)</p>
                <input
                  type="number"
                  id="Execution"
                  name="Execution"
                  value={
                    student.Grades.Execution ? student.Grades.Execution : -1
                  }
                  disabled={!edit}
                  onChange={(e) => onChange(e, student)}
                  min="-1"
                  max="10"
                />
                <hr />

                <p>Ideation(Out of 10)</p>
                <input
                  type="number"
                  id="Ideation"
                  name="Ideation"
                  value={student.Grades.Ideation ? student.Grades.Ideation : -1}
                  disabled={!edit}
                  onChange={(e) => onChange(e, student)}
                  min="-1"
                  max="10"
                />
                <hr />

                <p>Viva(Out of 10)</p>
                <input
                  type="number"
                  id="Viva"
                  name="Viva"
                  value={student.Grades.Viva ? student.Grades.Viva : -1}
                  disabled={!edit}
                  onChange={(e) => onChange(e, student)}
                  min="-1"
                  max="10"
                />
                <hr />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marks;
