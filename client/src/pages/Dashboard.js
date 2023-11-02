import { useContext, useEffect, useState } from "react";
import MentorContext from "../contexts/mentors/mentorContext";

const Dashboard = () => {
  const mentorContext = useContext(MentorContext);
  const { fetchStudents, Students } = mentorContext;

  const [filter, setFilter] = useState("All");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setStudents(Students);
    } else if (filter === "Assigned") {
      setStudents(Students.filter((student) => student.MentorID !== null));
    } else {
      setStudents(Students.filter((student) => student.MentorID === null));
    }
  }, [filter, Students]);

  return (
    <div style={{ paddingTop: "4rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Assigned")}>Assigned</button>
        <button onClick={() => setFilter("Unassigned")}>Unassigned</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
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
              <h2>{student.Name}</h2>
              <p>Execution(Out of 10)</p>
              <input
                type="text"
                id="Execution"
                name="Execution"
                value={
                  student.Grades.Execution ? student.Grades.Execution : "NA"
                }
                disabled
              />
              <hr />

              <p>Ideation(Out of 10)</p>
              <input
                type="text"
                id="Ideation"
                name="Ideation"
                value={student.Grades.Ideation ? student.Grades.Ideation : "NA"}
                disabled
              />
              <hr />

              <p>Viva(Out of 10)</p>
              <input
                type="text"
                id="Viva"
                name="Viva"
                value={student.Grades.Viva ? student.Grades.Viva : "NA"}
                disabled
              />
              <hr />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
