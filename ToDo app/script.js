const $taskInput = document.querySelector('.task-input');
const $tasklist = document.getElementById('task-list');
const $templTask = document.getElementById('template-task');
const $nodeList = document.getElementsByClassName('task-list-item');

document.addEventListener('click', onBtnClickAddTask);
document.addEventListener('keyup', onSentTaskInput);

async function onBtnClickAddTask(event) {
    const target = event.target;

    if (target.classList.contains('task-btn')) {
        $taskInput.classList.toggle('activ-input-long');
        target.classList.toggle('activ-btn-long');
        target.firstElementChild.classList.toggle('btn-close-transform');

        target.previousElementSibling.focus();
    }

    if (target.classList.contains('btn-trash')) {
        let nameValue = target.previousElementSibling.innerText;

        await deletedItems(nameValue);

    }

    if (target.classList.contains('task-list-item')) {
        await toggleCheckbox(target);
    }
}

async function onSentTaskInput(event) {
    if (event.target.classList.contains('task-input')) {
        if (event.key == `Enter` && $taskInput.value.length > 1) {
            await createTask($taskInput.value.trim());
            $taskInput.value = '';
        }
    }
}
