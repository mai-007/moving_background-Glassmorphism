'use client'
// OrbCanvas.js
import React, { useEffect, useRef } from 'react';
import { Application, Graphics } from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';

const random = (min, max) => Math.random() * (max - min) + min;

const map = (n, start1, end1, start2, end2) =>
  ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;

class Orb {
  constructor(app) {
    this.bounds = this.setBounds();
    this.x = random(this.bounds.x.min, this.bounds.x.max);
    this.y = random(this.bounds.y.min, this.bounds.y.max);
    this.scale = 1;
    this.fill = randomColor();
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    this.inc = 0.002;
    this.graphics = new Graphics();
  }

  setBounds() {
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    return {
      x: { min: originX - maxDist, max: originX + maxDist },
      y: { min: originY - maxDist, max: originY + maxDist },
    };
  }

  update() {
    const xNoise = Math.random() * 2 - 1;
    const yNoise = Math.random() * 2 - 1;
    const scaleNoise = Math.random() * 2 - 1;

    this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
    this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    this.graphics.clear();
    this.graphics.beginFill(this.fill);
    this.graphics.drawCircle(0, 0, this.radius);
    this.graphics.endFill();
  }
}

const randomColor = () => {
  const colorChoices = [
    0x4CAF50, // Green
    0xFFC107, // Amber
    0x2196F3, // Blue
  ];

  return colorChoices[Math.floor(Math.random() * colorChoices.length)];
};

const OrbCanvas = () => {
  const appRef = useRef(null);
  const orbs = useRef([]);

  useEffect(() => {
    const app = new Application({
      resizeTo: window,
      transparent: true,
    });

    appRef.current.appendChild(app.view);

    // Initialize orbs
    for (let i = 0; i < 10; i++) {
      const orb = new Orb(app);
      app.stage.addChild(orb.graphics);
      orbs.current.push(orb);
    }

    // Animate orbs
    app.ticker.add(() => {
      orbs.current.forEach((orb) => {
        orb.update();
        orb.render();
      });
    });

    // Apply filter after initialization
    app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

    // Cleanup
    return () => {
      app.destroy(true);
      orbs.current = [];
    };
  }, []);

  return <div ref={appRef} />;
};

export default OrbCanvas;
