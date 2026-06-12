const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const jobsFile = path.join(__dirname, "..", "data", "jobs.json");

// Read jobs from file
function readJobs() {
  if (!fs.existsSync(jobsFile)) return [];
  const data = fs.readFileSync(jobsFile, "utf8");
  return data ? JSON.parse(data) : [];
}

// Save jobs to file
function saveJobs(jobs) {
  fs.writeFileSync(jobsFile, JSON.stringify(jobs, null, 2));
}

// Get all jobs
router.get("/", (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});

// Get a single job by ID
router.get("/:id", (req, res) => {
  const jobs = readJobs();
  const jobId = Number(req.params.id);

  const job = jobs.find((j) => j.jobId === jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
});

// Update job status
router.patch("/:id", (req, res) => {
  const jobs = readJobs();
  const jobId = Number(req.params.id);

  const jobIndex = jobs.findIndex((j) => j.jobId === jobId);

  if (jobIndex === -1) {
    return res.status(404).json({ message: "Job not found" });
  }

  jobs[jobIndex].status = req.body.status || jobs[jobIndex].status;
  jobs[jobIndex].assignedTeam = req.body.assignedTeam || jobs[jobIndex].assignedTeam;
  jobs[jobIndex].dueDate = req.body.dueDate || jobs[jobIndex].dueDate;

  saveJobs(jobs);

  res.json({
    message: "Job updated successfully",
    job: jobs[jobIndex]
  });
});

module.exports = router;
