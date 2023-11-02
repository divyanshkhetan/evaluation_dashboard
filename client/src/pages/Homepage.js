import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router';

import AuthContext from "../contexts/auth/authContext";
import MentorContext from "../contexts/mentors/mentorContext";

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
    await login({id});
    navigate('/dashboard');
  };

  return (
    <>
      {Mentors.map((mentor) => (
        <div key={mentor._id}>
          <h1>{mentor.Name}</h1>
          <button onClick={() => onLogin(mentor._id)}>Login</button>
        </div>
      ))}
    </>
  );
};

export default Homepage;
