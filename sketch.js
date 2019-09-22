function setup(){
    createCanvas(600, 600);
    background(155, 0, 255);
}

let cirSize = 50
let cirRad = cirSize / 2
let ogx1 = 300
let x1 = 300
let ogy1 = 300
let y1 = 300
let counter = 1
// Direction
let dx1 = 0
let dy1 = 0
// Speed
let ogsx1 = 1
let sx1 = 1
let ogsx2 = 1
let sx2 = 1
let ogsy1 = 5
let sy1 = 5
let ogsy2 = 1
let sy2 = 1
// Bounces
let bounce1 = 10
let bounce2 = 10
// Gravity
let grav1 = .5
let grav2 = .7
let gy1
let gy2

function draw(){
    background (155, 0, 255)
    circle(x1, y1, cirSize)

    let high1 = ogy1 / counter
 
    if (y1 > 600 - cirRad){
        dy1 = 1
        counter +=1
    } else if (y1 < (600 - (high1))){
        dy1 = 0
    }
    if (y1 < (600 - high1) + ((600 - high1) * grav1)){
        gy1 = 1
        }

    if (dy1 == 0){
        sy1 = ogsy1
        y1 += sy1
    } else if (dy1 == 1){
        y1 -= sy1
            if (gy1 == 1){
                sy1 -= 10/high1
            }
    } else if (dy1 == 2){
    
    }

    if (counter > bounce1){
        dy1 = 2
    }
    console.log("y1: " + y1)
    console.log("counter:" + counter)
    console.log("sy1:" + sy1)
}