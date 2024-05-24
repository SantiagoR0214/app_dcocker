let loggedIn = false;

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    document.getElementById('response').innerText = JSON.stringify(result, null, 2);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.message === 'Login successful') {
        loggedIn = true;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('note-container').style.display = 'block';
    }
    document.getElementById('response').innerText = JSON.stringify(result, null, 2);
});

document.getElementById('note-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!loggedIn) {
        document.getElementById('response').innerText = 'Please log in first';
        return;
    }
    const idEstudiante = document.getElementById('note-idEstudiante').value;
    const notaEstudiante = document.getElementById('note-notaEstudiante').value;

    const response = await fetch('/notes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idEstudiante, notaEstudiante })
    });
    const result = await response.json();
    document.getElementById('response').innerText = JSON.stringify(result, null, 2);
});

document.getElementById('update-note-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!loggedIn) {
        document.getElementById('response').innerText = 'Please log in first';
        return;
    }
    const id = document.getElementById('update-note-id').value;
    const notaEstudiante = document.getElementById('update-note-notaEstudiante').value;

    const response = await fetch(`/notes/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notaEstudiante })
    });
    const result = await response.json();
    document.getElementById('response').innerText = JSON.stringify(result, null, 2);
});

document.getElementById('delete-note-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!loggedIn) {
        document.getElementById('response').innerText = 'Please log in first';
        return;
    }
    const id = document.getElementById('delete-note-id').value;

    const response = await fetch(`/notes/${id}`, {
        method: 'DELETE'
    });
    if (response.status === 204) {
        document.getElementById('response').innerText = 'Note deleted successfully';
    } else {
        const result = await response.json();
        document.getElementById('response').innerText = JSON.stringify(result, null, 2);
    }
});