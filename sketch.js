let g = {
    m: {
        y: 2,
        x: 100,
        grav: 10,
    },
    p: {
        y: 700,
        x: 1200,
    },
    fr: 60,
    tic: 0,
    toc: 0,
    tot: 0,
    boop: 12,
    bCount: 0,
    dotCount: 0,
    count: 0,
    rCount: 0,
}
g.scale = g.p.y/g.m.y;
g.p.grav = g.m.grav * g.scale;

function setup(){
    createCanvas(g.p.x, g.p.y);
    background(25, 255, 255);
    frameRate(g.fr);
}

let dot = [{}]
let rand = [0, 0, 0]

let balls = [
    {name: "basket", r: 255, g: 165, b: 0, stroke: 0, fric: .75, size: 100},
    {name: "bowling", r: 0, g: 0, b: 0, stroke: 255, fric: .3, size: 100},
    {name: "tennis", r: 201, g: 243, b: 100, stroke: 255, fric: .9, size: 20},
]

let preImg = [{img: "img/basketball.png", size: 75, place: [10, 10]}, {img: "img/bowlingball.png", size: 110, place: [0, 0]}, {img: "img/tennisball.png", size: 50, place: [10, 10]}]
let img = []
for (i=0; i<balls.length; i++){
    img.push({img: "", size: ""})
}

function preload(){
    for (i=0; i<img.length; i++){
        img[i].img = loadImage(preImg[i].img);
        img[i].size = preImg[i].size;
        img[i].place = preImg[i].place;
    }
}

function bounce(x){
    if (x.y > x.floor) x.boop += 1;
    if (x.boop == 0){
        x.tic+=1
        x.y = x.ogy + (g.p.grav / 2)*((x.tic/g.fr)**2);
        x.vel = Math.sqrt(2 * g.p.grav * (x.floor - x.ogy))
    } else {
        if (x.toc == 0) x.vel *= x.fric;
        x.toc += 1
        x.y = (x.floor) - ((x.vel * (x.toc/g.fr)) + (g.p.grav / -2)*((x.toc/g.fr)**2));
        if (x.y < x.high) x.high = x.y
        if (x.y > x.floor){
            x.y = x.floor
        }
        if (x.y >= g.p.y - x.rad) {
            x.toc = 0;
        }
    }
    fill(x.r,x.g,x.b);
    stroke(x.stroke, x.stroke, x.stroke);
    circle(x.x, x.y, x.size)
}

function draw(){
    background(25, 255, 255)
    for(i=0; i<dot.length; i++){
        bounce(dot[i])
    }
    image(img[g.bCount % balls.length].img, img[g.bCount % balls.length].place[0], img[g.bCount % balls.length].place[1], img[g.bCount % balls.length].size, img[g.bCount % balls.length].size);
    g.count++
    if (g.count < 300 && g.rCount == 0){
        textSize(50)
        text(`Space to Switch Balls`, 200, 50 );
        text(`"R" to Restart`, 200, 100 );
    }
}

function keyPressed(){
    if (keyCode == 32){
        g.bCount++
    }
    if (keyCode == 82){
        dot = [{}]
        g.dotCount = 0
        g.rCount++
    }
}

function makeBall(){
    dot.push({
        size: balls[g.bCount%balls.length].size,
        ogx: mouseX,
        ogy: mouseY,
        vel: 0,
        vi: 0,
        high: g.p.y,
        time: 0,
        tic: 0,
        toc: 0,
        boop: 0,
        floor: 0,
        fric: balls[g.bCount%balls.length].fric, 
        r: balls[g.bCount%balls.length].r,
        g: balls[g.bCount%balls.length].g,
        b: balls[g.bCount%balls.length].b,
        stroke: balls[g.bCount%balls.length].stroke
    })
    g.dotCount++
    dot[g.dotCount].rad = dot[g.dotCount].size/2
    dot[g.dotCount].x = dot[g.dotCount].ogx
    dot[g.dotCount].y = dot[g.dotCount].ogy
    dot[g.dotCount].floor = g.p.y - dot[g.dotCount].rad
}

function mouseDragged(){
    makeBall();
}
function mouseClicked(){
    makeBall();
}