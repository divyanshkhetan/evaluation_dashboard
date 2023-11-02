import { useContext, useEffect, useState } from "react";
import MentorContext from "../contexts/mentors/mentorContext";
import AlertContext from "../contexts/alert/alertContext";
import AuthContext from "../contexts/auth/authContext";

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
    <div style={{ paddingTop: "4rem" }}>
      {user.locked ? (
        <h1>The Marks are locked!!!</h1>
      ) : (
        <div>
          {edit ? (
            <div>
              <button
                onClick={() => {
                  save();
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  cancel();
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onLock();
                }}
              >
                Lock
              </button>
            </div>
          )}
        </div>
      )}
      {students.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            marginTop: "2rem",
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          {students.map((student) => (
            <div key={student._id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid black",
                  padding: "1rem",
                }}
              >
                <p>{student.Name}</p>
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
