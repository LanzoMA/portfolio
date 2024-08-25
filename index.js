loadHomePage();

function loadHomePage() {
    document.getElementById('mainContent').innerHTML = document.getElementById('homePage').innerHTML;
    loadProjects();
}

function loadContactPage() {
    document.getElementById('mainContent').innerHTML = document.getElementById('contact').innerHTML;

    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const messageInput = document.getElementById("messageInput");

    document.getElementById("messageForm").addEventListener('submit', async function () {
        let errorMessage = '';

        if (nameInput.value == '') errorMessage += 'No name provided\n';

        if (emailInput.value == '') errorMessage += 'No email provided\n';

        if (messageInput.value == '') errorMessage += 'No message given';

        if (errorMessage != '') {
            window.alert(errorMessage);
            return;
        }

        const templateParams = {
            'to_name': 'Lanzo',
            'message': messageInput.value,
            'email': emailInput.value,
            'from_name': nameInput.value,
        };

        try {
            const response = await emailjs.send('service_oipvug', 'template_b21o7qq', templateParams);

            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            window.alert('Your message has been sent successfully')
        }
        catch (error) {
            window.alert('Sorry, your message could not be sent due to a server error');
            console.error(error);
        }
    }
    )
}

async function loadProjects() {
    const response = await fetch('projects.json');
    const projects = await response.json();

    projects.forEach(project => {
        createProjectElement(project['title'], project['url'], project['image'], project['description']);
    });
}

function createProjectElement(title, url, image, description) {
    const projectTemplateHtml = document.getElementById('projectTemplate').innerHTML;
    const projectElement = document.createElement('div');

    projectElement.innerHTML = projectTemplateHtml;
    projectElement.querySelector('a').href = url;
    projectElement.querySelector('.project-header').textContent = title;
    projectElement.querySelector('p').textContent = description;
    projectElement.querySelector('img').src = image;
    projectElement.classList.add('container-item', 'project-item');

    document.getElementById('projectsContainer').appendChild(projectElement);
}