// DOM ELEMENTS
const form = document.getElementById("orbit-form");
const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");
const advancedToggleBtn = document.getElementById("advancedToggleBtn");
const advancedSection = document.getElementById("advancedSection");
const outputAdvanced = document.getElementById("outputAdvanced");
const loading = document.getElementById("loading");

// OUTPUT FIELDS
const energyOutput = document.getElementById("energyOutput");
const periodOutput = document.getElementById("periodOutput");
const muOutput = document.getElementById("muOutput");
const eccentricityOutput = document.getElementById("eccentricity");
const escapeVelocityOutput = document.getElementById("escapeVelocity");
const escapeCheckOutput = document.getElementById("escapeCheck");
const deltaVRequiredOutput = document.getElementById("deltaVRequired");

// INPUT FIELDS
const massInput = document.getElementById("mass");
const velocityInput = document.getElementById("velocity");
const distanceInput = document.getElementById("distance");
const planetMassInput = document.getElementById("planet_mass");
const apoapsisInput = document.getElementById("apoapsis");
const periapsisInput = document.getElementById("periapsis");
const deltaVInput = document.getElementById("deltaV");

let advancedVisible = false;

// TOGGLE ADVANCED SECTION
advancedToggleBtn.addEventListener("click", () => {
  advancedVisible = !advancedVisible;
  advancedSection.style.display = advancedVisible ? "block" : "none";
  outputAdvanced.style.display = "none";
  advancedToggleBtn.textContent = advancedVisible
    ? "Hide Advanced Parameters"
    : "Show Advanced Parameters";
});

// CLEAR ALL FIELDS
clearBtn.addEventListener("click", () => {
  form.reset();
  energyOutput.textContent = "-";
  periodOutput.textContent = "-";
  muOutput.textContent = "-";
  eccentricityOutput.textContent = "-";
  escapeVelocityOutput.textContent = "-";
  escapeCheckOutput.textContent = "-";
  deltaVRequiredOutput.textContent = "-";
  outputAdvanced.style.display = "none";
});

// HANDLE FORM SUBMISSION
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading animation
  loading.style.display = "block";
  calculateBtn.disabled = true;

  setTimeout(() => {
    calculateOrbit();
    loading.style.display = "none";
    calculateBtn.disabled = false;
  }, 800); // Simulate calculation time
});

// MAIN CALCULATION FUNCTION
function calculateOrbit() {
  const m = parseFloat(massInput.value);
  const v = parseFloat(velocityInput.value);
  const r = parseFloat(distanceInput.value);
  const M = parseFloat(planetMassInput.value);

  if (isNaN(m) || isNaN(v) || isNaN(r) || isNaN(M)) {
    alert("Please enter valid numbers for all required fields.");
    return;
  }

  const G = 6.67430e-11;
  const mu = G * M;
  const specificEnergy = (0.5 * v * v) - (mu / r);
  const period = 2 * Math.PI * Math.sqrt(Math.pow(r, 3) / mu);
  const escapeVelocity = Math.sqrt(2 * mu / r);
  const isEscape = v >= escapeVelocity;

  energyOutput.textContent = specificEnergy.toExponential(3);
  periodOutput.textContent = isNaN(period) ? "-" : period.toFixed(2);
  muOutput.textContent = mu.toExponential(3);

  if (advancedVisible) {
    // Advanced calculations
    const apoapsis = parseFloat(apoapsisInput.value);
    const periapsis = parseFloat(periapsisInput.value);
    const deltaV = parseFloat(deltaVInput.value);

    // Eccentricity (if inputs are valid)
    let eccentricity = "-";
    if (!isNaN(apoapsis) && !isNaN(periapsis)) {
      eccentricity = ((apoapsis - periapsis) / (apoapsis + periapsis)).toFixed(3);
    }

    // Estimated delta-v (placeholder formula)
    let deltaVRequired = "-";
    if (!isNaN(deltaV)) {
      deltaVRequired = deltaV.toFixed(2);
    }

    eccentricityOutput.textContent = eccentricity;
    escapeVelocityOutput.textContent = escapeVelocity.toFixed(2);
    escapeCheckOutput.textContent = isEscape ? "Yes" : "No";
    deltaVRequiredOutput.textContent = deltaVRequired;

    outputAdvanced.style.display = "block";
  }
}
