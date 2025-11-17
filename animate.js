// =====================================
// Individual Variables
// =====================================

// Add variables to control the each movements
let bullAnimation = true;
let backAnimation = true;

// Add viariables to set the grid colour
let gridColour;

// =====================================
// 1. Animation Parameters
// =====================================


function assignAnimationParams() {
  
  // Individual code
  // If no colour has been set yet, set the intial Colour of grid as 250 
  if (!gridColour) {
    gridColour = color(250); 
  }

  for (let seg of bgSegments) {
    seg.rate = random(0.01, 0.03);   // rate
    seg.amp = random(0.2, 0.5);      // amplitude/how big the change is
    seg.phase = random(TWO_PI);      // where the shape starts in its cycle
  }
  for (let seg of bullSegments) {
    seg.rate = random(0.02, 0.06);  
    seg.amp = random(0.3, 0.7);      
    seg.phase = random(TWO_PI);
  }
}
// =====================================
// 2. Background Pattern
// =====================================

function drawBgPattern() {
  noStroke(); // no outline around shapes
  let size = min(width, height); // keep square aspect ratio
  let startX = (width - size) / 2; // center horizontally
  let startY = 0; // start from under the explanation text

  for (let seg of bgSegments) {
    let cellSize = size / gridSize;
    let x = startX + (seg.col + 0.5) * cellSize;
    let y = startY + (seg.row + 0.5) * cellSize;

    // If backAnimation is active, apply the animation to the background
    let pulse = 0;
    if (backAnimation) {
      pulse = sin(frameCount * seg.rate + seg.phase) * seg.amp;
    }

    // base size plus the pulse
    let w = cellSize * (shapeSize + pulse);
    let h = cellSize * (shapeSize + pulse);

    fill(seg.color); // use the color from the image

    if (seg.shape === 0) {
      ellipse(x, y, w, h); // draw circle
    } else {
      rectMode(CENTER);
      rect(x, y, w, h); // draw square
    }
  }
}

// =====================================
// 3. ANIMATION
// =====================================

function drawBullPattern() {
  noStroke();

  // Adjust Position of bull
  // Use the smaller dimension of the screen to keep the bull correctly scaled
  let size = min(width, height); 
  let scale = (size / bullImg.width) * 0.8;

  let patternWidth = bullImg.width * scale;
  let patternHeight = bullImg.height * scale;
  let startX = (width - patternWidth) / 2;
  let startY = (size - patternHeight) / 2;

  for (let seg of bullSegments) {
    let cellW = patternWidth / bullGridSize;
    let cellH = patternHeight / bullGridSize;
    let x = startX + (seg.col + 0.5) * cellW;
    let y = startY + (seg.row + 0.5) * cellH;

    let cellSize = min(cellW, cellH);

    // If backAnimation is active, apply the animation to the bull
    let pulse = 0;
    if (bullAnimation) {
      pulse = sin(frameCount * seg.rate + seg.phase) * seg.amp;
    }

    let w = cellSize * (bullShapeSize + pulse);
    let h = cellSize * (bullShapeSize + pulse);

    fill(seg.color);

    if (seg.shape === 0) {
      ellipse(x, y, w, h);
    } else {
      rectMode(CENTER);
      rect(x, y, w, h);
    }
  }
}

// =====================================
// 4. DRAW EVERYTHING TOGETHER
// =====================================

function drawAll() {
  background(gridColour); // change the background colour
  drawBgPattern();       // draw animated background
  drawBullPattern();     // draw animated bull foreground
}


// =====================================
// 5. USER INPUT INTERACTION WITH KEYBOARD AND MOUSE
// =====================================

// Update backAnimation and bullAnimation if specific key (w, a) is pressed.

function keyPressed() {
   if (key === 'w') {
    backAnimation = !backAnimation; // Switches the background movement between active and paused
  }
  
  if (key === 'a') {
    bullAnimation = !bullAnimation; // Switches the bull movement between active and paused
  }
}

// Inspired by Mona Lisa Part 4 example from week 7 class 
// Get the colour of a part of an image
// If mouse is clicked specific grid, the background colour changes
function mousePressed() {
  gridColour = get(mouseX, mouseY);
} 