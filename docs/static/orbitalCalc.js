// orbitCalc.js

function calculateOrbit(mass, speed, distance, planetMass) {
    const G = 6.67430e-11; // gravitational constant (m^3 kg^-1 s^-2)
    const mu = G * planetMass;

    // Specific orbital energy
    const energy = 0.5 * speed * speed - mu / distance;

    // Orbital period (assuming circular orbit)
    let period = null;
    if (mu > 0 && distance > 0) {
        period = 2 * Math.PI * Math.sqrt(Math.pow(distance, 3) / mu);
    }

    return {
        energy: energy,
        period: period,
        mu: mu
    };
}
