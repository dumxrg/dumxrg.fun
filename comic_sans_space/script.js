const texts = ["WOW","LOL","SO AMAZE","SO TYPOGRAFY","COMIC SANSSS!!!!!!!!","much text","Yep i said comic sans...","Lorem impsum","plz","click","such rounded",
  "hello world","</doge>","SUCH COMIC","VERY SANS MS","MUCH MEME", "MUCH DESING","AMAZE","SO COOL","MUCH COOL","SUCH COMIC","VERY LOL","better than times new roman","better than impact"]
const textElem = document.getElementById("text");
const counter = document.getElementById("counter");
let feverCounter = 0
const fire = document.getElementById("fire")
fire.setAttribute("draggable", false)

const sounds = {
  bg:"assets/bg.mp3",
  click:["assets/minecraft-dog-bark.mp3","assets/beep.mp3","assets/undertale-ding.mp3","assets/taunt.mp3","assets/hitmarker.mp3"],
  milestone:["assets/horn.mp3","assets/undertale-victory.mp3","assets/bonk.mp3", "assets/pan.mp3",]
}
let actualClickSound = "assets/minecraft-dog-bark.mp3"
const getRandom = (arr)=>{

return arr[Math.floor(Math.random() * arr.length)];
}
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let duration = 200
let count = 0

let pitch = 1
window.onload = () => {
  fetchAndPlaySound("assets/BG.MP3",1.1,true)
};

window.addEventListener('click', (event) => {
    remainingTime = duration; 
    pitch += 0.012;
    if (fireOpacity>=98){
      count+=10

    }
    else{
    count+= 1;
    }
    const x = event.clientX;
    const y = event.clientY;
    textElem.style.transform = `rotate(${Math.random() * 120 - 60}deg)`;
    if(count%100===0){
     fetchAndPlaySound( getRandom(sounds["milestone"]))
     actualClickSound = getRandom(sounds["click"])
    pitch = 1;
    }else{
   random_event()


    }
    
    
    textElem.style.left = x + "px";
    textElem.style.top = y + "px";
    textElem.textContent = getRandom(texts);
    counter.innerText = count;
});
const random_event = ()=>{
 if( Math.floor(Math.random() * 100) ===1){
fetchAndPlaySound("assets/discord_beep.mp3")
 }else{

 
  fetchAndPlaySound(actualClickSound, pitch);
 }
}
let remainingTime = 0;

function createBouncingRotatingImage(source) {
  const img = document.createElement('img');
  img.className = "rotating"

  img.setAttribute("draggable", false)
  img.src = source;
  document.body.appendChild(img);

  let x = Math.random()*1000;
  let y =  Math.random()*1000;
  let vx = 160 + Math.random()*100;
  let vy =  200 + Math.random()*100;
  let angle = 0;
  let angularVelocity = 180;

  let lastTime = performance.now();

  function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    x += vx * deltaTime;
    y += vy * deltaTime;

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    if (x <= 0 || x + imgWidth >= window.innerWidth) {
      vx *= -1;
      x = Math.max(0, Math.min(x, window.innerWidth - imgWidth));
    }

    if (y <= 0 || y + imgHeight >= window.innerHeight) {
      vy *= -1;
      y = Math.max(0, Math.min(y, window.innerHeight - imgHeight));
    }

    angle = (angle + angularVelocity * deltaTime) % 360;

  
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
let fireOpacity = 0
let lastTime = performance.now();

function main(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
 

  if (remainingTime > 0) {
    fireOpacity = fireOpacity +0.25
    textElem.style.display = "block";

    
    remainingTime -= deltaTime;
  } else {
    fireOpacity = Math.max( -20, fireOpacity-16) 
    textElem.style.display = "none";
  }

  fire.style.opacity = fireOpacity+"%"

  requestAnimationFrame(main);
}

requestAnimationFrame(main);

createBouncingRotatingImage("https://media.tenor.com/2roX3uxz_68AAAAM/cat-space.gif");
createBouncingRotatingImage("https://images.steamusercontent.com/ugc/948461489839023228/B24C666D2DA77CA7D853F2F77C9250AA1F1ECF78/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false")
createBouncingRotatingImage("https://media.tenor.com/adoVIoM4eo4AAAAM/keyboard-cat.gif")
createBouncingRotatingImage("https://encrypted-tbn0.gstatic.com/imacreges?q=tbn:ANd9GcS6XEw1MwXcmYiNZnJwWh7LhXu_MFrAqEqMt5I0T717XXyXq5HUMDAgtbUc-6xP-6SVYic&usqp=CAU");
createBouncingRotatingImage("https://s.rfi.fr/media/display/48adfe80-10b6-11ea-b699-005056a99247/w:1280/p:1x1/grumpy_cat.jpg")

  
const fetchAndPlaySound = async (path, pitch = 1.0, loop = false) => {
  try {
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = pitch;
    source.loop = loop;

    source.connect(audioCtx.destination);
    source.start(0);
  } catch (error) {
    console.error("Sound playback failed:", error);
  }
};
