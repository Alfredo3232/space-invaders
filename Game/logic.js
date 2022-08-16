const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0

        const image = new Image()
        image.src = './assets/spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //THIS IS A RED BOX INSTEAD OF THE SPACESHIP
        c.save()
        c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2)
        c.rotate(this.rotation)
        c.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        
        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

const player = new Player();
const keys = {
    a: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)

    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break
        case 'ArrowLeft':
            console.log('ArrowLeft')
            keys.ArrowLeft.pressed = true
            break
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break
        case 'ArrowRight':
            console.log('ArrowRight')
            keys.ArrowRight.pressed = true
            break
        case ' ':
            console.log('Fire!!')
            keys.space.pressed = true
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
            break
        case 'ArrowLeft':
            console.log('ArrowLeft')
            player.velocity.x = -5
            keys.ArrowLeft.pressed = false
            break
        case 'd':
            console.log('right')
            keys.d.pressed = false
            break
        case 'ArrowRight':
            console.log('ArrowRight')
            keys.ArrowRight.pressed = false
            break
        case ' ':
            console.log('Fire!!')
            keys.space.pressed = false
            break
    }
})