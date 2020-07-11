import {
  Bodies, Body, Composite, Composites, Constraint, Engine, Events,
  Mouse, MouseConstraint, Render, World,
} from '../node_modules/matter-js/build/matter.min';

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 600;
const STRING_X = 200;
const LINKS_NUM = 8;
const LINKS_SEP = 10;
const LINKS_LENGTH = 40;
const STRING_WIDTH = 5;
const BALLOON_SIZE = 80;

const GROUND_Y = SCENE_HEIGHT - 20;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
});

const ground = Bodies.rectangle(
  SCENE_WIDTH / 2, GROUND_Y + 50, SCENE_WIDTH + 10, 100, {isStatic: true},
);

const group = Body.nextGroup(true);

const string = Composites.stack(
  STRING_X, GROUND_Y - STRING_WIDTH / 2, LINKS_NUM, 1, LINKS_SEP, 0,
  (x, y) => Bodies.rectangle(
    x, y, LINKS_LENGTH, STRING_WIDTH,
    {
      collisionFilter: {group},
      density: 0.0001,
    }
  ),
);
Composites.chain(string, 0.5, 0, -0.5, 0,
  {stiffness: 0.8, length: 2, render: {type: 'line'}});

Composite.add(string, Constraint.create({
  pointA: {
    x: string.bodies[LINKS_NUM - 1].position.x,
    y: string.bodies[LINKS_NUM - 1].position.y,
  },
  bodyB: string.bodies[LINKS_NUM - 1],
  pointB: {x: LINKS_LENGTH / 2, y: 0},
  stiffness: 0.5,
}));

// Attach a balloon to the string
const balloon = Bodies.rectangle(
  string.bodies[0].position.x - LINKS_LENGTH / 2 - BALLOON_SIZE / 2,
  string.bodies[0].position.y - BALLOON_SIZE / 2,
  BALLOON_SIZE, BALLOON_SIZE,
  {density: 0.0001},
);

Composite.add(string, Constraint.create({
  bodyA: string.bodies[0],
  pointA: {x: -LINKS_LENGTH / 2, y: 0},
  bodyB: balloon,
  pointB: {x: BALLOON_SIZE / 2, y: BALLOON_SIZE / 2},
  stiffness: 0.5,
}));

Composite.add(string, balloon);

// Apply a vertical force to the balloon
Events.on(engine, 'afterUpdate', () => {
  Body.applyForce(balloon, {x: balloon.position.x, y: -10}, {x: 0, y: -0.001});
});

// add all of the bodies to the world
World.add(engine.world, [string, ground]);

// add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(
  engine, {mouse, constraint: {stiffness: 0.2, render: {visible: false}}},
);

World.add(engine.world, mouseConstraint);
render.mouse = mouse;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
