import { useContext, useEffect, useState, Fragment } from "react";
import MentorContext from "../contexts/mentors/mentorContext";
import Button from "../components/layout/Button";
import Student from "../components/layout/Student";

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
    <div style={{ paddingTop: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        <Button onClick={() => setFilter("All")} style={filter==="All" ? {background: "#22bb33"} : {}}>All</Button>
        <Button onClick={() => setFilter("Assigned")} style={filter==="Assigned" ? {background: "#22bb33"} : {}}>Assigned</Button>
        <Button onClick={() => setFilter("Unassigned")} style={filter==="Unassigned" ? {background: "#22bb33"} : {}}>Unassigned</Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "2rem",
          height: "70vh",
          overflowY: "auto",
          justifyContent: "flex-start",
          padding: "3rem"
        }}
      >
        {students.map((student) => (
          <Fragment key={student._id}>
            <Student student={student} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
