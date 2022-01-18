async function signupHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
              }),
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = '/dashboard';
        } else {
            alert(result.message);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);