// static/script.js
import {
  specificOrbitalEnergy,
  orbitalPeriod,
  standardGravitationalParameter,
  eccentricity,
  escapeVelocity,
  deltaVRequired,
  checkEscapeVelocity,
} from './calculations.js';

const advancedToggle = document.getElementById('advancedToggle');
const advancedSection = document.getElementById('advancedSection');
const outputAdvanced = document.getElementById('outputAdvanced');

advancedToggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    advancedSection.style.display = 'block';
    outputAdvanced.style.display = 'block';
  } else {
    advancedSection.style.display = 'none';
    outputAdvanced.style.display = 'none';
  }
});

function updateOutputs() {
  const massPlanet = parseFloat(document.getElementById('planet_mass').value);
  const r = parseFloat(document.getElementById('distance').value);
  const v = parseFloat(document.getElementById('velocity').value);

  // Advanced inputs (optional)
  const apoapsisInput = document.getElementById('apoapsis').value;
  const periapsisInput = document.getElementById('periapsis').value;
  const deltaVInputVal = document.getElementById('deltaV').value;

  const apoapsis = apoapsisInput === '' ? null : parseFloat(apoapsisInput);
  const periapsis = periapsisInput === '' ? null : parseFloat(periapsisInput);
  const deltaVInput = deltaVInputVal === '' ? null : parseFloat(deltaVInputVal);

  if (isNaN(massPlanet) || isNaN(r) || isNaN(v)) {
    alert('Please fill in planet mass, distance, and velocity');
    return;
  }

  // Basic calculations
  const energy = specificOrbitalEnergy(v, r, massPlanet);
  const period = orbitalPeriod(r, massPlanet);
  const mu = standardGravitationalParameter(massPlanet);

  document.getElementById('energyOutput').textContent = energy.toFixed(3);
  document.getElementById('periodOutput').textContent = period.toFixed(3);
  document.getElementById('muOutput').textContent = mu.toExponential(3);

  // Advanced calculations if toggle enabled
  if (advancedToggle.checked) {
    let ecc = (apoapsis !== null && periapsis !== null) ? eccentricity(apoapsis, periapsis) : null;
    if (ecc === null || isNaN(ecc)) ecc = 'N/A';
    else ecc = ecc.toFixed(5);

    const vEscape = escapeVelocity(r, massPlanet).toFixed(2);
    const isEscaping = checkEscapeVelocity(v, r, massPlanet);
    const escapeMsg = isEscaping ? 'Yes, speed exceeds escape velocity!' : 'No, orbit is bound.';

    let deltaVReq = null;
    if (deltaVInput !== null) {
      deltaVReq = deltaVRequired(v, deltaVInput);
    }
    deltaVReq = (deltaVReq !== null && !isNaN(deltaVReq)) ? deltaVReq.toFixed(2) : 'N/A';

    document.getElementById('eccentricity').textContent = ecc;
    document.getElementById('escapeVelocity').textContent = vEscape;
    document.getElementById('escapeCheck').textContent = escapeMsg;
    document.getElementById('deltaVRequired').textContent = deltaVReq;
  }
}

document.getElementById('orbit-form').addEventListener('submit', (e) => {
  e.preventDefault();
  updateOutputs();
});
