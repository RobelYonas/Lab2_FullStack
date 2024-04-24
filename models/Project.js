// models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_code: { type: String, required: true, unique: true },
    project_name: { type: String, required: true },
    project_description: { type: String }
}, { collection: 'projects' });

module.exports = mongoose.model('Project', projectSchema);
