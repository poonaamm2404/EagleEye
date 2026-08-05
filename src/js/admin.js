// State
let latestId = null;
let notificationsEnabled = false;
let isAuthenticated = false;

// DOM Elements
const loginOverlay = document.getElementById('login-overlay');
const adminPanel = document.getElementById('admin-panel');
const loginBtn = document.getElementById('login-btn');
const passInput = document.getElementById('admin-pass');
const loginError = document.getElementById('login-error');

const tableBody = document.getElementById('table-body');
const emptyState = document.getElementById('empty-state');
const notifyBtn = document.getElementById('enable-notifications');

// Simple Login Logic
loginBtn.addEventListener('click', () => {
  if (passInput.value === 'agency123') { // Simple placeholder password
    isAuthenticated = true;
    loginOverlay.style.display = 'none';
    adminPanel.style.display = 'block';
    fetchRequests();
    setInterval(fetchRequests, 10000); // Start polling only after login
  } else {
    loginError.style.display = 'block';
  }
});
passInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') loginBtn.click();
});

// Notifications
notifyBtn.addEventListener('click', async () => {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      notificationsEnabled = true;
      notifyBtn.innerHTML = "Alerts Enabled ✓";
      notifyBtn.disabled = true;
    }
  }
});
if (Notification.permission === "granted") {
  notificationsEnabled = true;
  notifyBtn.innerHTML = "Alerts Enabled ✓";
  notifyBtn.disabled = true;
}

// Global function to toggle description
window.toggleDesc = (id) => {
  const el = document.getElementById(`desc-${id}`);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
};

// Global function to update status
window.updateStatus = async (id, status) => {
  try {
    const res = await fetch(`http://localhost:5000/api/consultations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if(res.ok) {
      const select = document.getElementById(`status-${id}`);
      select.className = `status-select status-${status}`;
    }
  } catch(e) {
    console.error("Error updating status:", e);
  }
};

async function fetchRequests() {
  if (!isAuthenticated) return;
  try {
    const response = await fetch('http://localhost:5000/api/consultations');
    if (!response.ok) return;
    
    const result = await response.json();
    const data = result.data;
    
    if (data.length === 0) {
      emptyState.style.display = 'block';
      tableBody.innerHTML = '';
      return;
    }
    
    emptyState.style.display = 'none';
    tableBody.innerHTML = '';
    
    data.forEach((req) => {
      const tr = document.createElement('tr');
      const date = new Date(req.createdAt).toLocaleString();
      const currentStatus = req.status || 'Pending';
      
      tr.innerHTML = `
        <td style="color: var(--text-secondary); font-size: 13px;">${date}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-main); font-size: 15px;">${req.name}</div>
          <button class="desc-toggle" onclick="toggleDesc('${req._id}')">View Brief</button>
          <div id="desc-${req._id}" class="desc-content">${req.description}</div>
        </td>
        <td>
          <div style="color: var(--text-main);">${req.email}</div>
          <div style="color: var(--text-secondary); font-size: 13px;">${req.phone} (${req.contactMethod})</div>
        </td>
        <td style="text-transform: capitalize; color: var(--text-main); font-weight: 500;">${req.service}</td>
        <td>
          <select id="status-${req._id}" class="status-select status-${currentStatus}" onchange="updateStatus('${req._id}', this.value)">
            <option value="Pending" ${currentStatus === 'Pending' ? 'selected' : ''}>PENDING</option>
            <option value="Contacted" ${currentStatus === 'Contacted' ? 'selected' : ''}>CONTACTED</option>
            <option value="Closed" ${currentStatus === 'Closed' ? 'selected' : ''}>CLOSED</option>
          </select>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    if (data.length > 0) {
      const newLatestId = data[0]._id;
      if (latestId !== null && latestId !== newLatestId && notificationsEnabled) {
        new Notification("New Investigation Lead", {
          body: `New request from ${data[0].name}. Open dashboard to review details.`,
          icon: "/favicon.ico"
        });
      }
      latestId = newLatestId;
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
  }
}
