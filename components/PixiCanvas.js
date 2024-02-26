'use client'

// components/PixiCanvas.js
import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';


const PixiCanvas = () => {
  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    });
    document.getElementById('pixi-canvas-container').appendChild(app.view);

    const circles = [];
    const numberOfCircles = 10;

    const colors = [0xFE9562, 0xFD6696, 0xD964EF];
    const backgroundColor = 0xffffff;

    for (let i = 0; i < numberOfCircles; i++) {
      const circle = new PIXI.Graphics();
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      circle.beginFill(randomColor);
      circle.drawCircle(0, 0, Math.random() * 50 + 30); // Random size between 30 and 80
      circle.endFill();

      circle.x = Math.random() * app.screen.width;
      circle.y = Math.random() * app.screen.height;

      app.stage.addChild(circle);
      circles.push(circle);
    }

    const handleMouseMove = (event) => {
      circles.forEach((circle) => {
        const distance = Math.sqrt(
          Math.pow(event.clientX - circle.x, 2) + Math.pow(event.clientY - circle.y, 2)
        );
        const maxDistance = 200;
        const scaleFactor = Math.max(1 - distance / maxDistance, 0.1);

        circle.scale.set(scaleFactor);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animateCircles = () => {
      circles.forEach((circle) => {
        if (app.screen) {
          const jumpRate = 5; // Higher values make the circles jump more
          circle.x += Math.sin(circle.y * 0.02) * jumpRate;
          circle.y += 1;

          if (circle.y > app.screen.height) {
            circle.y = 0;
          }

          // Randomly change the size
          if (Math.random() < 0.01) {
            circle.scale.set(Math.random() * 0.5 + 0.5); // Random scale between 0.5 and 1
          }
        }
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    const handleResize = () => {
      if (app.screen) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      app.destroy(true);
    };
  }, []); // Run only once on mount

  return <div id="pixi-canvas-container" />;
};

export default PixiCanvas;
