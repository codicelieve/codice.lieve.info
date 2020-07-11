import {
  Engine, Render, World, Bodies, Body, Composites, Composite, Constraint,
  Mouse, MouseConstraint,

} from '../node_modules/matter-js/build/matter.min';

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
});

const group = Body.nextGroup(true);

const string = Composites.stack(100, 40, 8, 1, 10, 10,
  (x, y) => Bodies.rectangle(x, y, 40, 5, {collisionFilter: {group}}));

Composites.chain(string, 0.5, 0, -0.5, 0,
  {stiffness: 0.8, length: 2, render: {type: 'line'}});

Composite.add(string, Constraint.create({
  bodyB: string.bodies[0],
  pointB: {x: -25, y: 0},
  pointA: {x: string.bodies[0].position.x, y: string.bodies[0].position.y},
  stiffness: 0.5,
}));

const balloon = Bodies.rectangle(100 + 50 * 8 + 40, 50 + 40, 80, 80);
Composite.add(string, balloon);

Composite.add(string, Constraint.create({
  bodyA: string.bodies[7],
  pointA: {x: 25, y: 2.5},
  bodyB: balloon,
  pointB: {x: -40, y: -40},
  stiffness: 0.5,
}));

const ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

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
