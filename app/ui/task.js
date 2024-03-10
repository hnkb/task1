
export function updateTaskList(taskList) {
    const list = document.querySelector('.tasks ul');
    list.innerHTML = '';

    const fragment = document.createDocumentFragment();
    for (let i = taskList.tasks.length - 1; i >= 0; i--) {
        const task = taskList.tasks[i];
        const item = document.createElement('li');
        item.textContent = task.name + (task.amount ? ` (${Math.round(task.amount * 100)}%)` : '');
        item.className = task.state;
        fragment.appendChild(item);
    }

    list.appendChild(fragment);
}
