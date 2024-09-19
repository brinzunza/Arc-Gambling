// Initialize the user's starting points
let userPoints = 10000;
let selectedStartAngle = 0; // User-selected start angle (0-360 degrees)
let selectedEndAngle = 90;  // User-selected end angle (0-360 degrees)
let userBet = 100;          // User-defined bet amount
let isGameRunning = false;  // Track whether the game is running or paused
let interval;               // Store the interval so we can stop it later

// Compute the dimensions
const width = 600;
const height = Math.min(500, width / 2);
const outerRadius = height / 2 - 10;
const innerRadius = outerRadius * 0.75;
const tau = 2 * Math.PI; // Tau constant for a full circle

// Create the SVG container
const svg = d3.select("body") // Append to the body
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

const g = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Arc function
const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);

// Add the background arc (full circle)
const background = g.append("path")
    .datum({ endAngle: tau })
    .style("fill", "#ddd")
    .attr("d", arc);

// Add the foreground arc (dynamic)
const foreground = g.append("path")
    .datum({ endAngle: 0 })
    .style("fill", "orange")
    .attr("d", arc);

// Display user points
const pointsDisplay = d3.select("body").append("div")
    .attr("class", "points-display")
    .text(`Points: ${userPoints}`);

// Display results
const resultsDisplay = d3.select("body").append("div")
    .attr("class", "results-display");

// Function to update bet amount, start and end angles based on user input
function updateUserSelections() {
    selectedStartAngle = parseFloat(document.getElementById("startAngle").value);
    selectedEndAngle = parseFloat(document.getElementById("endAngle").value);
    userBet = parseFloat(document.getElementById("betAmount").value);
}

// Function to check if the user won or lost
function checkWin(currentAngle) {
    const currentDegree = (currentAngle / tau) * 360;

    // Check if the current angle is within the user's selected range
    if (currentDegree >= selectedStartAngle && currentDegree <= selectedEndAngle) {
        const winRatio = 1 - (selectedEndAngle - selectedStartAngle) / 360;
        const winAmount = userBet * winRatio;
        userPoints += winAmount; // Add the winnings to the user's points
        resultsDisplay.text(`You won! You earned ${winAmount.toFixed(2)} points.`);
    } else {
        userPoints -= userBet; // Subtract the bet amount from the user's points
        resultsDisplay.text(`You lost! You lost ${userBet} points.`);
    }

    // Update the displayed points
    pointsDisplay.text(`Points: ${userPoints}`);

    // Check if the user has run out of points
    if (userPoints <= 0) {
        resultsDisplay.text("You've run out of points! Game over.");
        stopGame();
    }
}

// Function for the arc transition
function startArcTransition() {
    interval = d3.interval(function () {
        const randomAngle = Math.random() * tau;

        foreground.transition()
            .duration(750) // Duration of transition
            .attrTween("d", arcTween(randomAngle))
            .on("end", function () {
                checkWin(randomAngle); // Check win after each transition
            });
    }, 1500);
}

// Function to create the arc transition tween
function arcTween(newAngle) {
    return function (d) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    };
}

// Start game function
function startGame() {
    if (!isGameRunning) {
        updateUserSelections(); // Update user selections before starting the game
        isGameRunning = true;   // Mark the game as running
        startArcTransition();   // Start the arc transition
    }
}

// Stop game (pause) function
function stopGame() {
    if (isGameRunning) {
        isGameRunning = false; // Mark the game as paused
        if (interval) {
            interval.stop(); // Stop the interval if it is running
        }
    }
}

// Event listeners for "Start Game" and "Pause Game" buttons
document.getElementById("startGame").addEventListener("click", function() {
    startGame();
});

document.getElementById("stopGame").addEventListener("click", function() {
    stopGame();
});

// Initialize game paused
stopGame();