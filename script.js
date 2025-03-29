document.addEventListener('DOMContentLoaded', () => {
    // Language Selector
    const languageSelector = document.getElementById('language-selector');
    console.log(languageSelector); // Debugging: Should log the <select> element
  
    // Time Display Element
    const timeSetElement = document.querySelector('.time-set');
    console.log(timeSetElement); // Debugging: Should log the <div> element
  
    // Profile Name Animation
    const nameElement = document.querySelector('.profile-section h2'); // Select the <h2> element
    const name = 'Kun Amra';
    let currentName = ''; // Stores the current state of the name being displayed
    let isAdding = true; // Tracks whether we're adding or removing letters
  
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
  
    if (!languageSelector) {
      console.error('Language selector element not found!');
      return;
    }
    if (!timeSetElement) {
      console.error('Time set element not found!');
      return;
    }
    if (!themeToggle) {
      console.error('Theme toggle element not found!');
      return;
    }
  
    // Function to update the time in 12-hour format with AM/PM
    function updateTime() {
      const now = new Date(); // Get the current date and time
      let hours = now.getHours(); // Get hours
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes (2 digits)
      const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds (2 digits)
  
      // Determine the selected language
      const selectedLanguage = languageSelector.value;
  
      // Convert hours to 12-hour format
      let period = selectedLanguage === 'kh' ? 'ព្រឹក' : 'AM'; // Default to AM or ព្រឹក
      if (hours === 0) {
        hours = 12; // 0 becomes 12 AM or ព្រឹក
      } else if (hours > 12) {
        hours -= 12; // Convert to 12-hour format for PM or ល្ងាច
        period = selectedLanguage === 'kh' ? 'ល្ងាច' : 'PM';
      } else if (hours === 12) {
        period = selectedLanguage === 'kh' ? 'ល្ងាច' : 'PM'; // 12 PM remains 12 PM or ល្ងាច
      }
  
      // Format the time as HH:MM:SS AM/PM
      const currentTime = `${hours}:${minutes}:${seconds} ${period}`;
  
      // Update the text content of the time-set element
      timeSetElement.textContent =
        selectedLanguage === 'kh'
          ? `ពេលវេលា : ${currentTime}` // Khmer translation
          : `Time : ${currentTime}`; // English translation
    }
  
    // Call updateTime every second (1000ms)
    setInterval(updateTime, 1000);
  
    // Initial call to display the time immediately without waiting for the first interval
    updateTime();
  
    // Function to add or remove letters for the name animation
    function animateName() {
      if (isAdding) {
        // Adding letters
        if (currentName.length < name.length) {
          currentName = name.substring(0, currentName.length + 1); // Add one letter at a time
          nameElement.textContent = currentName;
        } else {
          isAdding = false; // Switch to removing letters after adding all
          setTimeout(animateName, 1000); // Pause before starting to remove letters
          return;
        }
      } else {
        // Removing letters
        if (currentName.length > 0) {
          currentName = name.substring(0, currentName.length - 1); // Remove one letter at a time
          nameElement.textContent = currentName;
        } else {
          isAdding = true; // Switch back to adding letters after removing all
        }
      }
  
      // Call the function again after a delay
      setTimeout(animateName, 200); // Adjust speed of animation here (200ms per letter)
    }
  
    // Start the animation
    animateName();
  
    // Function to update text based on selected language
    function updateLanguage() {
      const selectedLanguage = languageSelector.value;
  
      // Update all elements with data-en and data-kh attributes
      document.querySelectorAll('[data-en]').forEach((element) => {
        element.textContent =
          selectedLanguage === 'kh'
            ? element.getAttribute('data-kh')
            : element.getAttribute('data-en');
      });
  
      // Reinitialize the time display to reflect the selected language
      updateTime();
    }
  
    // Add event listener to the language dropdown
    languageSelector.addEventListener('change', updateLanguage);
  
    // Initialize the language on page load
    updateLanguage();
  
    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
      body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="bi bi-sun"></i>'; // Change to sun icon for dark mode
    } else {
      body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="bi bi-moon"></i>'; // Default to moon icon for light mode
    }
  
    themeToggle.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
  
      // Toggle between light and dark modes
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="bi bi-sun"></i>'; // Change to sun icon
        localStorage.setItem('theme', 'dark-mode'); // Save preference to localStorage
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="bi bi-moon"></i>'; // Change to moon icon
        localStorage.setItem('theme', 'light-mode'); // Save preference to localStorage
      }
    });
  });