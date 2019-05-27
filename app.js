const canvas = document.querySelector('#myCanvas');
const canvas2 = document.querySelector('#myCanvas2');
w = window.innerWidth;
h = window.innerHeight;
const app = new PIXI.Application({
view:canvas,
width:w,
height:h,
transparent:true,
autoDensity:true,
resolution:devicePixelRatio
});
const stage = new PIXI.Container();

window.addEventListener('resize', resize);
function resize()
{
    w = window.innerWidth;
    h = window.innerHeight;
    //starAmount = 50;
       
    app.renderer.resize(w,h);
}

const starTexture = PIXI.Texture.from('hex4.png');
const btn = document.querySelector('.btn');
const starAmount = 1000;
let cameraZ = 2;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 1;
const starStretch = 0;
const starBaseSize = 0.05;


// Create the stars
const stars = [];
for (let i = 0; i < starAmount; i++) {
    const star = {
        sprite: new PIXI.Sprite(starTexture),
        z: 0,
        x: 0,
        y: 0,
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

// Change flight speed every 5 seconds
setInterval(() => {
    warpSpeed = warpSpeed > 0 ? 0 : 1;
}, 5000);

// Listen for animate update
app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
        const star = stars[i];
        if (star.z < cameraZ) randomizeStar(star);

        // Map star 3d position to 2d with really simple projection
        const z = star.z - cameraZ;
        star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;
        star.sprite.interactive = true;
 star.sprite.buttonMode = true;
        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.sprite.scale.x = distanceScale * starBaseSize;
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
});


let graphic = new PIXI.Graphics();
graphic.x = app.renderer.width / 2;
graphic.y = app.renderer.height / 2;
graphic.lineStyle(2,0xffffff);
graphic.drawRect(-115,405,250,50);
graphic.endFill();
app.stage.addChild(graphic);

app.ticker.add(animate);
delta = 0;


let graphic2 = new PIXI.Graphics();
graphic2.x = app.renderer.width / 2;
graphic2.y = app.renderer.height / 2;
graphic2.lineStyle(2, 0xffffff);
graphic2.beginFill(0xffffff);
graphic2.end
graphic2.drawRect(-120,400, 250, 50);

app.stage.addChild(graphic2);

const main1 = new PIXI.Text('A portal',{
    fontFamily: 'Acme',
    fontSize: 70,
    fill: 'White',
    align: 'left',
});
app.stage.addChild(main1);
main1.position.set(w/2, h/2);
//graphic2.on('pointerdown', buttonDown);

const main2 = new PIXI.Text('for learning',{
    fontFamily: 'Acme',
    fontSize: 70,
    fill: 'White',
    align: 'left',
});
app.stage.addChild(main2);
main2.position.set(w/2, h/2);
// (function() {
//     const wf = document.createElement('script');
//     wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
//     }:https://fonts.googleapis.com/css?family=Acme&display=swap`;
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     const s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
// }());



const text = new PIXI.Text('Scroll Down',{
    fontFamily: 'Acme',
    fontSize: 30,
    fill: 'Black',
    align: 'left',
});
graphic2.addChild(text);
text.position.set(-100, 400);

function animate()
{
    
    delta +=0.1;

    graphic2.x = app.screen.width / 2
    graphic2.y = app.screen.height / 2;
    graphic.x = app.screen.width / 2
    graphic.y = app.screen.height / 2;

    main1.style.width = app.screen.width / 2;
    main1.style.height = app.screen.height / 2;
   
   main2.style.width = app.screen.width / 2;
   main1.position.set(10,100);
   
   main2.position.set(10,200);
   
    
    graphic2.y = Math.sin(delta) * 10;
    graphic.y = Math.sin(delta) * 10;
   

    
    app.render(stage);

}


