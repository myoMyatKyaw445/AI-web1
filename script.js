const routes = {
  '/': `
    <div class="bg-banner">
      <h1 class="display-4">Explore AI Image Prompts</h1>
    </div>
    <div class="container my-5">
      <div class="row text-center">
        ${['lion', 'football', 'landscape', 'robot', 'fantasy'].map(topic => `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="https://source.unsplash.com/400x200/?${topic}" class="card-img-top" alt="${topic}">
              <div class="card-body">
                <h5 class="card-title">${topic.charAt(0).toUpperCase() + topic.slice(1)}</h5>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `,
  '/about': () => {
    const email = window.userData?.email || "Not logged in";
    return `
      <div class="container my-5">
        <h2>About This Website</h2>
        <p>This site showcases categorized AI image generation prompts to inspire creativity and save time.</p>
        <hr />
        <h5>👤 Logged in as: <span class="text-primary">${email}</span></h5>
      </div>
    `;
  },
  '/contact': `
    <div class="container my-5">
      <h2>Contact Us</h2>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Your Name</label>
          <input type="text" class="form-control" id="name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email">
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea class="form-control" id="message" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `
};

function renderRoute() {
  const path = window.location.hash.slice(1) || '/';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${path}`) {
      link.classList.add('active');
    }
  });
  const content = typeof routes[path] === 'function' ? routes[path]() : routes[path];
  document.getElementById('app').innerHTML = content || '<div class="container my-5"><h2>Page Not Found</h2></div>';
}

document.getElementById('toggleMode').addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
});

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  console.log("User Data:", data);
  window.userData = data;

  document.getElementById('login-section').style.display = 'none';
  document.getElementById('main-nav').classList.remove('d-none');
  document.getElementById('app').style.display = 'block';

  renderRoute();
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('load', () => {
  if (window.userData) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('main-nav').classList.remove('d-none');
    document.getElementById('app').style.display = 'block';
    renderRoute();
  }
});
