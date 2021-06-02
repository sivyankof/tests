class Bullet extends Base {
    constructor(tank, direction, y, x, ...arg) {
        super(arg);

        this.tank = tank;
        this.startY = +this.tank.style.top.replace('px', '');
        this.startX = +this.tank.style.left.replace('px', '');
        this.direction = direction;
        this.directions = ['TOP', 'RIGHT', 'DOWN', 'LEFT'];
        this.y = y;
        this.x = x;
        this.destroyed = false;
    }

    create() {
        const divBullet = document.createElement('div');

        divBullet.classList.add('bullet');
        $gameMap.append(divBullet);

        this.move(divBullet, this.direction);
    }

    //ДВИЖЕНИЕ РАКЕТЫ
    move(divBullet, direction) {
        switch (this.directions[direction]) {
            case 'TOP':
                if (this.y * this.height > 0) {
                    //ЕСЛИ РАКЕТА ВРЕЗАЛАСЬ В СТЕНУ
                    if (MAP[this.y][this.x] === MAP_LEGEND.WALL) {
                        WALL.destroyWall(this.y, this.x);
                        this.destroy(divBullet);

                        break;

                        //ЕСЛИ РАКЕТА ВРЕЗАЛОАСЬ В БОТА
                    } else if (
                        MAP[this.y - 1][this.x] === MAP_LEGEND.ENEMY_BASE &&
                        this.tank.classList.contains('game-object__player-tank')
                    ) {
                        [ENEMY_ONE, ENEMY_TWO, ENEMY_THREE].forEach((elem) => {
                            if (elem.y === this.y - 1 && elem.x === this.x) {
                                console.log(elem);
                                elem.destroyedEmpty();
                            }
                            this.destroy(divBullet);
                        });
                        break;

                        //ЕСЛИ РАКЕТА ВРЕЗАЛАСЬ В ИГРОКА
                    } else if (
                        MAP[this.y][this.x] === MAP_LEGEND.PLAYER_BASE &&
                        this.tank.classList.contains('game-object__enemy-tank')
                    ) {
                        PLAYER_TANK.destroyed();
                        MAP[this.y][this.x] = 0;
                        this.destroy(divBullet);

                        break;
                    }

                    this.y -= 1;

                    this.view(direction, divBullet);
                } else {
                    this.destroy(divBullet);
                }

                break;

            case 'RIGHT':
                if (
                    this.x * this.width <= $gameMap.clientWidth - this.width &&
                    this.x !== MAP[this.y].length - 1
                ) {
                    if (MAP[this.y][this.x] === MAP_LEGEND.WALL) {
                        WALL.destroyWall(this.y, this.x);

                        this.destroy(divBullet);

                        break;
                        //ЕСЛИ РАКЕТА ВРЕЗАЛОАСЬ В БОТА
                    } else if (
                        MAP[this.y][this.x + 1] === MAP_LEGEND.ENEMY_BASE &&
                        this.tank.classList.contains('game-object__player-tank')
                    ) {
                        [ENEMY_ONE, ENEMY_TWO, ENEMY_THREE].forEach((elem) => {
                            if (elem.y === this.y && elem.x === this.x + 1) {
                                console.log(elem);
                                elem.destroyedEmpty();
                            }
                            this.destroy(divBullet);
                        });
                        break;

                        //ЕСЛИ РАКЕТА ВРЕЗАЛАСЬ В ИГРОКА
                    } else if (
                        MAP[this.y][this.x] === MAP_LEGEND.PLAYER_BASE &&
                        this.tank.classList.contains('game-object__enemy-tank')
                    ) {
                        PLAYER_TANK.destroyed();
                        MAP[this.y][this.x] = 0;
                        this.destroy(divBullet);

                        break;
                    }

                    this.x += 1;

                    this.view(direction, divBullet);
                } else {
                    this.destroy(divBullet);
                }

                break;

            case 'DOWN':
                if (this.y * this.height <= $gameMap.clientHeight - this.height - 10) {
                    if (MAP[this.y][this.x] === MAP_LEGEND.WALL) {
                        WALL.destroyWall(this.y, this.x);

                        this.destroy(divBullet);

                        break;
                        //ЕСЛИ РАКЕТА ВРЕЗАЛОАСЬ В БОТА
                    } else if (
                        MAP[this.y + 1][this.x] === MAP_LEGEND.ENEMY_BASE &&
                        this.tank.classList.contains('game-object__player-tank')
                    ) {
                        [ENEMY_ONE, ENEMY_TWO, ENEMY_THREE].forEach((elem) => {
                            if (elem.y === this.y + 1 && elem.x === this.x) {
                                console.log(elem);
                                elem.destroyedEmpty();
                            }
                            this.destroy(divBullet);
                        });
                        break;

                        //ЕСЛИ РАКЕТА ВРЕЗАЛАСЬ В ИГРОКА
                    } else if (
                        MAP[this.y][this.x] === MAP_LEGEND.PLAYER_BASE &&
                        this.tank.classList.contains('game-object__enemy-tank')
                    ) {
                        PLAYER_TANK.destroyed();
                        MAP[this.y][this.x] = 0;
                        this.destroy(divBullet);

                        break;
                    }

                    this.y += 1;

                    this.view(direction, divBullet);
                } else {
                    this.destroy(divBullet);
                }
                break;

            case 'LEFT':
                if (this.x * this.width >= 0) {
                    if (MAP[this.y][this.x - 1] === MAP_LEGEND.WALL) {
                        WALL.destroyWall(this.y, this.x - 1);
                        this.destroy(divBullet);

                        break;
                        //ЕСЛИ РАКЕТА ВРЕЗАЛОАСЬ В БОТА
                    } else if (
                        MAP[this.y][this.x - 1] === MAP_LEGEND.ENEMY_BASE &&
                        this.tank.classList.contains('game-object__player-tank')
                    ) {
                        [ENEMY_ONE, ENEMY_TWO, ENEMY_THREE].forEach((elem) => {
                            if (elem.y === this.y && elem.x === this.x - 1) {
                                elem.destroyedEmpty();
                            }
                            this.destroy(divBullet);
                        });
                        break;

                        //ЕСЛИ РАКЕТА ВРЕЗАЛАСЬ В ИГРОКА
                    } else if (
                        MAP[this.y][this.x] === MAP_LEGEND.PLAYER_BASE &&
                        this.tank.classList.contains('game-object__enemy-tank')
                    ) {
                        PLAYER_TANK.destroyed();
                        MAP[this.y][this.x] = 0;
                        this.destroy(divBullet);

                        break;
                    }

                    this.x -= 1;

                    this.view(direction, divBullet);
                } else {
                    this.destroy(divBullet);
                }
                break;
        }
    }

    //ОТОБРАЖЕНИЕ РАКЕТЫ НА СТАНИЦЕ
    view(direction, divBullet) {
        switch (this.directions[direction]) {
            case 'TOP':
                divBullet.style = `top: ${this.startY}px; left: ${this.startX + 24}px`;
                this.startY -= 100;

                setTimeout(() => {
                    this.move(divBullet, direction);
                }, 100);

                break;

            case 'RIGHT':
                divBullet.style = `top: ${this.startY + 24}px; left: ${
                    this.startX + 24
                }px`;
                this.startX += 100;

                setTimeout(() => {
                    this.move(divBullet, direction);
                }, 100);

                break;

            case 'DOWN':
                divBullet.style = `top: ${this.startY + 64}px; left: ${
                    this.startX + 24
                }px`;
                this.startY += 100;

                setTimeout(() => {
                    this.move(divBullet, direction);
                }, 100);

                break;

            case 'LEFT':
                divBullet.style = `top: ${this.startY + 24}px; left: ${this.startX}px`;
                this.startX -= 100;

                setTimeout(() => {
                    this.move(divBullet, direction);
                }, 100);

                break;
        }
    }

    //УНИЧТОЖЕНИЕ РАКЕТЫ
    destroy(divBullet) {
        delete this;

        divBullet.remove();
        this.destroyed = true;
    }
}
