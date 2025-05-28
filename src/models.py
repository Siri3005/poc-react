from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class POCSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(200), nullable=False)
    submission_date = db.Column(db.String(20), nullable=False)
    team = db.Column(db.JSON, nullable=False)           # list of {name, role}
    scenarios = db.Column(db.JSON, nullable=False)      # list of {description, tools}
    objectives = db.Column(db.Text, nullable=True)
    summary = db.Column(db.Text, nullable=True)
    success_criteria = db.Column(db.Text, nullable=True)
    timeline = db.Column(db.JSON, nullable=True)        # list of dates
    completion_criteria = db.Column(db.Text, nullable=True)
    checklist_notes = db.Column(db.JSON, nullable=True) # list of notes per item

    def to_dict(self):
        return {
            "id": self.id,
            "project_name": self.project_name,
            "submission_date": self.submission_date,
            "team": self.team,
            "scenarios": self.scenarios,
            "objectives": self.objectives,
            "summary": self.summary,
            "success_criteria": self.success_criteria,
            "timeline": self.timeline,
            "completion_criteria": self.completion_criteria,
            "checklist_notes": self.checklist_notes
        }
