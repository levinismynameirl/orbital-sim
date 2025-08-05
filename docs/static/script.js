const G = 6.67430e-11; // gravitational constant

// Preset celestial bodies (mass in kg)
const presetBodies = {
  Earth: 5.972e24,
  Mars: 6.417e23,
  Jupiter: 1.898e27,
  Venus: 4.867e24,
  Saturn: 5.683e26,
  Mercury: 3.285e23,
  Neptune: 1.024e26,
  Uranus: 8.681e25,
  Moon: 7.342e22,
  Sun: 1.989e30,
  Custom: null
};

// DOM references
const form = document.getElementById('orbit-form');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const advancedDiv = document.getElementById('outputAdvanced');
const advancedToggleBtn = document.getElementById('advancedToggleBtn');
const advancedSection = document.getElementById('advancedSection');
const clearBtn = document.getElementById('clearBtn');
const presetSelect = document.getElementById('presetBodies'); // new dropdown
const planetMassInput = document.getElementById('planet_mass');

// Results outputs
const energyOutput = document.getElementById('energyOutput');
const periodOutput = document.getElementById('periodOutput');
const muOutput = document.getElementById('muOutput');
const eccentricityOutput = document.getElementById('eccentricity');
const escapeVelocityOutput = document.getElementById('escapeVelocity');
const escapeCheckOutput = document.getElementById('escapeCheck');
const deltaVRequiredOutput = document.getElementById('deltaVRequired');

// Handle preset body selection
presetSelect.addEventListener('change', () => {
  const selectedBody = presetSelect.value;
  if (presetBodies[selectedBody] !== null) {
    planetMassInput.value = presetBodies[selectedBody];
    planetMassInput.disabled = true;
  } else {
    planetMassInput.value = '';
    planetMassInput.disabled = false;
  }
});

// Toggle advanced parameters
advancedToggleBtn.addEventListener('click', () => {
  const isVisible = advancedSection.style.display === 'block';
  advancedSection.style.display = isVisible ? 'none' : 'block';
  advancedToggleBtn.textContent = isVisible
    ? 'Show Advanced Parameters'
    : 'Hide Advanced Parameters';

  advancedDiv.style.display = !isVisible && resultsDiv.style.display === 'block'
    ? 'block'
    : 'none';
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
  const mass = parseFloat(document.getElementById('mass').value);
  const velocity = parseFloat(document.getElementById('velocity').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const planetMass = parseFloat(planetMassInput.value);

  if (isNaN(mass) || isNaN(velocity) || isNaN(distance) || isNaN(planetMass) ||
      mass <= 0 || distance <= 0 || planetMass <= 0) {
    alert('Please enter valid positive numbers for all required fields.');
    return;
  }

  // Gravitational parameter
  const mu = G * planetMass;

  // Specific orbital energy
  const specificOrbitalEnergy = velocity ** 2 / 2 - mu / distance;

  // Orbital period
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

  // Calculate advanced results if enabled
  if (advancedSection.style.display === 'block') {
    calculateAdvancedResults(mu, velocity, distance, semiMajorAxis, specificOrbitalEnergy);
  } else {
    advancedDiv.style.display = 'none';
  }
}

// Advanced parameters
function calculateAdvancedResults(mu, velocity, distance, a, energy) {
  const apoapsisInput = parseFloat(document.getElementById('apoapsis').value);
  const periapsisInput = parseFloat(document.getElementById('periapsis').value);
  const deltaVInput = parseFloat(document.getElementById('deltaV').value);

  let eccentricity = 0;
  if (!isNaN(apoapsisInput) && !isNaN(periapsisInput) &&
      apoapsisInput > periapsisInput && periapsisInput > 0) {
    eccentricity = (apoapsisInput - periapsisInput) / (apoapsisInput + periapsisInput);
  } else if (a) {
    eccentricity = 0; // assume circular
  }

  eccentricityOutput.textContent = eccentricity.toFixed(4);

  const escapeVelocity = Math.sqrt((2 * mu) / distance);
  escapeVelocityOutput.textContent = escapeVelocity.toFixed(2);

  const isEscape = velocity >= escapeVelocity;
  escapeCheckOutput.textContent = isEscape
    ? 'Yes, you are escaping orbit.'
    : 'No, you are bound to orbit.';

  const circularVelocity = Math.sqrt(mu / distance);
  let deltaVRequired = Math.abs(circularVelocity - velocity);
  if (!isNaN(deltaVInput)) deltaVRequired = deltaVInput;

  deltaVRequiredOutput.textContent = deltaVRequired.toFixed(2);

  advancedDiv.style.display = 'block';
}
