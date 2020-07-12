/* Pretty much the matter-js/src/module/main.js module,
 * with the parts I don't need removed. */

const Matter = require('../node_modules/matter-js/src/core/Matter');
Matter.Body = require('../node_modules/matter-js/src/body/Body');
Matter.Composite = require('../node_modules/matter-js/src/body/Composite');
Matter.World = require('../node_modules/matter-js/src/body/World');

// Matter.Contact = require('../node_modules/matter-js/src/collision/Contact');
// Matter.Detector = require(
//  '../node_modules/matter-js/src/collision/Detector');
// Matter.Grid = require('../node_modules/matter-js/src/collision/Grid');
// Matter.Pairs = require('../node_modules/matter-js/src/collision/Pairs');
// Matter.Pair = require('../node_modules/matter-js/src/collision/Pair');
// Matter.Query = require('../node_modules/matter-js/src/collision/Query');
// Matter.Resolver = require(
//  '../node_modules/matter-js/src/collision/Resolver');
// Matter.SAT = require('../node_modules/matter-js/src/collision/SAT');

Matter.Constraint = require(
  '../node_modules/matter-js/src/constraint/Constraint',
);
Matter.MouseConstraint = require(
  '../node_modules/matter-js/src/constraint/MouseConstraint',
);

Matter.Common = require('../node_modules/matter-js/src/core/Common');
Matter.Engine = require('../node_modules/matter-js/src/core/Engine');
Matter.Events = require('../node_modules/matter-js/src/core/Events');
Matter.Mouse = require('../node_modules/matter-js/src/core/Mouse');
Matter.Runner = require('../node_modules/matter-js/src/core/Runner');
// Matter.Sleeping = require('../node_modules/matter-js/src/core/Sleeping');
// Matter.Plugin = require('../node_modules/matter-js/src/core/Plugin');

// @if DEBUG
Matter.Metrics = require('../node_modules/matter-js/src/core/Metrics');
// @endif

Matter.Bodies = require('../node_modules/matter-js/src/factory/Bodies');
Matter.Composites = require('../node_modules/matter-js/src/factory/Composites');

// Matter.Axes = require('../node_modules/matter-js/src/geometry/Axes');
// Matter.Bounds = require('../node_modules/matter-js/src/geometry/Bounds');
// Matter.Svg = require('../node_modules/matter-js/src/geometry/Svg');
// Matter.Vector = require('../node_modules/matter-js/src/geometry/Vector');
// Matter.Vertices = require('../node_modules/matter-js/src/geometry/Vertices');

Matter.Render = require('../node_modules/matter-js/src/render/Render');
// Matter.RenderPixi = require(
//  '../node_modules/matter-js/src/render/RenderPixi');

// aliases

Matter.World.add = Matter.Composite.add;
Matter.World.remove = Matter.Composite.remove;
Matter.World.addComposite = Matter.Composite.addComposite;
Matter.World.addBody = Matter.Composite.addBody;
Matter.World.addConstraint = Matter.Composite.addConstraint;
Matter.World.clear = Matter.Composite.clear;
Matter.Engine.run = Matter.Runner.run;

module.exports = Matter;
