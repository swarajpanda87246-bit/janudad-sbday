
const wishMessage =
  "Papa, thank you for every quiet sacrifice and every lesson you taught us without saying a word. " +
  "Wishing you good health, lots of smiles and all the happiness in the world. " +
  "Happy Birthday! I love you.";

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colors = ["#ffb627", "#ff7a1a", "#ff6b9d", "#6ea8ff", "#fff6e0"];


function launchConfetti() {
  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.5,
      speedX: (Math.random() - 0.5) * 16,
      speedY: -Math.random() * 16 - 4,
      size: Math.random() * 7 + 5,
      angle: Math.random() * 6,
      color: colors[i % colors.length],
      life: 1
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  pieces = pieces.filter(function (p) { return p.life > 0; });

  pieces.forEach(function (p) {
    p.x += p.speedX;
    p.y += p.speedY;
    p.speedY += 0.35;     
    p.angle += 0.2;
    p.life -= 0.008;

    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });

  if (pieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}


// ---------- floating balloons ----------
const balloonBox = document.getElementById("balloons");
const balloonColors = ["#ff6b9d", "#ffb627", "#6ea8ff", "#ff7a1a", "#7be0a4", "#c792ea"];

for (let i = 0; i < 12; i++) {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.left = Math.random() * 95 + "%";
  balloon.style.background = balloonColors[i % balloonColors.length];
  balloon.style.animationDuration = 14 + Math.random() * 12 + "s";
  balloon.style.animationDelay = -Math.random() * 20 + "s";
  balloonBox.appendChild(balloon);
}



const gift = document.getElementById("gift");

if (gift) {
  gift.addEventListener("click", function () {
    gift.classList.add("open");               
    launchConfetti();
    document.getElementById("heading").textContent = "Happy Birthday!";
    document.getElementById("hint").textContent = "";

    
    setTimeout(launchConfetti, 600);
    setTimeout(function () {
      document.body.classList.add("leaving"); 
    }, 2000);
    setTimeout(function () {
      window.location.href = "wish.html";
    }, 2800);
  });
}



const wishText = document.getElementById("wish-text");

if (wishText) {
  
  setTimeout(launchConfetti, 500);

 
  setTimeout(function () {
    let i = 0;
    wishText.classList.add("typing");

    const timer = setInterval(function () {
      wishText.textContent += wishMessage[i];
      i++;
      if (i >= wishMessage.length) {
        clearInterval(timer);
        wishText.classList.remove("typing");
        launchConfetti();
      }
    }, 45);
  }, 2800);

  document.getElementById("more").addEventListener("click", launchConfetti);
}
