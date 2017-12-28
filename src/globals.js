/* globals Bump */
/* exported Container, Sprite, Point, Graphics, explorerSpeed, PIXIText, BitmapText, cd */
// Setup APIs
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Point = PIXI.Point;
const Graphics = PIXI.Graphics;
const PIXIText = PIXI.Text; // Text seems to be another predefined variable. So can't use that.
const BitmapText = PIXI.extras.BitmapText;
// global constants
const explorerSpeed = 2;

// Collision detection
const cd = new Bump(PIXI);
