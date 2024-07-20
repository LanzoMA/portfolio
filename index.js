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
    }
    catch (error) {
        window.alert('Sorry, your message could not be sent due to a server error');
        console.error(error);
    }
}
)

