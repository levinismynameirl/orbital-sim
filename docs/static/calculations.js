const G = 6.67430e-11; // gravitational constant

export function specificOrbitalEnergy(v, r, M) {
  const mu = G * M;
  return (v * v) / 2 - mu / r;
}

export function orbitalPeriod(r, M) {
  const mu = G * M;
  return 2 * Math.PI * Math.sqrt(r * r * r / mu);
}

export function standardGravitationalParameter(M) {
  return G * M;
}

export function eccentricity(rA, rP) {
  if (!rA || !rP) return null;
  return (rA - rP) / (rA + rP);
}

export function escapeVelocity(r, M) {
  const mu = G * M;
  return Math.sqrt(2 * mu / r);
}

export function deltaVRequired(vCurrent, vTarget) {
  if (!vCurrent || !vTarget) return null;
  return Math.abs(vTarget - vCurrent);
}

export function checkEscapeVelocity(v, r, M) {
  const vEscape = escapeVelocity(r, M);
  return v > vEscape;
}
