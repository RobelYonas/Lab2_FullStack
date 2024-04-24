import React, { useEffect, useState } from 'react';

function ProjectAssignments() {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/project-assignments');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAssignments(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message || 'Something went wrong.');
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;
    if (assignments.length === 0) return <p>No project assignments found.</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Projects from Database</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{assignment.employee_id ? assignment.employee_id.employee_id : 'N/A'}</td>
                            <td style={{ padding: '8px' }}>{assignment.employee_id ? assignment.employee_id.full_name : 'N/A'}</td>
                            <td style={{ padding: '8px' }}>{assignment.project_code ? assignment.project_code.project_name : 'N/A'}</td>
                            <td style={{ padding: '8px' }}>{assignment.start_date ? new Date(assignment.start_date).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectAssignments;
