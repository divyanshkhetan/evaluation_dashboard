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

  useEffect(()=> {
    if(filter==="All") {
      setStudents(Students);
    }
    else if(filter==="Assigned") {
      setStudents(Students.filter((student)=>student.MentorID!==null))
    } else {
      setStudents(Students.filter((student)=>student.MentorID===null))
    }
  }, [filter, Students])

  return (
    <div style={{marginLeft:"12rem", paddingTop: "4rem"}}>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <button onClick={()=>setFilter("All")}>All</button>
        <button onClick={()=>setFilter("Assigned")}>Assigned</button>
        <button onClick={()=>setFilter("Unassigned")}>Unassigned</button>
      </div>
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
      {students.map((student) => (
        <div key={student._id}>
          <p>{student.Name}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;
