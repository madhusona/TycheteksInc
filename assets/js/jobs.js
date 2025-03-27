function fetchJobsJSONP() {
  const script = document.createElement('script');
  const url = 'https://script.google.com/macros/s/AKfycbzcGE0Rp7nLH_nKZSvXd1bp6hsf5trwsXQTz4IzOJ9I2CZBGIVIbcl4EvC8Nb85x9zLtA/exec?sheet=Jobs&callback=renderJobs';
  script.src = url;
  document.body.appendChild(script);
}

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

      // Ensure fields are strings before using substring
      const title = String(job.title || '');
      const description = String(job.description || '');
      const experience = String(job.experience || '');
      const skills = String(job.skills || '');

      jobElement.innerHTML = `
          <div class="card shadow-sm">
              <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description.substring(0, 120)}...</p>
                  <p><strong>Experience:</strong> ${experience}</p>
                  <p><strong>Skills:</strong> ${skills}</p>
                  <a href="#job-details" class="btn btn-primary" onclick="showJobDetails('${title}', \`${description}\`, '${experience}', '${skills}')">View Details</a>
              </div>
          </div>
      `;
      container.appendChild(jobElement);
  });
}


document.addEventListener('DOMContentLoaded', fetchJobsJSONP);
