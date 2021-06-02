const name = 'Artem';
const URL = 'https://jsfeajax.herokuapp.com/';

async function get() {
    let response = await fetch(URL + name + '/todo', {
        method: 'GET',
    });

    let result = await response.json();

    await rendering(result);
    console.log(result, 'get');
}
get();

async function post(user) {
    let response = await fetch(URL + name + '/todo', {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });

    return response;
}

async function postDelete(user) {
    let response = await fetch(URL + name + '/todo/delete', {
        method: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });

    let result = await response.json();
    console.log(result, 'delet');
}

async function getResul() {
    let response = await fetch(URL + name + '/todo', {
        method: 'GET',
    });

    return response;
}
