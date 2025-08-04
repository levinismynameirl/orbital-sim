const G = 6.67430e-11; // gravitational constant

// DOM references
const form = document.getElementById('orbit-form');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');
const advancedDiv = document.getElementById('outputAdvanced');
const advancedToggleBtn = document.getElementById('advancedToggleBtn');
const advancedSection = document.getElementById('advancedSection');
const clearBtn = document.getElementById('clearBtn');

// Results outputs
const energyOutput = document.getElementById('energyOutput');
const periodOutput = document.getElementById('periodOutput');
const muOutput = document.getElementById('muOutput');
const eccentricityOutput = document.getElementById('eccentricity');
const escapeVelocityOutput = document.getElementById('escapeVelocity');
const escapeCheckOutput = document.getElementById('escapeCheck');
const deltaVRequiredOutput = document.getElementById('deltaVRequired');

// Toggle advanced parameters visibility
advancedToggleBtn.addEventListener('click', () => {
  const isVisible = advancedSection.style.display === 'block';
  advancedSection.style.display = isVisible ? 'none' : 'block';
  advancedToggleBtn.textContent = isVisible
    ? 'Show Advanced Parameters'
    : 'Hide Advanced Parameters';

  // Show or hide advanced results accordingly
  if (!isVisible && resultsDiv.style.display === 'block') {
    advancedDiv.style.display = 'block';
  } else {
    advancedDiv.style.display = 'none';
  }
});

// Clear all inputs and outputs
clearBtn.addEventListener('click', () => {
  form.reset();
  resultsDiv.style.display = 'none';
  advancedDiv.style.display = 'none';
  loadingDiv.style.display = 'none';
});

// Main form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show loading
  loadingDiv.style.display = 'block';
  resultsDiv.style.display = 'none';
  advancedDiv.style.display = 'none';

  // Allow UI to update loading spinner
  setTimeout(() => {
    calculateOrbit();
    loadingDiv.style.display = 'none';
  }, 100);
});

function calculateOrbit() {
  // Read inputs
  const mass = parseFloat(document.getElementById('mass').value);
  const velocity = parseFloat(document.getElementById('velocity').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const planetMass = parseFloat(document.getElementById('planet_mass').value);

  if (
    isNaN(mass) ||
    isNaN(velocity) ||
    isNaN(distance) ||
    isNaN(planetMass) ||
    mass <= 0 ||
    distance <= 0 ||
    planetMass <= 0
  ) {
    alert('Please enter valid positive numbers for all required fields.');
    return;
  }

  // Calculate gravitational parameter mu = G * M_planet
  const mu = G * planetMass;

  // Specific orbital energy = (v^2)/2 - μ/r
  const specificOrbitalEnergy = velocity ** 2 / 2 - mu / distance;

  // Orbital period (if elliptical): T = 2 * π * sqrt(a^3 / μ)
  // Semi-major axis (a) = - μ / (2 * specificOrbitalEnergy)
  // Only valid if specificOrbitalEnergy < 0 (bound orbit)
  let orbitalPeriod = '-';
  let semiMajorAxis = null;
  if (specificOrbitalEnergy < 0) {
    semiMajorAxis = -mu / (2 * specificOrbitalEnergy);
    orbitalPeriod =
      2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / mu);
    orbitalPeriod = orbitalPeriod.toFixed(2);
  }

  // Show basic results
  energyOutput.textContent = specificOrbitalEnergy.toExponential(4);
  periodOutput.textContent = orbitalPeriod;
  muOutput.textContent = mu.toExponential(4);

  resultsDiv.style.display = 'block';

  // If advanced visible, calculate advanced results
  if (advancedSection.style.display === 'block') {
    calculateAdvancedResults(
      mu,
      velocity,
      distance,
      semiMajorAxis,
      specificOrbitalEnergy
    );
  } else {
    advancedDiv.style.display = 'none';
  }
}

function calculateAdvancedResults(mu, velocity, distance, a, energy) {
  // Eccentricity calculation from vis-viva:
  // e = sqrt(1 + (2 * energy * h^2) / mu^2)
  // h = angular momentum per unit mass = r * v_tangential
  // We don't have tangential velocity info, so estimate from periapsis and apoapsis inputs if available
  // Or approximate assuming circular (e=0) if no data

  // Read advanced inputs
  const apoapsisInput = parseFloat(document.getElementById('apoapsis').value);
  const periapsisInput = parseFloat(document.getElementById('periapsis').value);
  const deltaVInput = parseFloat(document.getElementById('deltaV').value);

  // If apoapsis and periapsis are valid and apoapsis > periapsis > 0, calculate eccentricity and semi-major axis
  let eccentricity = 0;
  let semiMajorAxisAdvanced = a;

  if (
    !isNaN(apoapsisInput) &&
    !isNaN(periapsisInput) &&
    apoapsisInput > periapsisInput &&
    periapsisInput > 0
  ) {
    semiMajorAxisAdvanced = (apoapsisInput + periapsisInput) / 2;
    eccentricity = (apoapsisInput - periapsisInput) / (apoapsisInput + periapsisInput);
  } else if (a) {
    eccentricity = 0; // fallback: circular orbit approximation
  } else {
    eccentricity = 0;
  }

  eccentricityOutput.textContent = eccentricity.toFixed(4);

  // Escape velocity = sqrt(2 * μ / r)
  const escapeVelocity = Math.sqrt((2 * mu) / distance);
  escapeVelocityOutput.textContent = escapeVelocity.toFixed(2);

  // Check if current velocity exceeds escape velocity
  const isEscape = velocity >= escapeVelocity;
  escapeCheckOutput.textContent = isEscape ? 'Yes, you are escaping orbit.' : 'No, you are bound to orbit.';

  // Estimated deltaV required for orbit insertion or adjustment:
  // Simple model: difference between current velocity and circular orbit velocity at distance
  const circularVelocity = Math.sqrt(mu / distance);
  let deltaVRequired = Math.abs(circularVelocity - velocity);

  // If user provided a deltaV override, show that
  if (!isNaN(deltaVInput)) {
    deltaVRequired = deltaVInput;
  }
  deltaVRequiredOutput.textContent = deltaVRequired.toFixed(2);

  advancedDiv.style.display = 'block';
}
