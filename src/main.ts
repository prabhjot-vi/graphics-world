import { Rect, Vec2, type Triangle } from "./common";

const game = document.getElementById("game") as HTMLCanvasElement;
if (!game) {
  throw Error("Unable to find game canvas");
}

game.width = window.innerWidth;
game.height = window.innerHeight;

window.addEventListener('resize', () => {
  game.width = window.innerWidth;
  game.height = window.innerHeight;
})

const ctx = game.getContext("2d") as CanvasRenderingContext2D;
if (!ctx) {
  throw Error("2D Graphics are not supported on this devise");
}

function clear(colour: string) {
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, game.width, game.height);
}

function ndc_to_canvas({ x, y }: Vec2): Vec2 {
  // -1..1 => 0..2 => 0.5..1.5
  return {
    x: (x + 1) * (game.width / 2),
    y: (1 - y) * (game.height / 2)
  }
}

function point(ndc: Vec2, size: number, colour: string) {
  const v = ndc_to_canvas(ndc);

  ctx.fillStyle = colour;
  ctx.strokeStyle = colour;

  ctx.beginPath();
  ctx.arc(v.x, v.y, size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.stroke();
}

function triangle(ndc: Triangle, colour: string) {
  const v0 = ndc_to_canvas(ndc[0]);
  const v1 = ndc_to_canvas(ndc[1]);
  const v2 = ndc_to_canvas(ndc[2]);

  ctx.strokeStyle = colour;

  ctx.beginPath();
  ctx.moveTo(v0.x, v0.y);
  ctx.lineTo(v1.x, v1.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(v1.x, v1.y);
  ctx.lineTo(v2.x, v2.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(v2.x, v2.y);
  ctx.lineTo(v0.x, v0.y);
  ctx.stroke();
}

const vertexBuffer: Triangle = [
  new Vec2(0.5, -0.5),
  new Vec2(0, 0.5),
  new Vec2(-0.5, -0.5),
]

function render() {
  clear("black");

  for (const v of vertexBuffer) {
    point({ x: v.x, y: v.y }, 5, "#16c016");
  }

  triangle(vertexBuffer, "#16c016");

  requestAnimationFrame(render);
}
render();

// ctx.beginPath()
// ctx.moveTo(0, 0)
// ctx.lineTo(game.width, game.height)
// ctx.stroke()


