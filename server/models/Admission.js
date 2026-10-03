const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    applicationNo: { type: String, unique: true },
    studentName: { type: String, required: true },
    dateOfBirth: Date,
    classApplying: { type: String, required: true },
    parentName: String,
    email: { type: String, required: true },
    phone: { type: String, required: true },
    previousSchool: String,
    address: String,
    documents: [{ url: String, name: String }],
    status: {
      type: String,
      enum: ['submitted', 'under-review', 'approved', 'waitlisted', 'rejected'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

admissionSchema.pre('save', function (next) {
  if (!this.applicationNo)
    this.applicationNo = `SBPS-${Date.now().toString().slice(-6)}`;
  next();
});

module.exports = mongoose.model('Admission', admissionSchema);