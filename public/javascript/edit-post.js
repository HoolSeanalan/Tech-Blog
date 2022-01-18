async function editPostHandler(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post-title"]').value.trim();
    const postBody = document.querySelector('textarea[name="post-body"]').value.trim();
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (postTitle && postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
            }),
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        }
        else {
            alert(response.statusText);
        }
    }
    else {
        alert('Invalid edit or post not found');
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);