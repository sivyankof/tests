class View {
    constructor() {
        this.countAnimation = 0;
        this.countEmpty = ENEMY_TANKS_COUNT;
        this.count = 0;
    }

    //ОТОБРАЖЕНРЕ ДВИЖЕНИЯ ТАНКА НА СТРАНИЦЕ
    viewMove(randomDirection, img, y, x) {
        switch (randomDirection) {
            case 'TOP':
            case 'ArrowUp':
                img.style.transform = 'rotate(0deg)';
                img.style.top = `${y * 64}px`;
                img.style.left = `${x * 64}px`;
                break;

            case 'RIGHT':
            case 'ArrowRight':
                img.style.transform = 'rotate(90deg)';
                img.style.top = `${y * 64}px`;
                img.style.left = `${x * 64}px`;
                break;

            case 'DOWN':
            case 'ArrowDown':
                img.style.transform = 'rotate(180deg)';
                img.style.top = `${y * 64}px`;
                img.style.left = `${x * 64}px`;
                break;

            case 'LEFT':
            case 'ArrowLeft':
                img.style.transform = 'rotate(-90deg)';
                img.style.top = `${y * 64}px`;
                img.style.left = `${x * 64}px`;
                break;
        }
    }

    //АНИМАЦИЯ ВЗРЫВА
    animationsBang(elem) {
        let arr = ['bang_1', 'bang_2', 'bang_3'];
        let timerID = setTimeout(() => {
            elem.style.transition = 'unset';
            elem.src = `./img/${arr[this.countAnimation]}.png`;

            this.countAnimation++;
            this.animationsBang(elem);
        }, 200);
        if (this.countAnimation === 2) {
            setTimeout(() => (elem.style.transition = '0.8s'), 400);

            clearTimeout(timerID);
            this.countAnimation = 0;
        }
    }

    //АНИМАЦИЯ БОЛЬШОГО ВЗЫРВА
    animationsBigBang(y, x) {
        let arr = ['Big_Bang_1', 'Big_Bang_2'];
        let div = document.createElement('div');

        let timerID = setTimeout(() => {
            div.id = 'bigBang';
            div.style = `top: ${y * 64 - 20}px; left: ${x * 64 - 20}px`;
            div.style.backgroundImage = `url(./img/${arr[this.count]}.png)`;

            $gameMap.appendChild(div);

            this.count++;

            this.animationsBigBang(y, x);
        }, 300);

        if (this.count >= 1) {
            clearTimeout(timerID);

            this.count = 0;
        }
    }

    //КНОПКА 'НАЧАТЬ СНАЧАЛО'
    btnResetGame() {
        const div = document.createElement('div');
        div.classList.add('reset-game');
        div.innerText = 'RESET GAME';
        $gameMap.appendChild(div);
        div.addEventListener('click', () => {
            window.location.reload();
        });
    }

    //ДОСКА ОСТАВШИХСЯ ПРОТИВНИКОВ
    scoreEmptyImg() {
        for (let i = 0; i < ENEMY_TANKS_COUNT; i++) {
            let img = document.createElement('img');
            img.classList.add('dead-empty-tanks');
            img.src = './img/dead.png';
            $deadEmpty.appendChild(img);
        }
    }

    // УДАЛЯЕТ ТАНК С ДОСКИ ПРОТИВНИКА
    popKillEnpty() {
        $deadEmpty.lastChild.remove();
        console.log($deadEmpty.children.length);
    }
}
