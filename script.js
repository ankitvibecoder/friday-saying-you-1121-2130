document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const list = document.getElementById('employee-list');
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    const render = () => {
        list.innerHTML = '';
        employees.forEach((emp, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td>$${emp.salary}</td>
                <td>
                    <button class="attend ${emp.attended ? 'attended' : ''}" onclick="toggleAttendance(${index})">
                        ${emp.attended ? 'Present' : 'Mark Present'}
                    </button>
                </td>
                <td>
                    <button onclick="editEmp(${index})">Edit</button>
                    <button class="del" onclick="delEmp(${index})">Delete</button>
                </td>
            `;
            list.appendChild(row);
        });
        localStorage.setItem('employees', JSON.stringify(employees));
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmp = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            salary: document.getElementById('salary').value,
            attended: false
        };
        employees.push(newEmp);
        form.reset();
        render();
    });

    window.toggleAttendance = (index) => {
        employees[index].attended = !employees[index].attended;
        render();
    };

    window.delEmp = (index) => {
        employees.splice(index, 1);
        render();
    };

    window.editEmp = (index) => {
        const emp = employees[index];
        document.getElementById('name').value = emp.name;
        document.getElementById('role').value = emp.role;
        document.getElementById('salary').value = emp.salary;
        delEmp(index);
    };

    render();
});