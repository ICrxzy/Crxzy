const header = document.querySelector('header');
const banner = document.querySelector('#banner');
let isScrolling = false;
let scrollTimeout;

// Function to hide the banner
function hideBanner() {
  banner.classList.remove('visible');
}

// Show the banner on page load
window.addEventListener('load', function() {
  banner.classList.add('visible');
  setTimeout(hideBanner, 10000); // Hide banner after Xms
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
});

// Handle scroll event
window.addEventListener('scroll', function() {
  if (window.pageYOffset > banner.offsetHeight) {
    header.style.top = '-100'; // Adjust header's top position when banner scrolls away
  } else {
    header.style.top = '0px'; // Original top position accounting for banner height
  }

  if (window.pageYOffset > 0) {
    hideBanner(); // Hide the banner when the user scrolls
  }

  if (!isScrolling) {
    header.style.transition = 'opacity 0.3s ease-in-out';
    header.classList.remove('hidden');
    isScrolling = true;
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function() {
    header.style.transition = 'opacity 0.3s ease-in-out';
    header.classList.add('hidden');
    isScrolling = false;
  }, 200);
});
