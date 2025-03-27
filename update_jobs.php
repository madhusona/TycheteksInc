<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$jobsFile = 'assets/data/jobs.json';

// ✅ Load existing jobs
$jobs = json_decode(file_get_contents($jobsFile), true);

// ✅ Read JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Handle Adding New Jobs
if (isset($data['add'])) {
    $newJob = $data['add'];

    // ✅ Check for Unique Job ID
    foreach ($jobs as $job) {
        if ($job['id'] == $newJob['id']) {
            die(json_encode(["status" => "error", "message" => "Job ID already exists"]));
        }
    }

    // ✅ Add New Job
    $jobs[] = $newJob;
    file_put_contents($jobsFile, json_encode($jobs, JSON_PRETTY_PRINT));

    echo json_encode(["status" => "success", "message" => "Job added successfully"]);
    exit;
}

// ✅ Handle Deleting Jobs
if (isset($data['delete'])) {
    $jobIdsToDelete = $data['delete'];
    $jobs = array_filter($jobs, function ($job) use ($jobIdsToDelete) {
        return !in_array($job['id'], $jobIdsToDelete);
    });

    file_put_contents($jobsFile, json_encode(array_values($jobs), JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success", "message" => "Jobs deleted successfully"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request"]);
?>
