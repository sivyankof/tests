const fs = require('fs');

// const validator = require('validator');

// const yargs = require('yargs/yargs');
// const { hideBin } = require('yargs/helpers');
// const { help, command } = require('yargs');
// const argv = yargs(hideBin(process.argv)).argv;

const argv = require('yargs/yargs')(process.argv.slice(2))
    .command(
        ['todo <key>'],
        'The add new todo',
        () => {},
        (argv) => {
            fs.appendFile('todo.txt', `'${argv.key}'\n`, (err) => {
                if (err) throw err;

                console.log(`Задание ${argv.key} добавлено `);
            });
        },
    )
    .command(
        ['clear'],
        'The clear todos',
        () => {},
        () => {
            fs.writeFileSync('todo.txt', '', (err) => {
                if (err) throw err;
                console.log('Все задания очищены');
            });
        },
    )
    .command(
        ['list'],
        'The all list todos',
        () => {},
        () => {
            fs.readFile('todo.txt', 'utf8', (err, data) => {
                if (err) throw err;

                let copyArr = [];
                data.split("'").forEach((el) => {
                    if (el !== '\n' && el !== '') {
                        copyArr.push(el);
                    }
                });

                console.log('--------- [File Data] ---------');
                copyArr.forEach((el, i) => {
                    console.log(i + 1, el);
                });
                console.log('--------- [File Data] ---------');
            });
        },
    )
    .command(
        ['done <key>'],
        'The done todo',
        () => {},
        (argv) => {
            fs.readFile('todo.txt', 'utf8', function doneTask(err, data) {
                let copyArr = [];

                if (err) {
                    return console.log(err);
                }

                data.split("'").forEach((el) => {
                    if (el !== '\n' && el !== '') {
                        copyArr.push(el);
                    }
                });

                copyArr.forEach((el, i) => {
                    if (i + 1 === argv.key) {
                        return (
                            (result = data.replace(`${el}`, `${el} /done`)),
                            console.log(`Задание ${el} выполнено успешно`)
                        );
                    }
                });

                fs.writeFile('todo.txt', result, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            });
        },
    )
    .help().argv;
