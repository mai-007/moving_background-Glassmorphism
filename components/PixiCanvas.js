"use client "

// components/PixiCanvas.js
import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';


const PixiCanvas = () => {
  useEffect(() => {
    // Pixi.js code here
    const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
    document.getElementById('pixi-canvas-container').appendChild(app.view);


    // Generate random circles and make them move
    const circles = [];
    const numberOfCircles = 10;

    for (let i = 0; i < numberOfCircles; i++) {
      const circle = new PIXI.Graphics();
      circle.beginFill(0x00ff00);
      circle.drawCircle(0, 0, 30);
      circle.endFill();

      circle.x = Math.random() * app.screen.width;
      circle.y = Math.random() * app.screen.height;

      // Add the circle to the stage
      app.stage.addChild(circle);
      circles.push(circle);
    }

    // Animation loop
    app.ticker.add(() => {
      circles.forEach((circle) => {
        circle.x += Math.sin(circle.y * 0.05) * 2;
        circle.y += 1;

        if (circle.y > app.screen.height) {
          circle.y = 0;
        }
      });
    });

    // Handle window resize
    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      app.destroy(true);
    };
  }, []); // Run only once on mount

  return <div id="pixi-canvas-container" />;
};

export default PixiCanvas;
