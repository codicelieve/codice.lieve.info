import {
  Bodies, Body, Composite, Composites, Constraint, Engine, Events,
  Mouse, MouseConstraint, Render, Vertices, World,
} from './matter';

// It would be needed if there were convex polygonx
// window.decomp = require('poly-decomp');
window.decomp = true;

const SCENE_WIDTH = window.innerWidth;
const SCENE_HEIGHT = window.innerHeight;
const STRING_X = SCENE_WIDTH - 50;
const LINKS_NUM = 12;
const LINKS_SEP = 0;
const LINKS_LENGTH = SCENE_HEIGHT > 600 ? 30 : 20;
const STRING_WIDTH = 3;
const GROUND_Y = SCENE_HEIGHT - 60;

export default function animateScene(canvas) {
  // create an engine and a renderer
  const engine = Engine.create();
  const render = Render.create({
    element: document.body,
    engine,
    canvas,
    options: {width: SCENE_WIDTH, height: SCENE_HEIGHT},
  });

  // Ground
  const ground = Bodies.rectangle(
    SCENE_WIDTH / 2, GROUND_Y + 50, SCENE_WIDTH * 10, 100, {isStatic: true},
  );

  // Balloon string
  const string = Composites.stack(
    STRING_X - (LINKS_LENGTH + LINKS_SEP) * (LINKS_NUM - 0.5),
    GROUND_Y - STRING_WIDTH / 2,
    LINKS_NUM, 1,
    LINKS_SEP, 0,
    (x, y) => Bodies.rectangle(
      x, y, LINKS_LENGTH, STRING_WIDTH,
      {density: 0.0001},
    ),
  );
  Composites.chain(string, 0.5, 0, -0.5, 0,
    {render: {type: 'line'}});

  const firstLink = string.bodies[0];
  const lastLink = string.bodies[LINKS_NUM - 1];

  Composite.add(string, Constraint.create({
    pointA: {
      x: lastLink.position.x + LINKS_LENGTH / 2,
      y: lastLink.position.y,
    },
    bodyB: lastLink,
    pointB: {x: LINKS_LENGTH / 2, y: 0},
  }));

  // Attach a balloon to the string
  // TODO: balloon and string shouldn't collide
  const balloon = Bodies.fromVertices(
    firstLink.position.x - LINKS_LENGTH / 2,
    firstLink.position.y,
    Vertices.fromPath(`
0 0   4.9 -1.8   23.6 -28.5   28.3 -49.1   22.7 -66.7   11 -78.9
0 -82  -11 -78.9  -22.7 -66.7  -28.3 -49.1  -23.6 -28.5  -4.9 -1.8`),
    {density: 0.0001},
  );
  Body.scale(balloon, 1.4, 1.4); // I made it too small...
  // Raise up the balloon to align the bottom with the end of the string
  Body.translate(balloon, {x: 0, y: balloon.position.y - balloon.bounds.max.y});

  // Store the vertical section now that the balloon is vertical so it's maximal
  // we will use it to approximate the flow of air hitting the balloon
  balloon.maxSection = balloon.bounds.max.y - balloon.bounds.min.y;

  Composite.add(string, Constraint.create({
    bodyA: firstLink,
    pointA: {x: -LINKS_LENGTH / 2, y: 0},
    bodyB: balloon,
    pointB: {x: 0, y: (balloon.bounds.max.y - balloon.bounds.min.y) / 2},
  }));

  Composite.add(string, balloon);

  // Apply forces to the balloon

  function applyForces(t) {
    // Force upwards
    Body.applyForce(balloon,
      {x: balloon.position.x, y: -10}, {x: 0, y: -0.001});

    // Wind force
    const section = balloon.bounds.max.y - balloon.bounds.min.y;
    const flow = section / balloon.maxSection; // flow factor between 0 and 1
    Body.applyForce(balloon,
      {x: -10, y: balloon.position.y},
      {
        x: -0.00002 * flow
          * (3 + Math.sin((t * 3) / 1000)) * (3 + Math.sin(t / 1000)),
        y: 0,
      });
  }

  Events.on(engine, 'afterUpdate', (e) => applyForces(e.timestamp));

  // add all of the bodies to the world
  World.add(engine.world, [string, ground]);

  // add mouse control
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(
    engine, {mouse, constraint: {stiffness: 0.02, render: {visible: false}}},
  );

  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  // run the engine and the renderer
  Engine.run(engine);
  Render.run(render);
}
