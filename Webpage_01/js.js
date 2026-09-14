// ==========================================
// QUEUESETU - FRONTEND PROTOTYPE
// ==========================================


// ---------- GLOBAL STATE ----------

let selectedSlot = "";
let currentPosition = 7;
let currentQueueNumber = 120;
let servedToday = 74;


// ---------- DATE ----------

const dateInput = document.getElementById("date");

const today = new Date();
const todayString = today.toISOString().split("T")[0];

dateInput.min = todayString;
dateInput.value = todayString;


// ---------- SLOT SELECTION ----------

const slots = document.querySelectorAll(".slot");

slots.forEach(slot => {

    slot.addEventListener("click", () => {

        slots.forEach(s => {
            s.classList.remove("selected");
        });

        slot.classList.add("selected");

        selectedSlot = slot.dataset.time;

        document.getElementById("selectedSlot").value = selectedSlot;

        showToast("Time slot selected: " + selectedSlot);
    });

});


// ---------- BOOKING ----------

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("farmerName").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const centre = document.getElementById("centre").value;

    const date = document.getElementById("date").value;


    // Validation

    if (name.length < 2) {

        showToast("Please enter a valid farmer name.");

        return;
    }


    if (!/^[0-9]{10}$/.test(mobile)) {

        showToast("Please enter a valid 10-digit mobile number.");

        return;
    }


    if (!centre) {

        showToast("Please select a procurement centre.");

        return;
    }


    if (!date) {

        showToast("Please select a date.");

        return;
    }


    if (!selectedSlot) {

        showToast("Please choose a time slot.");

        return;
    }


    // Generate token

    const tokenNumber =
        "A" + Math.floor(100 + Math.random() * 899);


    // Update token screen

    document.getElementById("tokenNumber").textContent = tokenNumber;

    document.getElementById("trackingToken").textContent = tokenNumber;

    document.getElementById("liveNext").textContent = tokenNumber;

    document.getElementById("displayName").textContent = name;

    document.getElementById("displayCentre").textContent = centre;

    document.getElementById("displaySlot").textContent = selectedSlot;


    // Reset queue

    currentPosition = 7;

    document.getElementById("position").textContent = "07";

    document.getElementById("livePosition").textContent = "07";

    document.getElementById("waitTime").textContent = "35 min";

    document.getElementById("liveWait").textContent = "~35 minutes";


    // Show token section

    const tokenSection =
        document.getElementById("tokenSection");

    tokenSection.classList.remove("hidden");


    // Scroll

    setTimeout(() => {

        tokenSection.scrollIntoView({
            behavior: "smooth"
        });

    }, 200);


    showToast(
        "Booking confirmed! Token " + tokenNumber + " generated."
    );

});


// ---------- LIVE QUEUE SIMULATION ----------

const simulateButton =
    document.getElementById("simulateBtn");


simulateButton.addEventListener("click", () => {

    if (currentPosition <= 1) {

        showToast("Your turn is next! Please proceed to the counter.");

        return;
    }


    currentPosition--;

    currentQueueNumber++;


    updateQueue();


    if (currentPosition <= 3) {

        showToast(
            "🔔 Your turn is approaching! Please stay near the centre."
        );

    } else {

        showToast(
            "Queue updated. You are now #" + currentPosition
        );

    }

});


// ---------- UPDATE QUEUE ----------

function updateQueue() {

    const position =
        String(currentPosition).padStart(2, "0");


    const currentToken =
        "A" + currentQueueNumber;


    document.getElementById("position").textContent =
        position;


    document.getElementById("livePosition").textContent =
        position;


    document.getElementById("currentToken").textContent =
        currentToken;


    document.getElementById("liveCurrent").textContent =
        currentToken;


    document.getElementById("heroQueue").textContent =
        currentToken;


    document.getElementById("dashboardCurrent").textContent =
        currentToken;


    const wait = Math.max(currentPosition * 5, 5);


    document.getElementById("waitTime").textContent =
        wait + " min";


    document.getElementById("liveWait").textContent =
        "~" + wait + " minutes";

}


// ---------- OFFICER DASHBOARD ----------

const serveNextButton =
    document.getElementById("serveNext");


serveNextButton.addEventListener("click", () => {

    currentQueueNumber++;

    servedToday++;

    const currentToken =
        "A" + currentQueueNumber;


    document.getElementById("dashboardCurrent").textContent =
        currentToken;


    document.getElementById("heroQueue").textContent =
        currentToken;


    document.getElementById("servedCount").textContent =
        servedToday;


    let waiting =
        parseInt(
            document.getElementById("waitingCount").textContent
        );


    if (waiting > 0) {

        waiting--;

    }


    document.getElementById("waitingCount").textContent =
        waiting;


    showToast(
        "Token " + currentToken + " is now being served."
    );

});


// ---------- TRACKING SCROLL ----------

function scrollToTracking() {

    document
        .getElementById("tracking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ---------- TOAST ----------

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ---------- DEMO AUTO QUEUE ----------

// Every 15 seconds, demonstrate that the
// queue is alive.

setInterval(() => {

    if (currentPosition > 1) {

        currentPosition--;

        currentQueueNumber++;

        updateQueue();

    }

}, 15000);