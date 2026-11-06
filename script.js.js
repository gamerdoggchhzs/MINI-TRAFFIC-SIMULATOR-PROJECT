const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

const message = document.getElementById("trafficMessage");

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");

const road = document.querySelector(".road");

let currentLight = "stop";
let movementTimer = null;

/* BUTTON FUNCTIONS */

document.getElementById("stopButton").onclick = function() {
    setLight("stop");
};

document.getElementById("waitButton").onclick = function() {
    setLight("wait");
};

document.getElementById("goButton").onclick = function() {
    setLight("go");
};

document.getElementById("resetButton").onclick = function() {
    resetSimulation();
};

/* TRAFFIC LIGHT FUNCTION */

function setLight(color) {

    currentLight = color;

    red.classList.toggle("active", color === "stop");
    yellow.classList.toggle("active", color === "wait");
    green.classList.toggle("active", color === "go");

    if (color === "stop") {

        message.innerHTML = "STOP! Red Light";
        message.style.color = "red";

        stopCars();

    }

    else if (color === "wait") {

        message.innerHTML = "WAIT! Yellow Light";
        message.style.color = "orange";

        stopCars();

    }

    else if (color === "go") {

        message.innerHTML = "GO! Green Light";
        message.style.color = "green";

        moveCars();

    }

}

/* VEHICLE MOVEMENT */

function moveCars() {

    clearTimeout(movementTimer);

    if (currentLight !== "go") {
        return;
    }

    let end = Math.max(5, road.clientWidth - 55);

    car1.style.transition = "left 3s linear";
    car2.style.transition = "left 3s linear";

    car1.style.left = end + "px";
    car2.style.left = end + "px";

    movementTimer = setTimeout(function() {

        if (currentLight === "go") {

            car1.style.transition = "none";
            car2.style.transition = "none";

            car1.style.left = "5px";
            car2.style.left = "5px";

            void car1.offsetWidth;

            moveCars();

        }

    }, 3100);

}

/* STOP VEHICLES */

function stopCars() {

    clearTimeout(movementTimer);

    let carPosition = getComputedStyle(car1).left;
    let bikePosition = getComputedStyle(car2).left;

    car1.style.transition = "none";
    car2.style.transition = "none";

    car1.style.left = carPosition;
    car2.style.left = bikePosition;

}

/* RESET SIMULATION */

function resetSimulation() {

    clearTimeout(movementTimer);

    currentLight = "stop";

    car1.style.transition = "none";
    car2.style.transition = "none";

    car1.style.left = "5px";
    car2.style.left = "5px";

    setLight("stop");

    message.innerHTML = "Simulation Reset!";
}

/* VEHICLE REGISTRATION */

document.getElementById("vehicleForm").onsubmit = function(event) {

    event.preventDefault();

    let name = document.getElementById("driver").value.trim();

    let type = document.getElementById("type").value;

    let destination = document.getElementById("destination").value;

    let purpose = document.getElementById("purpose").value;

    document.getElementById("registrationResult").style.display = "block";

    document.getElementById("registrationResult").innerHTML =

        "<h3>Vehicle Registered Successfully!</h3>" +

        "Driver's Name: " + escapeHTML(name) + "<br>" +

        "Vehicle Type: " + escapeHTML(type) + "<br>" +

        "Destination: " + escapeHTML(destination) + "<br>" +

        "Purpose of Travel: " + escapeHTML(purpose);

    this.reset();

};

/* SECURITY */

function escapeHTML(text) {

    return text.replace(/[&<>"']/g, function(char) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];

    });

}

/* DEFAULT LIGHT */

setLight("stop");