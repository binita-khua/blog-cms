require('dotenv').config();

document.addEventListener('DOMContentLoaded', function() {
    const postId = getPostIdFromURL();
    const commentsForm = document.getElementById('commentForm');

    if (!postId) {
        console.error('Post ID not found in the URL');
        return;
    }

    fetch(`http://localhost:3000/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            document.getElementById('postDetail').innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
            // Load comments as well
            return fetch(`http://localhost:3000/posts/${postId}/comments`);
        })
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('comments');
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `<p>${comment.text}</p>`;
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    commentsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentText = document.getElementById('commentText').value;
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3000/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: commentText }),
        })
        .then(response => response.json())
        .then(comment => {
            alert('Comment added!');
            // Optionally refresh comments or append the new comment to the view
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function getPostIdFromURL() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('postId');
}
