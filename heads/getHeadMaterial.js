// heads/getHeadMaterial.js

const express = require("express");
const router = express.Router();

const Material = require("../models/Material");

// SP23-BSE-063 | GET headmaterial
// View academic materials - lists all materials uploaded by teachers across classes
router.get("/material", async (req, res) => {
  try {
    const materials = await Material.find({})
      .populate("classId", "classname")
      .populate("uploadedBy", "name email");

    if (!materials.length) {
      return res.status(404).json({ message: "No materials found" });
    }

    const materialList = materials.map((mat) => ({
      materialId: mat._id,
      title: mat.title,
      fileUrl: mat.fileUrl,
      classId: mat.classId?._id || null,
      classname: mat.classId?.classname || "Unknown Class",
      uploadedBy: {
        teacherId: mat.uploadedBy?._id || null,
        name: mat.uploadedBy?.name || "Unknown",
        email: mat.uploadedBy?.email || "Unknown",
      },
      createdAt: mat.createdAt,
    }));

    return res.status(200).json({
      message: "All academic materials across classes",
      count: materialList.length,
      materials: materialList,
    });
  } catch (error) {
    console.error("Head material error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
