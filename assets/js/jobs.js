// Fetch Jobs from API

async function fetchJobs() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwgAI6j9T1wmo7gru7y_0e4trZpp82FsBQ44POnGOLr5s0Sblz65oQz99r6SL693E6V2Q/exec?sheet=Jobs');
        const jobs = await response.json();
        renderJobs(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        document.getElementById('job-listings').innerHTML = "<p>Error loading jobs.</p>";
    }
}
// Render Jobs in HTML
function renderJobs(jobs) {
    const container = document.getElementById('job-listings');
    container.innerHTML = '';

    if (jobs.length === 0) {
        container.innerHTML = '<p>No jobs available at this time.</p>';
        return;
    }

    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'col-md-4 mb-4';

        jobElement.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${job.title}</h5>
                    <p class="card-text">${job.description.substring(0, 120)}...</p>
                    <p><strong>Experience:</strong> ${job.experience}</p>
                    <p><strong>Skills:</strong> ${job.skills}</p>
                    <a href="#job-details" class="btn btn-primary" onclick="showJobDetails('${job.title}', \`${job.description}\`, '${job.experience}', '${job.skills}')">View Details</a>
                </div>
            </div>
        `;
        container.appendChild(jobElement);
    });
}

// Show Job Details (optional extended feature)
function showJobDetails(title, description, experience, skills) {
    const detailsContainer = document.getElementById('job-details');
    detailsContainer.classList.remove('d-none');
    detailsContainer.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p><strong>Experience Required:</strong> ${experience}</p>
        <p><strong>Required Skills:</strong> ${skills}</p>
        <button class="btn btn-secondary mt-3" onclick="hideJobDetails()">Close</button>
    `;
}

// Hide Job Details
function hideJobDetails() {
    const detailsContainer = document.getElementById('job-details');
    detailsContainer.classList.add('d-none');
}

// Initialize fetching jobs when the DOM content loads
document.addEventListener('DOMContentLoaded', fetchJobs);

