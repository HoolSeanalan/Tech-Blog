async function deletePostHandler(event) {
    event.preventDefault();

    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
    else {
        alert('Post not found');
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deletePostHandler);