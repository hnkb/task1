
export function updateTaskList(taskList) {
    const list = document.querySelector('.tasks ul');
    list.innerHTML = '';

    const fragment = document.createDocumentFragment();
    for (let i = taskList.tasks.length - 1; i >= 0; i--) {
        const task = taskList.tasks[i];
        const item = document.createElement('li');

        let status = task.person ? task.person.name : '';
        if (task.state === 'moving')
            status += (status.length ? ', ' : '') + 'moving';
        if (task.state === 'doing' && task.amount)
            status += (status.length ? ', ' : '') + `${Math.round(task.amount * 100)}%`;

        item.textContent = task.name + (status ? ` (${status})` : '');
        item.className = task.state;
        fragment.appendChild(item);
    }

    list.appendChild(fragment);
}
