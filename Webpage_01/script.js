// ==========================================
// QUEUESETU — FARMER BOOKING DEMO
// A front-end-only walkthrough. No data is
// stored or sent anywhere.
// ==========================================

const demoSteps = [
    document.getElementById("demoStep1"),
    document.getElementById("demoStep2"),
    document.getElementById("demoStep3")
];
const trackSteps = Array.from(document.querySelectorAll(".demo-track-step"));
const trackLines = Array.from(document.querySelectorAll(".demo-track-line"));

function setDemoStep(n) {
    demoSteps.forEach((el, i) => el.classList.toggle("is-active", i === n));
    trackSteps.forEach((el, i) => {
        el.classList.remove("is-current", "is-done");
        if (i < n) el.classList.add("is-done");
        else if (i === n) el.classList.add("is-current");
    });
    trackLines.forEach((el, i) => {
        el.querySelector("i").style.width = i < n ? "100%" : "0%";
    });
    try {
        document.querySelector(".demo-shell").scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (e) { /* scrolling is a nicety, never let it block step logic */ }
}

// -- booking state, kept only in memory for this demo --
const bookingState = { name: "", phone: "", crop: "", qty: "", centre: "", token: "", date: "", day: "", time: "" };

function generateToken() {
    const num = Math.floor(100000 + Math.random() * 900000);
    return "QS-" + num;
}

// -- Step 1: booking form --
const nameInput = document.getElementById("farmerName");
const phoneInput = document.getElementById("farmerPhone");
const cropSelect = document.getElementById("farmerCrop");
const qtyInput = document.getElementById("farmerQty");
const errName = document.getElementById("errName");
const errPhone = document.getElementById("errPhone");
const errQty = document.getElementById("errQty");

function validateStep1() {
    let ok = true;
    errName.textContent = "";
    errPhone.textContent = "";
    errQty.textContent = "";

    if (!nameInput.value.trim()) {
        errName.textContent = "Enter your name";
        ok = false;
    }
    if (!/^\d{10}$/.test(phoneInput.value.trim())) {
        errPhone.textContent = "Enter a valid 10-digit number";
        ok = false;
    }
    if (!qtyInput.value || Number(qtyInput.value) <= 0) {
        errQty.textContent = "Enter a quantity";
        ok = false;
    }
    return ok;
}

const tokenModal = document.getElementById("tokenModal");
const modalTokenValue = document.getElementById("modalTokenValue");

document.getElementById("confirmBookingBtn").addEventListener("click", () => {
    if (!validateStep1()) return;

    bookingState.name = nameInput.value.trim();
    bookingState.phone = phoneInput.value.trim();
    bookingState.crop = cropSelect.value;
    bookingState.qty = qtyInput.value;
    bookingState.token = generateToken();

    modalTokenValue.textContent = bookingState.token;
    tokenModal.classList.add("is-open");
});

document.getElementById("modalOkBtn").addEventListener("click", () => {
    tokenModal.classList.remove("is-open");
    setDemoStep(1);
});

// -- Step 2: choose centre + auto-generated slot --
const centreSelect = document.getElementById("centreSelect");
const errCentre = document.getElementById("errCentre");
const apptCards = document.getElementById("apptCards");
const apptDate = document.getElementById("apptDate");
const apptDay = document.getElementById("apptDay");
const apptTime = document.getElementById("apptTime");
const apptToken = document.getElementById("apptToken");

const timeSlots = ["9:00 AM – 9:30 AM", "10:00 AM – 10:30 AM", "11:30 AM – 12:00 PM", "1:00 PM – 1:30 PM", "2:30 PM – 3:00 PM"];

function assignAutoSlot() {
    // next available day, skipping Sunday, so the demo never books a closed day
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);

    bookingState.date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    bookingState.day = d.toLocaleDateString("en-IN", { weekday: "long" });
    bookingState.time = timeSlots[Math.floor(Math.random() * timeSlots.length)];

    apptDate.textContent = bookingState.date;
    apptDay.textContent = bookingState.day;
    apptTime.textContent = bookingState.time;
    apptToken.textContent = bookingState.token;
    apptCards.style.opacity = "1";
}

centreSelect.addEventListener("change", () => {
    errCentre.textContent = "";
    if (centreSelect.value) {
        bookingState.centre = centreSelect.value;
        assignAutoSlot();
    } else {
        apptCards.style.opacity = "0.4";
    }
});

document.getElementById("backToStep1").addEventListener("click", () => setDemoStep(0));

document.getElementById("confirmCentreBtn").addEventListener("click", () => {
    if (!centreSelect.value) {
        errCentre.textContent = "Choose a procurement centre to continue";
        return;
    }
    startWaitingSimulation();
    setDemoStep(2);
});

// -- Step 3: confirmation + live waiting simulation --
const waitPosition = document.getElementById("waitPosition");
const waitCentreName = document.getElementById("waitCentreName");
const waitProgressBar = document.getElementById("waitProgressBar");
const summaryToken = document.getElementById("summaryToken");
const summarySlot = document.getElementById("summarySlot");

let waitInterval = null;

function startWaitingSimulation() {
    clearInterval(waitInterval);

    waitCentreName.textContent = bookingState.centre;
    summaryToken.textContent = bookingState.token;
    summarySlot.textContent = bookingState.day + ", " + bookingState.date + " · " + bookingState.time;

    let position = 8;
    const startPosition = position;
    waitPosition.innerHTML = position + "<span>farmers ahead</span>";
    waitProgressBar.style.width = "0%";

    waitInterval = setInterval(() => {
        position -= 1;
        const served = startPosition - position;
        waitProgressBar.style.width = Math.round((served / startPosition) * 100) + "%";

        if (position <= 0) {
            waitPosition.innerHTML = "It's your turn";
            waitPosition.style.fontSize = "26px";
            clearInterval(waitInterval);
        } else {
            waitPosition.innerHTML = position + "<span>farmers ahead</span>";
        }
    }, 1400);
}

document.getElementById("restartDemoBtn").addEventListener("click", () => {
    clearInterval(waitInterval);

    nameInput.value = "";
    phoneInput.value = "";
    qtyInput.value = "";
    cropSelect.selectedIndex = 0;
    centreSelect.selectedIndex = 0;
    errName.textContent = "";
    errPhone.textContent = "";
    errQty.textContent = "";
    errCentre.textContent = "";
    apptCards.style.opacity = "0.4";
    waitPosition.style.fontSize = "";

    Object.keys(bookingState).forEach(k => bookingState[k] = "");
    setDemoStep(0);
});