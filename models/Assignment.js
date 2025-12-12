// Muhammad Awais SP23-BSE-031 Assignment Model
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  submissions: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      fileUrl: {
        type: String,
        required: true
      },
      marks: {
        type: Number,
        default: null
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);

