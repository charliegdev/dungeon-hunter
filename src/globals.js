/* globals Bump, SpriteUtilities */
// Setup APIs
const Container = PIXI.Container;
const Sprite = PIXI.Sprite;
const Point = PIXI.Point;
const Graphics = PIXI.Graphics;
const PIXIText = PIXI.Text; // Text seems to be another predefined variable. So can't use that.
const AnimatedSprite = PIXI.extras.AnimatedSprite;

const bump = new Bump(PIXI);
const spriteUtils = new SpriteUtilities(PIXI);

export { Container, Sprite, Point, Graphics, PIXIText, AnimatedSprite, bump, spriteUtils };
