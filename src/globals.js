/* globals Bump */
// Setup APIs
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Point = PIXI.Point;
const Graphics = PIXI.Graphics;
const PIXIText = PIXI.Text; // Text seems to be another predefined variable. So can't use that.

const bump = new Bump(PIXI);

export { Container, Sprite, Point, Graphics, PIXIText, bump };
