document.addEventListener('DOMContentLoaded', () => {
    const projectFilter = document.getElementById('projectFilter');
    const projects = document.querySelectorAll('#projects article');
    const languageSelector = document.getElementById('languageSelector');

    function loadTranslations(language) {
        fetch(`locales/${language}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const keys = element.getAttribute('data-i18n').split('.');
                    let text = translations;
                    keys.forEach(key => {
                        text = text[key];
                    });
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = text;
                    } else {
                        element.textContent = text;
                    }
                });
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        loadTranslations(selectedLanguage);
    });

    // Load default language (English) on page load
    loadTranslations('en');

    projectFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        projects.forEach(project => {
            if (selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');

    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name && emailPattern.test(email)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const mailtoLink = `mailto:michael.condra@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    });
});