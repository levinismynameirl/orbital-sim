// Import the guided tour (if implemented)
import { startTutorial } from './tour.js';

const G = 6.67430e-11; // gravitational constant

// Preset celestial bodies (mass in kg)
const presets = {
  earth: 5.972e24,
  moon: 7.342e22,
  mars: 6.417e23,
  jupiter: 1.898e27,
  venus: 4.867e24,
  saturn: 5.683e26,
  mercury: 3.285e23,
  neptune: 1.024e26,
  uranus: 8.681e25,
  sun: 1.989e30
};

// DOM references
const form = document.getElementById('orbit-form');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const advancedDiv = document.getElementById('outputAdvanced');
const advancedToggleBtn = document.getElementById('advancedToggleBtn');
const advancedSection = document.getElementById('advancedSection');
const clearBtn = document.getElementById('clearBtn');
const presetSelect = document.getElementById('presetBodies');
// Renamed massInput to planetMassInput
const planetMassInput = document.getElementById('mass');
const velocityInput = document.getElementById('velocity');
const distanceInput = document.getElementById('distance');

// Results outputs
const energyOutput = document.getElementById('energyOutput');
const periodOutput = document.getElementById('periodOutput');
const muOutput = document.getElementById('muOutput');
const eccentricityOutput = document.getElementById('eccentricity');
const escapeVelocityOutput = document.getElementById('escapeVelocity');
const escapeCheckOutput = document.getElementById('escapeCheck');
const deltaVRequiredOutput = document.getElementById('deltaVRequired');

// Start tutorial on page load
window.addEventListener('load', () => {
  if (typeof startTutorial === 'function') startTutorial();
});

// Handle preset body selection (fills planet mass)
presetSelect.addEventListener('change', () => {
  const selected = presetSelect.value;
  if (presets[selected]) {
    planetMassInput.value = presets[selected];
    planetMassInput.disabled = true;
  } else {
    planetMassInput.value = '';
    planetMassInput.disabled = false;
  }
});

// Toggle advanced parameters visibility
advancedToggleBtn.addEventListener('click', () => {
  const isVisible = advancedSection.style.display === 'block';
  advancedSection.style.display = isVisible ? 'none' : 'block';
  advancedToggleBtn.textContent = isVisible ? 'Show Advanced Parameters' : 'Hide Advanced Parameters';

  // Show advanced results if results are visible
  advancedDiv.style.display = !isVisible && resultsDiv.style.display === 'block' ? 'block' : 'none';
});

// Clear inputs and outputs
clearBtn.addEventListener('click', () => {
  form.reset();
  resultsDiv.style.display = 'none';
  advancedDiv.style.display = 'none';
  loadingDiv.style.display = 'none';
  planetMassInput.disabled = false;
});

// Handle form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  loadingDiv.style.display = 'block';
  resultsDiv.style.display = 'none';
  advancedDiv.style.display = 'none';

  setTimeout(() => {
    calculateOrbit();
    loadingDiv.style.display = 'none';
  }, 100);
});

// Main orbit calculation
function calculateOrbit() {
  const yourMass = parseFloat(planetMassInput.value);
  const velocity = parseFloat(velocityInput.value);
  const distance = parseFloat(distanceInput.value);

  if (isNaN(yourMass) || isNaN(velocity) || isNaN(distance) || yourMass <= 0 || distance <= 0) {
    alert('Please enter valid positive numbers for planet mass, speed, and distance.');
    return;
  }

  // Gravitational parameter μ = G * M
  const mu = G * yourMass;

  // Specific orbital energy ε = v²/2 − μ/r
  const specificOrbitalEnergy = velocity * velocity / 2 - mu / distance;

  // Orbital period for bound orbits
  let orbitalPeriod = '-';
  let semiMajorAxis = null;
  if (specificOrbitalEnergy < 0) {
    semiMajorAxis = -mu / (2 * specificOrbitalEnergy);
    orbitalPeriod = (2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / mu)).toFixed(2);
  }

  // Display basic results
  energyOutput.textContent = specificOrbitalEnergy.toExponential(4);
  periodOutput.textContent = orbitalPeriod;
  muOutput.textContent = mu.toExponential(4);
  resultsDiv.style.display = 'block';

  // Advanced calculations
  if (advancedSection.style.display === 'block') {
    calculateAdvancedResults(mu, velocity, distance, semiMajorAxis, specificOrbitalEnergy);
  } else {
    advancedDiv.style.display = 'none';
  }
}

// Advanced orbit calculations
function calculateAdvancedResults(mu, velocity, distance, semiMajorAxis, specificOrbitalEnergy) {
  const apoapsis = parseFloat(document.getElementById('apoapsis').value);
  const periapsis = parseFloat(document.getElementById('periapsis').value);
  const deltaVInput = parseFloat(document.getElementById('deltaV').value);

  // Eccentricity
  let e = 0;
  if (!isNaN(apoapsis) && !isNaN(periapsis) && apoapsis > periapsis && periapsis > 0) {
    e = (apoapsis - periapsis) / (apoapsis + periapsis);
  }
  eccentricityOutput.textContent = e.toFixed(4);

  // Escape velocity vₑ = √(2μ/r)
  const vEscape = Math.sqrt(2 * mu / distance);
  escapeVelocityOutput.textContent = vEscape.toFixed(2);

  // Escape check
  const isEscape = velocity >= vEscape;
  escapeCheckOutput.textContent = isEscape
    ? 'Yes, you are escaping orbit.'
    : 'No, you are bound to orbit.';

  // Delta-v required (difference to circular velocity)
  const vCircular = Math.sqrt(mu / distance);
  let deltaV = Math.abs(vCircular - velocity);
  if (!isNaN(deltaVInput)) deltaV = deltaVInput;
  deltaVRequiredOutput.textContent = deltaV.toFixed(2);

  advancedDiv.style.display = 'block';
}