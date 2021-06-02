let GAME_TIMER_INTERVAL = 900;
let PLAYER_LIFE_COUNT = 3;
let ENEMY_TANKS_COUNT = 21;
let IS_GAME_OVER = false;

const $gameMap = document.querySelector('#game-map');
const $deadEmpty = document.getElementById('dead-enemy');
const $deadPlayer = document.getElementById('dead-player');

let PLAYER_TANK = new PlayerTank(13, 4);
document.addEventListener('keydown', (event) => PLAYER_TANK.move(event));
document.addEventListener('keydown', (event) => PLAYER_TANK.bull(event));

let ENEMY_ONE = new EnemyTank(0, 0);
let ENEMY_TWO = new EnemyTank(0, 6);
let ENEMY_THREE = new EnemyTank(0, 10);
let WALL = new Wall();
let VIEW = new View();

gameInitialization();

gameLoop();

function gameLoop() {
    if (IS_GAME_OVER !== true) {
        gameStep();

        setTimeout(function () {
            gameLoop();
        }, GAME_TIMER_INTERVAL);
    }
}

function gameStep() {
    ENEMY_ONE.move();
    ENEMY_TWO.move();
    ENEMY_THREE.move();

    if ($deadPlayer.textContent <= 0) {
        WALL.youLose();
    } else if ($deadEmpty.children.length <= 0) {
        WALL.youWin();
    }
}

//ИНИЦИАЛИЗАЦИЯ ИГРОКОВ
function gameInitialization() {
    WALL.load();
    PLAYER_TANK.init();
    ENEMY_ONE.init();
    ENEMY_TWO.init();
    ENEMY_THREE.init();
}
