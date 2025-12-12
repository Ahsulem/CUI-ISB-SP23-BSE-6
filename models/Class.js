// const mongoose = require('mongoose');

// const classSchema = new mongoose.Schema({
//   classname: {
//     type: String,
//     required: true
//   },
//   teacher: {
//     type: mongoose.Schema.Types.ObjectId,
// <<<<<<< main
//     ref: 'User',
//     default: null
//   },
//   students: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     }
//   ],
// =======
//     ref: 'User'
//   },
//   students: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
// >>>>>>> main
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Class', classSchema);
