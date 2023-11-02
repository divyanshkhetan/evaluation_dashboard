import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../contexts/auth/authContext";
import MentorContext from "../contexts/mentors/mentorContext";

import Button from "../components/layout/Button";

const Homepage = () => {
  const authContext = useContext(AuthContext);
  const mentorContext = useContext(MentorContext);

  const { login } = authContext;
  const { Mentors, fetchMentors } = mentorContext;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors();
    // eslint-disable-next-line
  }, []);

  const onLogin = async (id) => {
    await login({ id });
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Mentors.map((mentor) => (
        <div
          key={mentor._id}
          style={{
            width: "300px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>{mentor.Name}</h2>
          <Button
            onClick={() => onLogin(mentor._id)}
            style={{
              background: "#22bb33",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
