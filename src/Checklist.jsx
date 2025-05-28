// src/ChecklistPage.jsx
import React, { useState, useEffect } from 'react';
import './Checklist.css';
import Header from './Header';
import Footer from './Footer';

const initialChecklist = [
  {
    title: 'Demonstrate Need',
    desc:
      'Describe the problem you’re trying to solve or the reason your product needs to exist. Identify customer pain points by interviewing a sample group from your target market.',
    checked: false,
    notes: '',
  },  
  {
    title: 'Envision Solutions',
    desc:
      'Use customer feedback to brainstorm solutions. Assess your ideas based on constraints, such as time, cost, resources, and technology.',
    checked: false,
    notes: '',
  },
  {
    title: 'Define POC Goals',
    desc:
      'What are you trying to achieve with your POC? Communicate with internal stakeholders to align goals.',
    checked: false,
    notes: '',
  },
  {
    title: 'Specify Success Criteria',
    desc:
      'What metrics will you use to evaluate your idea? Define how to measure success.',
    checked: false,
    notes: '',
  },
  {
    title: 'Identify Team',
    desc: 'List the team members and roles essential to complete the POC.',
    checked: false,
    notes: '',
  },
  {
    title: 'Create Timeline',
    desc:
      'Set deadlines and milestones to keep the POC on track.',
    checked: false,
    notes: '',
  },
  {
    title: 'Validate Results',
    desc:
      'Review feedback and metrics to assess if the POC meets objectives.',
    checked: false,
    notes: '',
  },
];

function ChecklistPage() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [submitting, setSubmitting] = useState(false);

  // Handle checkbox toggle
  const handleCheck = (index) => {
    const updated = [...checklist];
    updated[index].checked = !updated[index].checked;
    setChecklist(updated);
  };

  // Handle notes change
  const handleNotesChange = (index, value) => {
    const updated = [...checklist];
    updated[index].notes = value;
    setChecklist(updated);
  };

  // Submit checklist to backend with proofId
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const proofId = localStorage.getItem('proofId');
      if (!proofId) {
        alert('Proof ID not found. Please submit the Proof page first.');
        setSubmitting(false);
        return;
      }

      const response = await fetch('http://localhost:4000/api/submit-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proofId, checklist }),
      });

      if (!response.ok) throw new Error('Failed to submit checklist');

      alert('Checklist submitted successfully!');
      setChecklist(initialChecklist);
    } catch (err) {
      console.error(err);
      alert('Error submitting checklist');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="checklist-container">
        <h1>POC Checklist</h1>
        {checklist.map(({ title, desc, checked, notes }, idx) => (
          <div className="checklist-item" key={idx}>
            <label className="checklist-label">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheck(idx)}
              />
              <span className="checklist-title">{title}</span>
            </label>
            <p className="checklist-desc">{desc}</p>
            {checked && (
              <textarea
                className="checklist-notes"
                placeholder="Add notes..."
                value={notes}
                onChange={(e) => handleNotesChange(idx, e.target.value)}
              />
            )}
          </div>
        ))}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Checklist'}
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ChecklistPage;
