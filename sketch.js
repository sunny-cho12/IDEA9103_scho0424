// ====================
// 1. GLOBAL VARIABLES
// ====================

// images setup
let bgImg, bullImg;

// segment setup for grid cells
let bgSegments = [];
let bullSegments = [];

let gridSize = 15; // how many grid cells across and down
let shapeSize = 1.2; // size of each shape (multiplier) 
let bullGridSize = 30; // how many grid cells across and down
let bullShapeSize = 1.5; // size of each shape (multiplier) 

// =====================================
// 2. PRELOAD - load images before setup
// =====================================

function preload() {
  bgImg = loadImage('src/bull_background.png'); // background link
  bullImg = loadImage('src/bull_foreground.png'); // foreground link
}

// =========================
// 3. SETUP - runs at start
// =========================

function setup() {
  createCanvas(windowWidth, windowHeight); // full screen canvas
  
  // loading pixel data of both images to grab the sample colours
  bgImg.loadPixels();
  bullImg.loadPixels();
  
  // create data structures for grid
  createBgSegments();
  createBullSegments();
  
  assignAnimationParams();

  // draw once when starting
  drawAll();

}

// ======================================================================
// 4. CREATE BACKGROUND SEGMENTS - break background image into grid cells
// ======================================================================

function createBgSegments() {
  bgSegments = []; 
  
  // each cell's width over height in pixels of the image
  let segmentWidth = bgImg.width / gridSize;
  let segmentHeight = bgImg.height / gridSize;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      
      // find the pixel roughly in the middle of each grid cell
      let x = col * segmentWidth + segmentWidth / 2;
      let y = row * segmentHeight + segmentHeight / 2;
      
      // sample pixel colour drom the image
      let segmentColor = bgImg.get(x, y);
      
      // randomly pick between circle or square
      let shapeType = floor(random(2));
      
      // stored data as one segment object
      bgSegments.push({
        row: row,
        col: col,
        color: segmentColor,
        shape: shapeType
      });
    }
  }
}

// ======================================================================
// 5. CREATE BULL SEGMENTS - break the foreground image into grid cells
// ======================================================================

function createBullSegments() {
  bullSegments = [];

  // each cell's width over height in pixels of the image
  let segmentWidth = bullImg.width / bullGridSize;
  let segmentHeight = bullImg.height / bullGridSize;
  
  for (let row = 0; row < bullGridSize; row++) {
    for (let col = 0; col < bullGridSize; col++) {
      
      // find the pixel roughly in the middle of each grid cell
      let x = col * segmentWidth + segmentWidth / 2;
      let y = row * segmentHeight + segmentHeight / 2;
      
      // sample pixel colour drom the image
      let segmentColor = bullImg.get(x, y);
      
      // randomly pick between circle or square
      let shapeType = floor(random(2));
      
      // stored data as one segment object
      bullSegments.push({
        row: row,
        col: col,
        color: segmentColor,
        shape: shapeType
      });
    }
  }
}

// ======================================================================
// 6. DRAW - p5.js main loop, background & bull foreground
// ======================================================================

function draw() {
  drawAll();
}


// ===============================================================
// 9. RESPONSIVENESS - redraw everything when window size changes
// ===============================================================

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);  // resize the canvas itself
  
  // recreate everything based on the new canvas size
  createBgSegments();
  createBullSegments();
  
  assignAnimationParams();

  // redraw all layers
  drawAll();

}
