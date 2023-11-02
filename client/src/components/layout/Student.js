import React from 'react';

const Card = ({student}) => {
    return (
        <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '5px', 
            padding: '1rem', 
            width: '300px',
            height: '200px',
        }}>
            <h2>{student.Name}</h2>
            <ul>
                <li>Execution: {student.Grades.Execution ? student.Grades.Execution : "NA"}</li>
                <li>Ideation: {student.Grades.Ideation ? student.Grades.Ideation : "NA"}</li>
                <li>Viva: {student.Grades.Viva ? student.Grades.Viva : "NA"}</li>
            </ul>
        </div>
    );
};

export default Card;
