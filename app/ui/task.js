
export function updateTaskList(taskList) {
    const list = document.querySelector('.tasks ul');
    list.innerHTML = '';
    for (const task of taskList.tasks) {
        const item = document.createElement('li');
        item.textContent = `${task.name} (${task.row}, ${task.col})`;
        item.className = task.state;
        list.appendChild(item);
    }
}
