// headResults.js
const express = require("express");
const router = express.Router();
const Class = require("../../models/Class");
const Marks = require("../../models/Marks");
const User = require("../../models/User");

// Controller function
const getClassResultSummary = async (req, res) => {
    try {
        const classId = req.params.id;

        // 1) Find the class
        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        const studentIds = classData.students;
        if (!studentIds || studentIds.length === 0) {
            return res.status(404).json({ message: "No students enrolled in this class" });
        }

        // 2) Find all marks for these students
        const marks = await Marks.find({ studentId: { $in: studentIds } });
        if (!marks.length) {
            return res.status(404).json({ message: "No marks found for this class" });
        }

        // 3) Class-level stats
        const scores = marks.map(m => m.marks);
        const classStats = {
            totalStudents: studentIds.length,
            totalMarkEntries: marks.length,
            highestMark: Math.max(...scores),
            lowestMark: Math.min(...scores),
            averageMark: scores.reduce((a, b) => a + b, 0) / scores.length
        };

        // 4) Per-student summary
        const studentSummaries = await Promise.all(studentIds.map(async studentId => {
            const student = await User.findById(studentId, 'name email');
            const studentMarks = marks.filter(m => m.studentId.toString() === studentId.toString());
            const totalMarks = studentMarks.reduce((acc, m) => acc + m.marks, 0);
            const averageMarks = studentMarks.length ? totalMarks / studentMarks.length : 0;

            return {
                studentId,
                name: student?.name || "Unknown",
                email: student?.email || "Unknown",
                totalMarks,
                averageMarks,
                subjectsCount: studentMarks.length,
                marks: studentMarks // optional
            };
        }));

        // 5) Return summary
        return res.status(200).json({
            message: "Class result summary",
            classId: classData._id,
            classname: classData.classname,
            classStats,
            students: studentSummaries
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Assign route
router.get("/results/class/:id", getClassResultSummary);

module.exports = router;
