
// // MODAL CODE - cleaned up

// function openModal(id) {
//     document.getElementById(id).classList.add('open');
//     document.body.classList.add('modal-open');
// }

// // close currently open modal
// function closeModal() {
//     document.querySelector('.modal.open').classList.remove('open');
//     document.body.classList.remove('modal-open');
// }

// window.addEventListener('load', function() {
//     // close modals on background click
//     document.addEventListener('click', event => {
//         if (event.target.classList.contains('modal')) {
//             closeModal();
//         }
//     });
// });


// HAMBURGER MENU CODE

function openSidebar() {
    document.getElementById('sidebar-menu').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    // document.body.classList.add('sidebar-open');
    document.getElementById('open-sidebar-button').setAttribute('aria-expanded', 'true');
    document.getElementById('sidebar-menu').removeAttribute('inert');
}

function closeSidebar() {
    document.getElementById('sidebar-menu').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('open-sidebar-button').setAttribute('aria-expanded', 'false');
    document.getElementById('sidebar-menu').setAttribute('inert', '');
}
const media = window.matchMedia('(max-width: 540px)');

function updateNavbar(e) {
    const navbar = document.getElementById('sidebar-menu');
    // console.log('navbar width is being tracked');
    if (!navbar) return;
    // console.log('there is a navbar');
    const isMobile = e.matches;
    if (isMobile) {
      // console.log('the window is mobile');
        navbar.setAttribute('inert', '');
    } else {
      // console.log('the window is desktop');
        navbar.removeAttribute('inert');
    }
}

// Ensure DOM is loaded before running
window.addEventListener('DOMContentLoaded', function() {
  // TRACK THE WINDOW SIZE FOR MOBILE

  updateNavbar(media);
    media.addEventListener('change', updateNavbar);

  // CURRENT PAGE INDICATOR
  document.querySelectorAll('.button-nav').forEach(link => {
    if (link.pathname === window.location.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });
});


// CHARACTER COUNT

function updateCharCount() {
  const textarea = document.getElementById('message');
  const counter = document.getElementById('char-counter');
  let maxLength = 200;
  let currentLength = 0;
  if (textarea) {
    maxLength = textarea.maxLength || 200;
    currentLength = textarea.value.length;
  }
  const remaining = maxLength - currentLength;
  if (counter) counter.textContent = remaining;
  // Add or remove "danger" class based on remaining characters
  if (counter) {
    if (remaining <= 20) {
      counter.classList.add('danger');
    } else {
      counter.classList.remove('danger');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateCharCount(); // Set initial count
  const textarea = document.getElementById('message');
  if (textarea) {
    textarea.addEventListener('input', updateCharCount);
  }
  const clearButton = document.getElementById('button-reset-form');
  if (clearButton) {
    const form = clearButton.closest('form');
    if (form) {
      form.addEventListener('reset', function() {
        setTimeout(updateCharCount, 0);
      });
    }
  }
});



//// Modal

// open modal by id
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
}

// close currently open modal
function closeModal() {
  const modal = document.querySelector('.modal.open');
  if (modal) {
    modal.classList.remove('open');
    modal.classList.add('hidden');
  }
  document.body.classList.remove('modal-open');
}

// cookie consent code from Youtube tutorial
// https://www.youtube.com/watch?v=-HgdzYCi2nI&list=PL3XPrK6LU1xp7lckpiSpoKI72cKZYkq6M&index=37

const storageType = 'localStorage'; // localStorage or sessionStorage
const consentPropertyName = 'privacy-consent';

const shouldShowPopup = () => window[storageType].getItem(consentPropertyName) !== "true";
const saveToStorage = () => window[storageType].setItem(consentPropertyName, "true");

window.addEventListener('load', () => {
  // Modal background click close
  document.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
      closeModal();
    }
  });

 // CONSENT POPUP CODE
  const consentPopup = document.getElementById('popup-consent');
  const acceptBtn = document.getElementById('accept-consent');

function acceptConsent() {
  saveToStorage();
  const consentPopup = document.getElementById('popup-consent');
  if (consentPopup) {
    consentPopup.classList.add('hidden');
    consentPopup.classList.remove('open');
  }
  document.body.classList.remove('modal-open');
}


  // Attach the event listener here
  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptConsent);
  }

// Only show the popup if consent is NOT given
  if (shouldShowPopup() && consentPopup) {
    consentPopup.classList.remove('hidden');
  } else if (consentPopup) {
    consentPopup.classList.add('hidden');
  }
});
