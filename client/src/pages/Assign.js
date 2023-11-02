import { useContext, useEffect, useState, Fragment } from "react";
import MentorContext from "../contexts/mentors/mentorContext";
import AlertContext from "../contexts/alert/alertContext";
import AuthContext from "../contexts/auth/authContext";

import Button from "../components/layout/Button";
import Student from "../components/layout/Student";

const Assign = () => {
  const mentorContext = useContext(MentorContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { fetchAssigned, Assigned, fetchUnassigned, Unassigned, assign } =
    mentorContext;
  const { setAlert } = alertContext;
  const { user } = authContext;

  const [edit, setEdit] = useState(false);
  const [assigned, setAssigned] = useState([]);
  const [unassigned, setUnassigned] = useState([]);

  useEffect(() => {
    fetchAssigned();
    fetchUnassigned();
  }, []);

  useEffect(() => {
    setAssigned(Assigned);
    setUnassigned(Unassigned);
  }, [Assigned, Unassigned]);

  useEffect(() => {}, [assigned, unassigned]);

  const save = () => {
    if (assigned.length < 3 || assigned.length > 4) {
      setAlert("Please assign 3 or 4 students", "danger");
    } else {
      let temp = [];
      for (let i = 0; i < assigned.length; i++) {
        const s = assigned[i];
        temp.push(s._id);
      }
      assign({ students: temp });
      setEdit(false);
      setAlert("Saved", "success");
    }
  };

  const cancel = () => {
    setAssigned(Assigned);
    setUnassigned(Unassigned);
    setEdit(false);
  };

  const onAssign = (student) => {
    setAssigned([...assigned, student]);
    setUnassigned(unassigned.filter((s) => s._id !== student._id));
    console.log(assigned);
  };

  const unassign = (student) => {
    setUnassigned([...unassigned, student]);
    setAssigned(assigned.filter((s) => s._id !== student._id));
  };
  return (
    <div style={{ paddingTop: "2rem", paddingLeft: "3rem" }}>
      {user.locked ? (
        <>
          <h1
            style={{
              textAlign: "center",
              color: "#bb2124",
              marginBottom: "0.5rem",
              textDecoration: "underline",
            }}
          >
            The Students are locked!!!
          </h1>
        </>
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
              {" "}
              <Button
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
      <hr style={{ width: "25%" }} />
      <h1>Assigned</h1>
      {assigned.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2rem",
            height: "40vh",
            overflowY: "auto",
            justifyContent: "flex-start",
            padding: "3rem",
          }}
        >
          {assigned.map((student) => (
            <Fragment key={student._id}>
              <Student
                student={student}
                but={
                  <Button
                    disabled={!edit}
                    onClick={() => {
                      unassign(student);
                    }}
                    style={{ background: "#bb2124" }}
                  >
                    X
                  </Button>
                }
              />
            </Fragment>
          ))}
        </div>
      )}

      <hr style={{ width: "25%" }} />
      <h1>Unassigned</h1>
      {unassigned.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2rem",
            height: "40vh",
            overflowY: "auto",
            justifyContent: "flex-start",
            padding: "3rem",
          }}
        >
          {unassigned.map((student) => (
            <Fragment key={student._id}>
              <Student
                student={student}
                but={
                  <Button
                    disabled={!edit}
                    onClick={() => {
                      onAssign(student);
                    }}
                    style={{ background: "#22bb33" }}
                  >
                    &#10003;
                  </Button>
                }
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assign;
