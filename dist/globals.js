"use strict";

/* globals Bump */
/* exported Container, Sprite, Point, Graphics, explorerSpeed, PIXIText, BitmapText, cd */
// Setup APIs
var Container = PIXI.Container;
var Sprite = PIXI.Sprite;
var Point = PIXI.Point;
var Graphics = PIXI.Graphics;
var PIXIText = PIXI.Text; // Text seems to be another predefined variable. So can't use that.
var BitmapText = PIXI.extras.BitmapText;
// global constants
var explorerSpeed = 2;

// Collision detection
var cd = new Bump(PIXI);