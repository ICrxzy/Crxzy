const banner = document.querySelector('#banner');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const changeCredentialsButton = document.getElementById('changeCredentials');
const closeButton = document.querySelector('.close');
let credentials = getCredentials();
let userLoggedIn = false;

// Function to hide the banner
function hideBanner() {
  banner.classList.remove('visible');
}

// Show the banner on page load
window.addEventListener('load', function() {
  banner.classList.add('visible');
  //setTimeout(hideBanner, 10000); // Hide banner after 10 seconds
});

// Handle Nav Buttons
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#nav-btns a');
  const currentPage = window.location.pathname.split('/').pop(); // Get the current page file name

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active'); // Add the 'active' class to the current page link
    }
  });

  loginButton.addEventListener('click', () => {
    if (userLoggedIn) {
      toggleAdminMenu();
    } else {
      login();
    }
  });

  logoutButton.addEventListener('click', () => {
    userLoggedIn = false;
    loginButton.innerText = 'Login';
    closeAdminMenu();
    alert('Logged Out');
  });

  changeCredentialsButton.addEventListener('click', () => {
    const newUsername = prompt('Enter New Username:');
    const newPassword = prompt('Enter New Password:');
    saveCredentials(newUsername, newPassword);
    alert('Credentials Updated');
  });

  closeButton.addEventListener('click', closeAdminMenu);
});

function login() {
  const username = prompt('Enter Username:');
  const password = prompt('Enter Password:');

  if (username === credentials.username && password === credentials.password) {
    userLoggedIn = true;
    document.getElementById('loginButton').innerText = 'Admin Panel';
  } else {
    alert('Invalid Credentials');
  }
}

function toggleAdminMenu() {
  const adminMenu = document.getElementById('adminMenu');
  adminMenu.style.display = adminMenu.style.display === 'block' ? 'none' : 'block';
}

function closeAdminMenu() {
  document.getElementById('adminMenu').style.display = 'none';
}

function saveCredentials(username, password) {
  const encryptedPassword = btoa(password); // Base64 encoding for simplicity
  const newCredentials = { username: username, password: encryptedPassword };
  localStorage.setItem('credentials', JSON.stringify(newCredentials));
  credentials = newCredentials;
}

function getCredentials() {
  const savedCredentials = localStorage.getItem('credentials');
  if (savedCredentials) {
    const parsedCredentials = JSON.parse(savedCredentials);
    parsedCredentials.password = atob(parsedCredentials.password); // Decode the password
    return parsedCredentials;
  }
  return { username: 'admin', password: 'admin' };
}
