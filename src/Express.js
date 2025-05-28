const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const proofs = [];
const checklists = [];

app.post('/api/submit-proof', (req, res) => {
  const {
    projectName,
    projectDate,
    objective,
    summary,
    teamMembers,
    scenarios,
    successCriteria,
    completionCriteria,
    timelineDates,
  } = req.body;

  if (!projectName) {
    return res.status(400).json({ error: 'Project name is required' });
  }

  const proofId = uuidv4();
  const proof = {
    id: proofId,
    projectName,
    projectDate,
    objective,
    summary,
    teamMembers,
    scenarios,
    successCriteria,
    completionCriteria,
    timelineDates,
    submittedAt: new Date().toISOString(),
  };

  proofs.push(proof);
  console.log('Proof submitted:', proof);

  res.json({ proofId });
});

app.post('/api/submit-checklist', (req, res) => {
  const { proofId, checklist } = req.body;

  if (!proofId) {
    return res.status(400).json({ error: 'proofId is required to link checklist' });
  }

  if (!checklist || !Array.isArray(checklist)) {
    return res.status(400).json({ error: 'Invalid checklist data' });
  }

  const proofExists = proofs.find((p) => p.id === proofId);
  if (!proofExists) {
    return res.status(400).json({ error: 'proofId does not exist' });
  }

  checklists.push({ proofId, checklist, submittedAt: new Date().toISOString() });
  console.log('Checklist saved for proofId:', proofId);

  res.json({ message: 'Checklist saved successfully' });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
