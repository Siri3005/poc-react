// src/context/PocDataContext.jsx
import React, { createContext, useState, useContext } from 'react';

const PocDataContext = createContext();

export const PocDataProvider = ({ children }) => {
  const [proofTableData, setProofTableData] = useState({
    projectName: '',
    projectDate: '',
    teamMembers: [{ name: '', role: '' }],
    scenarios: [{ description: '', tools: '' }],
    pocObjective: '',
    projectSummary: '',
    successCriteria: '',
    timelineDates: ['', '', '', ''],
    completionCriteria: '',
  });

  const [checklist, setChecklist] = useState([
    // your initial checklist items here (copy from ChecklistPage)
  ]);

  return (
    <PocDataContext.Provider
      value={{ proofTableData, setProofTableData, checklist, setChecklist }}
    >
      {children}
    </PocDataContext.Provider>
  );
};

export const usePocData = () => useContext(PocDataContext);
