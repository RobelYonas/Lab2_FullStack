// models/ProjectAssignment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectAssignmentSchema = new Schema({
    employee_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
    project_code: { type: Schema.Types.ObjectId, ref: 'Project' },
    start_date: { type: Date, required: true }
}, { collection: 'projectassignments' });

module.exports = mongoose.model('ProjectAssignment', projectAssignmentSchema);
