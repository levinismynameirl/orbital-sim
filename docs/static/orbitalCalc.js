function calculateOrbit(mass, speed, distance, planetMass) {
    const G = 6.67430e-11; // gravitational constant (m^3 kg^-1 s^-2)
    const mu = G * planetMass;

    // Specific orbital energy
    const energy = 0.5 * speed ** 2 - mu / distance;

    // Orbital period (assuming circular orbit)
    let period = null;
    if (mu > 0 && distance > 0) {
        period = 2 * Math.PI * Math.sqrt(distance ** 3 / mu);
    }

    return { energy, period, mu };
}

// Handle form submission
document.getElementById('orbit-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const mass = parseFloat(document.getElementById('mass').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const planetMass = parseFloat(document.getElementById('planet_mass').value);

    try {
        const result = calculateOrbit(mass, speed, distance, planetMass);

        document.getElementById('results').innerHTML = `
            <h2>Results</h2>
            <p>Specific Orbital Energy: ${result.energy.toFixed(3)} J/kg</p>
            <p>Orbital Period: ${result.period ? result.period.toFixed(3) + ' s' : 'N/A'}</p>
            <p>Standard Gravitational Parameter (μ): ${result.mu.toFixed(3)}</p>
        `;
    } catch (error) {
        document.getElementById('results').innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});
