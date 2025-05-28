// src/ProofTable.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProofTable.css';

function ProofTable() {
  const navigate = useNavigate();

  // State for static inputs
  const [projectName, setProjectName] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [objective, setObjective] = useState('');
  const [summary, setSummary] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');
  const [completionCriteria, setCompletionCriteria] = useState('');
  const [timelineDates, setTimelineDates] = useState(['', '', '', '']);

  // Team members
  const [teamMembers, setTeamMembers] = useState([{ name: '', role: '' }]);
  const handleTeamChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };
  const addTeamMember = () => setTeamMembers([...teamMembers, { name: '', role: '' }]);
  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  // Scenarios
  const [scenarios, setScenarios] = useState([{ description: '', tools: '' }]);
  const handleScenarioChange = (index, field, value) => {
    const updated = [...scenarios];
    updated[index][field] = value;
    setScenarios(updated);
  };
  const addScenario = () => setScenarios([...scenarios, { description: '', tools: '' }]);
  const removeScenario = (index) => {
    setScenarios(scenarios.filter((_, i) => i !== index));
  };

  // Handle next button: submit to backend and navigate
  const handleNext = async () => {
    const proofData = {
      projectName,
      projectDate,
      objective,
      summary,
      teamMembers,
      scenarios,
      successCriteria,
      completionCriteria,
      timelineDates,
    };

    try {
      const res = await fetch('http://localhost:4000/api/submit-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proofData),
      });

      if (res.ok) {
        const data = await res.json();
        const proofId = data.proofId;
        // Save proofId for checklist linking
        localStorage.setItem('proofId', proofId);
        navigate('/checklist');
      } else {
        alert('Error submitting proof page');
      }
    } catch (err) {
      console.error(err);
      alert('Network error submitting proof data');
    }
  };

  return (
    <div className="poc-container">
      <header className="poc-header">
        <h1>Proof of Concept: Submission Form</h1>
        <p className="subtitle">Please fill out the following details for your POC proposal.</p>
      </header>

      {/* Project Details */}
      <div className="card">
        <h2>📌 Project Details</h2>
        <div className="row">
          <input
            type="text"
            placeholder="Project or Product Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            type="date"
            value={projectDate}
            onChange={(e) => setProjectDate(e.target.value)}
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="card">
        <h2>👥 Team Members</h2>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Role in POC</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    value={member.name}
                    onChange={(e) => handleTeamChange(idx, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={member.role}
                    onChange={(e) => handleTeamChange(idx, 'role', e.target.value)}
                  />
                </td>
                <td>
                  <button className="delete" onClick={() => removeTeamMember(idx)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-btn" onClick={addTeamMember}>+ Add Row</button>
      </div>

      {/* Overview */}
      <div className="card">
        <h2>📝 Overview</h2>
        <label>POC Objective</label>
        <textarea
          placeholder="What do you aim to achieve?"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        />
        <label>Project Summary</label>
        <textarea
          placeholder="Brief description of the project..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      {/* Scenarios */}
      <div className="card">
        <h2>🧪 Scenarios & Requirements</h2>
        <table>
          <thead>
            <tr>
              <th>Scenario Description</th>
              <th>Required Tools/Features</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    value={sc.description}
                    onChange={(e) => handleScenarioChange(idx, 'description', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={sc.tools}
                    onChange={(e) => handleScenarioChange(idx, 'tools', e.target.value)}
                  />
                </td>
                <td>
                  <button className="delete" onClick={() => removeScenario(idx)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-btn" onClick={addScenario}>+ Add Row</button>
      </div>

      {/* Success Criteria */}
      <div className="card">
        <h2>✅ Success Criteria</h2>
        <textarea
          placeholder="How will you measure success?"
          value={successCriteria}
          onChange={(e) => setSuccessCriteria(e.target.value)}
        />
      </div>

      {/* Timeline */}
      <div className="card">
        <h2>📅 Timeline & Milestones</h2>
        <div className="row">
          {timelineDates.map((date, idx) => (
            <input
              key={idx}
              type="date"
              value={timelineDates[idx]}
              onChange={(e) => {
                const updated = [...timelineDates];
                updated[idx] = e.target.value;
                setTimelineDates(updated);
              }}
            />
          ))}
        </div>
      </div>

      {/* Completion Criteria */}
      <div className="card">
        <h2>🧾 Completion Criteria</h2>
        <textarea
          placeholder="What must be completed to consider this POC done?"
          value={completionCriteria}
          onChange={(e) => setCompletionCriteria(e.target.value)}
        />
      </div>

      {/* Next Button */}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button className="next-btn" onClick={handleNext}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default ProofTable;
