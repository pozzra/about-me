document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');
  const timeSetElement = document.querySelector('.time-set');
  const nameElement = document.querySelector('.profile-section h2');
  const name = 'Kun Amra';
  let currentName = '';
  let isAdding = true;
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (!languageSelector || !timeSetElement || !themeToggle) {
    console.error('Essential elements not found!');
    return;
  }

  // Time update logic
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const lang = languageSelector.value;

    let period = lang === 'kh' ? 'ព្រឹក' : lang === 'cn' ? '上午' : 'AM';
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
      period = lang === 'kh' ? 'ល្ងាច' : lang === 'cn' ? '下午' : 'PM';
    } else if (hours === 12) {
      period = lang === 'kh' ? 'ល្ងាច' : lang === 'cn' ? '下午' : 'PM';
    }

    const currentTime = `${hours}:${minutes}:${seconds} ${period}`;
    let label = 'Time';

    if (lang === 'kh') label = 'ពេលវេលា';
    if (lang === 'cn') label = '时间';

    timeSetElement.textContent = `${label} : ${currentTime}`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  // Name animation
  function animateName() {
    if (isAdding) {
      if (currentName.length < name.length) {
        currentName = name.substring(0, currentName.length + 1);
        nameElement.textContent = currentName;
      } else {
        isAdding = false;
        setTimeout(animateName, 1000);
        return;
      }
    } else {
      if (currentName.length > 0) {
        currentName = name.substring(0, currentName.length - 1);
        nameElement.textContent = currentName;
      } else {
        isAdding = true;
      }
    }
    setTimeout(animateName, 200);
  }

  animateName();

  // Language switch logic
  function updateLanguage() {
    const selectedLang = languageSelector.value;

    document.querySelectorAll('[data-en]').forEach((element) => {
      const translatedText = element.getAttribute(`data-${selectedLang}`);
      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    updateTime(); // Re-render time with new language
  }

  languageSelector.addEventListener('change', updateLanguage);
  updateLanguage();

  // Theme Toggle
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
  }

  themeToggle.addEventListener('click', (event) => {
    event.preventDefault();
    if (body.classList.contains('light-mode')) {
      body.classList.replace('light-mode', 'dark-mode');
      themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
      localStorage.setItem('theme', 'dark-mode');
    } else {
      body.classList.replace('dark-mode', 'light-mode');
      themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
      localStorage.setItem('theme', 'light-mode');
    }
  });
});
