document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');
  const timeSetElement = document.querySelector('.time-set');
  const nameElement = document.querySelector('.profile-section h2');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  let currentName = '';
  let isAdding = true;
  let nameText = nameElement.getAttribute('data-en'); // Default to English

  // Function to update the name string based on selected language
  function updateAnimatedNameText() {
    const lang = languageSelector.value;
    nameText = nameElement.getAttribute(`data-${lang}`) || nameElement.getAttribute('data-en');
    currentName = ''; // Reset current name for animation
    isAdding = true;  // Restart animation in add mode
  }

  // Typing animation function
  function animateName() {
    if (isAdding) {
      if (currentName.length < nameText.length) {
        currentName = nameText.substring(0, currentName.length + 1);
        nameElement.textContent = currentName;
      } else {
        isAdding = false;
        setTimeout(animateName, 1000);
        return;
      }
    } else {
      if (currentName.length > 0) {
        currentName = nameText.substring(0, currentName.length - 1);
        nameElement.textContent = currentName;
      } else {
        isAdding = true;
        updateAnimatedNameText(); // Switch name when animation restarts
      }
    }
    setTimeout(animateName, 200);
  }

  animateName(); // Start animation

  // Language switch logic
  function updateLanguage() {
    const selectedLang = languageSelector.value;

    document.querySelectorAll('[data-en]').forEach((element) => {
      const translatedText = element.getAttribute(`data-${selectedLang}`);
      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    updateAnimatedNameText(); // Update name text when language changes
    updateTime(); // Re-render time with new language
  }

  languageSelector.addEventListener('change', updateLanguage);
  updateLanguage(); // Initialize
});
