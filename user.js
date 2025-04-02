const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
};

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    const userDOM = document.getElementById('users');
    userDOM.innerHTML = "";

    response.data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>${Array.isArray(user.interests)
                ? user.interests.join(', ')
                : (typeof user.interests === 'string' ? user.interests : '-')
            }</td>
            <td>${user.description || '-'}</td>
            <td>
                <a href="index.html?id=${user.id}">
                    <button class="btn-action btn-edit">Edit</button>
                </a>
                <button class="btn-action btn-delete" data-id="${user.id}">Delete</button>
            </td>
        `;
        userDOM.appendChild(row);
    });

    // ลบผู้ใช้
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('ต้องการลบผู้ใช้นี้จริงหรือไม่?')) {
                await axios.delete(`${BASE_URL}/user/${id}`);
                loadData();
            }
        });
    });
};
