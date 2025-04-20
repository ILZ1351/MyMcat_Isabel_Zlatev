let scene = 0;
let input, button, responseText = "";
let userAnswers = [];
let scenePrompts = [
  "What are you most afraid of?",
  "Describe a memory that shaped you.",
  "What keeps you up at night?",
  "Who do you see in the mirror?"
];
let sceneExplanations = [
  "A dark forest stretches before you. The trees whisper your fears.",
  "A dimly lit room holds fragments of your past.",
  "The ocean's depths reflect your restless thoughts.",
  "A mirror shows more than just your reflection."
];
let bgColors = ["#0a0f0d", "#1e1b18", "#002233", "#111111"];
let capture;
let finalSummary = "";
let particles = [];
let dreamBubbles = [];
let forestTrees = [];
let oceanWaves = [];
let roomObjects = [];
let puzzleActive = false;
let puzzleComplete = false;
let noiseOffset = 0;
let puzzleTime = 0;
let puzzleTarget = 0;

// Modify sceneData to remove the last focus scene and add results scene
const sceneData = [
  {
    title: "The Weight of Uncertainty",
    text: "In the void of possibilities, your fears take form. Watch them float, heavy and light, fast and slow. Each particle carries a story, a worry, a dream. Let them drift, let them swirl, let them be.",
    prompt: "What shapes do you see in the void? What stories do they tell?",
    instructions: "Move through the space. Let your mouse guide you. Watch the particles respond to your presence.",
    typewriterText: "The void whispers... your fears take shape... watch them float... let them be..."
  },
  {
    title: "The Ocean's Depths",
    text: "Beneath the surface, waves of emotion rise and fall. The ocean's rhythm matches your heartbeat, its depths reflect your soul. Watch the waves dance, feel their power, let them carry you.",
    prompt: "What emotions do the waves stir within you?",
    instructions: "Watch the waves. Let them move you.",
    typewriterText: "The waves rise... and fall... like emotions... deep within... your soul..."
  },
  {
    title: "The Mirror's Truth",
    text: "The mirror shows more than just your reflection. It reveals the layers of your being, the stories written in your eyes, the wisdom in your gaze. Look deeper, see beyond the surface.",
    prompt: "What do you see when you look beyond your reflection?",
    instructions: "Look into the mirror. See what lies beneath.",
    typewriterText: "The mirror shows... more than skin... deeper truths... hidden within..."
  },
  {
    title: "Your Journey's Reflection",
    text: "Every step has led to this moment. Your experiences weave together into a unique story.",
    prompt: "How has this journey changed you?",
    instructions: "Watch your story unfold.",
    typewriterText: "Your journey... unique and beautiful... continues to unfold..."
  }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica Neue');
  textAlign(CENTER, CENTER);
  setupInput();

  // Setup webcam capture
  capture = createCapture(VIDEO);
  capture.size(250, 300);
  capture.hide();

  // Initialize scene elements
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  for (let i = 0; i < 20; i++) {
    forestTrees.push(new Tree());
  }
  for (let i = 0; i < 30; i++) {
    oceanWaves.push(new Wave());
  }
  for (let i = 0; i < 10; i++) {
    roomObjects.push(new RoomObject());
  }
}

function setupInput() {
  input = createInput();
  input.position(width / 2 - 150, height - 100);
  input.size(300);

  button = createButton('Submit');
  button.position(input.x + input.width + 10, input.y);
  button.mousePressed(nextScene);
}

function draw() {
  background(bgColors[scene]);
  fill(255);

  if (puzzleActive && scene < 3) {
    drawPuzzle();
    return;
  }

  switch (scene) {
    case 0:
      drawForest();
      break;
    case 1:
      drawOcean();
      break;
    case 2:
      drawMirror();
      break;
    case 3:
      drawFinalAnimation();
      break;
  }

  if (scene < 3) {
    updateSceneText();
  }
}

function drawForest() {
  // Enhanced forest with dynamic trees
  for (let tree of forestTrees) {
    tree.update();
    tree.display();
  }

  // Add floating particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  // Add ambient lighting effect
  let lightX = mouseX;
  let lightY = mouseY;
  for (let i = 0; i < 5; i++) {
    fill(255, 255, 255, 20);
    ellipse(lightX, lightY, 200 - i * 40);
  }
}

function drawOcean() {
  // Enhanced ocean with dynamic waves
  for (let wave of oceanWaves) {
    wave.update();
    wave.display();
  }

  // Add underwater light effect
  let lightY = map(sin(frameCount * 0.02), -1, 1, height/2, height);
  for (let i = 0; i < 3; i++) {
    fill(0, 100, 150, 30);
    ellipse(width/2, lightY, 800 - i * 200, 100);
  }
}

function drawMirror() {
  push();
  translate(width/2, height/2);
  
  // Draw mirror frame
  fill(200, 200, 200, 100);
  stroke(255, 255, 255, 150);
  strokeWeight(3);
  rect(-150, -200, 300, 400, 20);
  
  // Draw mirror surface
  noStroke();
  fill(255, 255, 255, 30);
  rect(-140, -190, 280, 380, 15);
  
  // Create swirling pattern
  for (let i = 0; i < 20; i++) {
    let angle = frameCount * 0.01 + i * 0.1;
    let radius = map(sin(frameCount * 0.02 + i), -1, 1, 50, 150);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    
    // Draw swirling particles
    fill(255, 255, 255, random(50, 100));
    ellipse(x, y, random(2, 5));
    
    // Add connecting lines
    stroke(255, 255, 255, 20);
    line(x, y, x * 0.5, y * 0.5);
  }
  
  // Add floating text
  let textY = 220 + sin(frameCount * 0.05) * 5;
  fill(255, 255, 255, 150);
  textSize(16);
  text("Look deeper...", 0, textY);
  
  pop();
}

function drawFinalAnimation() {
  // Create a darker cosmic background
  let bgGradient = drawingContext.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, 'rgb(10, 0, 20)');
  bgGradient.addColorStop(0.5, 'rgb(20, 0, 40)');
  bgGradient.addColorStop(1, 'rgb(30, 0, 60)');
  drawingContext.fillStyle = bgGradient;
  rect(0, 0, width, height);

  // Draw flowing particles based on user's answers with reduced brightness
  for (let i = 0; i < userAnswers.length; i++) {
    let answer = userAnswers[i];
    let words = answer.split(' ');
    
    for (let j = 0; j < words.length; j++) {
      let angle = frameCount * 0.02 + (i * TWO_PI / userAnswers.length);
      let radius = 150 + sin(frameCount * 0.05 + j) * 50;
      let x = width/2 + cos(angle) * radius;
      let y = height/2 + sin(angle) * radius;
      
      // Draw text with black shadow and reduced brightness
      drawingContext.shadowBlur = 8;
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
      fill(200, 200, 200, 100 + sin(frameCount * 0.1 + j) * 30);
      textSize(12 + sin(frameCount * 0.05 + j) * 2);
      text(words[j], x, y);
    }
  }

  // Draw central mandala with reduced brightness
  push();
  translate(width/2, height/2);
  let rotation = frameCount * 0.01;
  
  for (let i = 0; i < 12; i++) {
    push();
    rotate(rotation + i * TWO_PI/12);
    
    // Draw petal with reduced brightness
    fill(200, 200, 200, 50);
    beginShape();
    for (let j = 0; j < 10; j++) {
      let angle = map(j, 0, 10, 0, PI);
      let r = 100 + sin(angle * 3 + frameCount * 0.05) * 30;
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    pop();
  }
  pop();

  // Draw generated summary with thinner font and shadow
  textAlign(CENTER, CENTER);
  textSize(24);
  drawingContext.shadowBlur = 4;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
  fill(200, 200, 200);
  text(generatePoeticalSummary(), width/2, height - 100);
  
  // Draw restart button with reduced brightness
  drawRestartButton();
}

function generatePoeticalSummary() {
  // Generate a poetic summary based on user's answers
  let themes = analyzeAnswers();
  let summary = "In the depths of " + themes[0] + 
                ", through waves of " + themes[1] + 
                ", your reflection shows " + themes[2];
  return summary;
}

function analyzeAnswers() {
  // Simple analysis of user answers to extract themes
  let themes = [];
  for (let answer of userAnswers) {
    let words = answer.toLowerCase().split(' ');
    let strongestWord = words.reduce((a, b) => b.length > a.length ? b : a);
    themes.push(strongestWord);
  }
  return themes;
}

function drawRestartButton() {
  // Draw a darker restart button
  let buttonX = width/2;
  let buttonY = height - 50;
  let buttonWidth = 120;
  let buttonHeight = 40;
  
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  fill(0, 0, 0, 150);
  rect(buttonX - buttonWidth/2, buttonY - buttonHeight/2, 
       buttonWidth, buttonHeight, 10);
  
  fill(180, 180, 180);
  textSize(16);
  text("Restart Journey", buttonX, buttonY);
  
  // Check for button click
  if (mouseIsPressed && 
      mouseX > buttonX - buttonWidth/2 && 
      mouseX < buttonX + buttonWidth/2 && 
      mouseY > buttonY - buttonHeight/2 && 
      mouseY < buttonY + buttonHeight/2) {
    resetExperience();
  }
}

function nextScene() {
  if (scene < 3) {
    userAnswers.push(input.value());
    input.value("");
    input.hide();
    button.hide();
    
    // Start focus transition
    puzzleActive = true;
    puzzleComplete = false;
    puzzleTime = 0;
    puzzleTarget = random(3, 7); // Random time between 3-7 seconds
  } else if (scene === 3) {
    generateFinalSummary();
  }
}

function drawPuzzle() {
  background(0);
  puzzleTime += deltaTime / 1000;
  
  // Abstract meditation using Perlin noise with reduced brightness
  noStroke();
  for (let i = 0; i < 100; i++) {
    let x = noise(i * 0.1, noiseOffset) * width;
    let y = noise(i * 0.1 + 100, noiseOffset) * height;
    let size = noise(i * 0.1 + 200, noiseOffset) * 50;
    let hue = map(noise(i * 0.1 + 300, noiseOffset), 0, 1, 0, 360);
    
    fill(hue, 50, 50, 100); // Reduced brightness
    ellipse(x, y, size);
  }
  
  noiseOffset += 0.01;
  
  // Progress indicator
  let progress = min(puzzleTime / puzzleTarget, 1);
  
  // Draw focus text with thinner font and shadow
  textFont('Helvetica Neue');
  textStyle(NORMAL); // Changed from BOLD to NORMAL for thinner font
  textSize(32);
  
  // Draw shadow
  drawingContext.shadowBlur = 4;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
  fill(0, 200);
  text("Focus...", width/2 + 2, height/2 - 100 + 2);
  
  // Draw main text with reduced brightness
  fill(180, 180, 180);
  text("Focus...", width/2, height/2 - 100);
  
  // Draw breathing circle with reduced brightness
  noFill();
  stroke(180, 180, 180, 150);
  strokeWeight(4);
  let circleSize = map(sin(frameCount * 0.05), -1, 1, 100, 150);
  ellipse(width/2, height/2 + 50, circleSize, circleSize);
  
  // Draw progress circle with reduced brightness
  arc(width/2, height/2 + 50, 200, 200, 0, progress * TWO_PI);
  
  if (puzzleTime >= puzzleTarget) {
    puzzleActive = false;
    scene++;
    if (scene === 3) {
      generateFinalSummary();
    } else {
      input.show();
      button.show();
    }
  }
}

function updateSceneText() {
  textFont('Helvetica Neue');
  textStyle(BOLD);
  textSize(24);
  fill(255);
  text(scenePrompts[scene], width / 2, 80);
  
  textStyle(NORMAL);
  textSize(18);
  fill(200);
  text(sceneExplanations[scene], width / 2, 120);
}

function generateFinalSummary() {
  let fear = userAnswers[0]?.toLowerCase() || "";
  let memory = userAnswers[1]?.toLowerCase() || "";
  let worry = userAnswers[2]?.toLowerCase() || "";
  let mirror = userAnswers[3]?.toLowerCase() || "";

  if (fear.includes("lonely") || worry.includes("alone")) {
    finalSummary = "You carry the weight of solitude, yet you still reach for connection. Your courage to face isolation speaks volumes about your resilience.";
  } else if (memory.includes("loss") || worry.includes("death")) {
    finalSummary = "Your past haunts you, but it also shows your depth of feeling. The shadows you carry are proof of your capacity to love deeply.";
  } else if (mirror.includes("stranger") || fear.includes("myself")) {
    finalSummary = "You're seeking to understand the parts of you still hidden. This journey of self-discovery is both challenging and beautiful.";
  } else if (fear.includes("failure") || worry.includes("success")) {
    finalSummary = "Your ambition drives you forward, even as it keeps you awake at night. This tension between fear and aspiration is where growth happens.";
  } else if (memory.includes("child") || mirror.includes("young")) {
    finalSummary = "The child within you still speaks, reminding you of simpler times and pure emotions. This connection to your past self is precious.";
  } else {
    finalSummary = "You are a blend of shadow and light, trying to make sense of it all. Your complexity is what makes you uniquely human.";
  }
}

function resetExperience() {
  scene = 0;
  userAnswers = [];
  finalSummary = "";
  input.show();
  button.hide();
  setupInput();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (input && button) {
    input.position(width / 2 - 150, height - 100);
    button.position(input.x + input.width + 10, input.y);
  }
}

// New classes for enhanced visuals
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 5);
    this.speed = random(0.5, 2);
    this.color = color(255, 255, 255, random(50, 150));
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) this.reset();
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Tree {
  constructor() {
    this.x = random(width);
    this.height = random(100, 300);
    this.width = random(20, 40);
    this.sway = random(0.01, 0.03);
  }

  update() {
    this.x += sin(frameCount * this.sway) * 0.5;
  }

  display() {
    fill(34, 139, 34);
    rect(this.x, height - this.height, this.width, this.height);
  }
}

class Wave {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.y = random(height/2, height);
    this.speed = random(0.5, 2);
    this.amplitude = random(20, 50);
    this.phase = random(TWO_PI);
    this.length = random(300, 600);
    this.height = random(10, 30);
    this.color = color(0, random(100, 200), random(150, 255), random(50, 100));
    this.foamColor = color(255, 255, 255, random(50, 150));
  }
  
  update() {
    this.phase += 0.02;
    this.y += sin(frameCount * 0.01) * 0.5;
  }
  
  display() {
    push();
    translate(0, this.y);
    
    // Draw main wave
    noStroke();
    fill(this.color);
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = sin(x * 0.01 + this.phase) * this.amplitude;
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    
    // Draw foam
    fill(this.foamColor);
    beginShape();
    for (let x = 0; x < width; x += 5) {
      let y = sin(x * 0.01 + this.phase) * this.amplitude;
      let foamY = y + random(-5, 5);
      vertex(x, foamY);
    }
    endShape();
    
    // Add sparkles
    if (random() < 0.1) {
      let x = random(width);
      let y = sin(x * 0.01 + this.phase) * this.amplitude;
      fill(255, 255, 255, random(100, 200));
      ellipse(x, y, random(2, 5));
    }
    
    pop();
  }
}

class RoomObject {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 50);
    this.speed = random(0.5, 2);
    this.direction = random(TWO_PI);
  }

  update() {
    this.x += cos(this.direction) * this.speed;
    this.y += sin(this.direction) * this.speed;
    
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.direction = random(TWO_PI);
    }
  }

  display() {
    fill(200, 200, 200, 100);
    ellipse(this.x, this.y, this.size);
  }
}

function setupResultsScene() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(3, 8),
      speed: random(2, 5),
      color: [random(200, 255), random(200, 255), random(200, 255)],
      angle: random(TWO_PI)
    });
  }
}

function drawResultsScene() {
  // Create cosmic background
  let bgGradient = drawingContext.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, 'rgb(20, 0, 40)');
  bgGradient.addColorStop(0.5, 'rgb(40, 0, 80)');
  bgGradient.addColorStop(1, 'rgb(60, 0, 120)');
  drawingContext.fillStyle = bgGradient;
  rect(0, 0, width, height);

  // Draw particles
  drawingContext.shadowBlur = 15;
  for (let p of particles) {
    p.angle += 0.02;
    p.x += cos(p.angle) * p.speed;
    p.y += sin(p.angle) * p.speed;
    
    // Wrap around screen
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    drawingContext.shadowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0.5)`;
    fill(p.color[0], p.color[1], p.color[2]);
    ellipse(p.x, p.y, p.size, p.size);
  }
  
  // Draw central mandala
  push();
  translate(width/2, height/2);
  let rotation = frameCount * 0.01;
  
  for (let i = 0; i < 12; i++) {
    push();
    rotate(rotation + i * TWO_PI/12);
    
    // Draw petal
    fill(255, 255, 255, 100);
    beginShape();
    for (let j = 0; j < 10; j++) {
      let angle = map(j, 0, 10, 0, PI);
      let r = 100 + sin(angle * 3 + frameCount * 0.05) * 30;
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
    
    pop();
  }
  pop();

  // Draw completion message
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Journey Complete", width/2, height/2);
  
  // Draw restart message
  textSize(16);
  text("Click anywhere to restart", width/2, height/2 + 40);
}