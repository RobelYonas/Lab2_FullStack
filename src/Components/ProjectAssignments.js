import React, { useEffect, useState } from 'react';

function ProjectAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/project-assignments');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message || 'Something went wrong.');
            }
        };

        fetchAssignments();
    }, []);

    if (error) return <p>Error loading data: {error}</p>;
    if (assignments.length === 0) return <p>No project assignments found.</p>;

    return (
        <div>
            <h2>Projects from Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Project Name</th>
                        <th>Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment, index) => (
                        <tr key={index}>
                            <td>{assignment.employee_id ? assignment.employee_id.employee_id : 'N/A'}</td>
                            <td>{assignment.employee_id ? assignment.employee_id.full_name : 'N/A'}</td>
                            <td>{assignment.project_code ? assignment.project_code.project_name : 'N/A'}</td>
                            <td>{assignment.start_date ? new Date(assignment.start_date).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectAssignments;
