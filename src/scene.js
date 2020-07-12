import {
  Bodies, Body, Composite, Composites, Constraint, Engine, Events,
  Mouse, MouseConstraint, Render, World,
} from './matter';

const SCENE_WIDTH = window.innerWidth;
const SCENE_HEIGHT = window.innerHeight;
const STRING_X = SCENE_WIDTH - 50;
const LINKS_NUM = 12;
const LINKS_SEP = 0;
const LINKS_LENGTH = SCENE_HEIGHT > 600 ? 30 : 20;
const STRING_WIDTH = 3;
const BALLOON_SIZE = 80;
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
  const group = Body.nextGroup(true);

  const string = Composites.stack(
    STRING_X - (LINKS_LENGTH + LINKS_SEP) * (LINKS_NUM - 0.5),
    GROUND_Y - STRING_WIDTH / 2,
    LINKS_NUM, 1,
    LINKS_SEP, 0,
    (x, y) => Bodies.rectangle(
      x, y, LINKS_LENGTH, STRING_WIDTH,
      {collisionFilter: {group}, density: 0.0001},
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
  const balloon = Bodies.rectangle(
    firstLink.position.x - LINKS_LENGTH / 2 - BALLOON_SIZE / 2,
    firstLink.position.y - BALLOON_SIZE / 2,
    BALLOON_SIZE, BALLOON_SIZE,
    {density: 0.0001},
  );

  Composite.add(string, Constraint.create({
    bodyA: firstLink,
    pointA: {x: -LINKS_LENGTH / 2, y: 0},
    bodyB: balloon,
    pointB: {x: BALLOON_SIZE / 2, y: BALLOON_SIZE / 2},
  }));

  Composite.add(string, balloon);

  // Apply forces to the balloon

  function applyForces(t) {
    // Force upwards
    Body.applyForce(balloon,
      {x: balloon.position.x, y: -10}, {x: 0, y: -0.001});

    // Wind force
    Body.applyForce(balloon,
      {x: -10, y: balloon.position.y},
      {
        x: -0.00002 * (3 + Math.sin((t * 3) / 1000)) * (3 + Math.sin(t / 1000)),
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

  // This resizes the canvas, but doesn't reposition the scene elements
  // window.addEventListener('resize', () => {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // });
}
