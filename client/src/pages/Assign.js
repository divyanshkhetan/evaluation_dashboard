import { useContext, useEffect, useState } from "react";
import MentorContext from "../contexts/mentors/mentorContext";
import AlertContext from "../contexts/alert/alertContext";
import AuthContext from "../contexts/auth/authContext";

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
    <div style={{ paddingTop: "4rem" }}>
      {user.locked ? (
        <h1>The Students are locked!!!</h1>
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
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      )}
      <h1>Assigned</h1>
      {assigned.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {assigned.map((student) => (
            <div key={student._id} style={{ display: "flex" }}>
              <p>{student.Name}</p>
              <button
                disabled={!edit}
                onClick={() => {
                  unassign(student);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <hr />
      <h1>Unassigned</h1>
      {unassigned.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {unassigned.map((student) => (
            <div key={student._id} style={{ display: "flex" }}>
              <p>{student.Name}</p>
              <button
                disabled={!edit}
                onClick={() => {
                  onAssign(student);
                }}
              >
                &#10003;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assign;
