async function logoutHandler(event) {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logoutHandler);