async function commentHandler(event) {
    event.preventDefault();

    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (commentText) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: commentText,
                postId,
            }),
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentHandler);