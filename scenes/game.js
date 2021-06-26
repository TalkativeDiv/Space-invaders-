//consts
const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 200
const TIME_LEFT = 60
const BULLET_SPEED = 400
//enemy
///layer
layer(['obj', 'ui'], 'obj')
//adding the level 
addLevel([
    '!^^^^^^^^^^^^^^^  &',
    '!^^^^^^^^^^^^^^^  &',
    '!^^^^^^^^^^^^^^^  &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
    '!                &',
], {
        //getting the sprites ready
        width: 30,
        height: 22,
        '^': [sprite('space-invader'), scale(0.7), 'space-invader'],
        '!': [sprite('wall'), 'left-wall'],
        '&': [sprite('wall'), 'right-wall'],
    })
//user
const player = add([
    sprite('space-ship'),
    pos(width() / 2, height() / 2),
    origin('center')
])
//score
const score = add([
    text('0'),
    pos(50, 50),
    layer('ui'),
    scale(2),
    {
        value: 43 ,
    }
])
//timer
const timer = add([
    text('0'),
  pos(90, 50),
  layer('ui'),
  scale(2),
  {
    time: TIME_LEFT,
  }  
]) 

timer.action(() => {
    timer.time -= dt()
    timer.text = timer.time.toFixed(2)
    if(timer.time <= 0){
        go('lose',score.value)
    }
})


/*movement
user
left*/
keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
})
//right
keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
})

function spawnBullet(p,) {
  add([
    rect(6,18), 
    pos(p), 
    origin('center'), 
    color(0.5, 0.5, 1),
    'bullet'
    ])
}


keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
})
action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
    play("explode", {
        volume: 2.0,
        speed: 0.8,
        detune: 1200,
    });
  }
})
collides('bullet', 'space-invader', (b,s) =>{
        play("explode", {
        volume: 2.0,
        speed: 0.8,
        detune: 1200,
    });
    camShake(4)
    destroy(b)
    destroy(s)
    score.value++
    score.text = score.value    
})

/* enemys*/


action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
})

collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    
    every('space-invader', (s) => {
        s.move(0, LEVEL_DOWN)
    })
})
collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
        s.move(0, LEVEL_DOWN)
    })
})

player.overlaps('space-invader', () => {
    play("explode", {
        volume: 2.0,
        speed: 0.8,
        detune: 1200,
    });
    go('lose', { score: score.value })
    
})
action('space-invader', (s) => {
    if (s.pos.y >= height() / 2) {
        go('lose', { score: score.value })
    }
})

score.action(() => {
 if(score.value === 44){
     go('win');
 }
})
