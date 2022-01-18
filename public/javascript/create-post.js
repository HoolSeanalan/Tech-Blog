async function newPostHandler(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').value.trim();
    const postBody = document.querySelector('input[name="post-body"]').value.trim();

    if (postTitle) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
            }),
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);