// piece.js: reads window.sense inside its own frame loop and answers.
// It renders an abstract field whose softness, darkness and detail respond to
// the state. It reads the sensor object, never the camera.

const canvas = document.querySelector('#piece');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
}
addEventListener('resize', resize);
resize();

function frame() {
  const { state } = window.sense;
  const width = innerWidth;
  const height = innerHeight;
  const min = Math.min(width, height);

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  ctx.fillStyle = '#10131a';
  ctx.fillRect(0, 0, width, height);

  if (state !== 'nobody') {
    const sadness = state === 'sadness';
    const focus = state === 'focus';
    const blur = focus ? 1 : sadness ? 22 : 12;

    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    const forms = [
      [width * 0.34, height * 0.42, min * 0.31, '#658e9b'],
      [width * 0.62, height * 0.39, min * 0.27, '#bc806b'],
      [width * 0.49, height * 0.66, min * 0.3, '#7773a1'],
    ];
    for (const [x, y, radius, color] of forms) {
      const gradient = ctx.createRadialGradient(x, y, radius * 0.08, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(16, 19, 26, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    if (focus) {
      ctx.strokeStyle = 'rgba(242, 239, 233, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, min * 0.19, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, min * 0.24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#f2efe9';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, min * 0.012, 0, Math.PI * 2);
      ctx.fill();
    }

    if (sadness) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, min * 0.12,
        width / 2, height / 2, min * 0.78
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.82)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
