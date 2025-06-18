const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: null,
  y: null
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = 10 + Math.random() * 20;
    this.speed = 2 + Math.random() * 4;
    this.drift = 0;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      this.drift = dx > 0 ? 2 : -2;
    } else {
      this.drift *= 0.95;
    }

    this.y += this.speed;
    this.x += this.drift;

    if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = '#8ecae6';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

const drops = Array.from({ length: 300 }, () => new Drop());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach(drop => {
    drop.update();
    drop.draw();
  });
  requestAnimationFrame(animate);
}

animate();
