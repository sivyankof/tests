async function createTask(text) {
    const copyTempTask = $templTask.content.querySelector('li').cloneNode(true);

    copyTempTask.firstElementChild.setAttribute('id', text);
    copyTempTask.firstElementChild.setAttribute('name', text);
    let label = copyTempTask.querySelector('label');
    label.setAttribute('for', text);
    label.prepend(text);

    $tasklist.append(copyTempTask);

    let user = {
        name: text,
        check: false,
    };

    let response = await post(user);
    let result = await response.json();
    console.log(result);
}

async function deletedItems(item) {
    let response = await getResul();

    let result = await response.json();

    result.forEach((el) => {
        if (el.name == item) {
            let user = {
                id: el.id,
            };

            postDelete(user);
        }
    });

    for (let i = 0; i < $nodeList.length; i++) {
        const element = $nodeList[i];

        if (element.querySelector('label').innerText === item) {
            element.remove();
        }
    }
}

async function toggleCheckbox(target) {
    let response = await getResul();

    let result = await response.json();

    if (response.status === 200) {
        if (target.firstElementChild.hasAttribute('checked')) {
            target.firstElementChild.removeAttribute('checked'),
                target.classList.remove('complete'),
                result.forEach(async (el) => {
                    if (el.name == target.innerText) {
                        let user = {
                            name: el.name,
                            check: false,
                            id: el.id,
                            status: 'not new',
                        };

                        let response = await post(user);
                        let result = await response.json();
                        console.log(result, 'post');
                    }
                });
        } else {
            target.firstElementChild.setAttribute('checked', ''),
                target.classList.add('complete'),
                result.forEach(async (el) => {
                    if (el.name == target.innerText) {
                        let user = {
                            name: el.name,
                            check: true,
                            id: el.id,
                            status: 'not new',
                        };

                        let response = await post(user);
                        let result = await response.json();
                        console.log(result, 'post');
                    }
                });
        }
    }
}

async function rendering(result) {
    for (var i = 0; i < result.length; i++) {
        const copyTempTask = $templTask.content.querySelector('li').cloneNode(true);

        copyTempTask.firstElementChild.setAttribute('id', result[i].name);
        copyTempTask.firstElementChild.setAttribute('name', result[i].name);

        if (result[i].check === true) {
            copyTempTask.firstElementChild.setAttribute('checked', '');
            copyTempTask.classList.add('complete');
        }

        let label = copyTempTask.querySelector('label');
        label.setAttribute('for', result[i].name);
        label.prepend(result[i].name);
        $tasklist.append(copyTempTask);
    }
}
