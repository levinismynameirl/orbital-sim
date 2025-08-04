document.getElementById('orbit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
        mass: parseFloat(form.mass.value),
        speed: parseFloat(form.speed.value),
        distance: parseFloat(form.distance.value),
        planet_mass: parseFloat(form.planet_mass.value),
    };

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Calculating...';

    try {
        const response = await fetch('http://localhost:5000/calculate', { // adjust URL if needed
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            resultsDiv.innerHTML = `
                <h2>Results</h2>
                <p>Specific Orbital Energy: ${result.energy.toFixed(3)} J/kg</p>
                <p>Orbital Period: ${result.period ? result.period.toFixed(3) + ' s' : 'N/A'}</p>
                <p>Standard Gravitational Parameter (μ): ${result.mu.toFixed(3)}</p>
            `;
        } else {
            resultsDiv.innerHTML = `<p style="color:red;">Error: ${result.error}</p>`;
        }
    } catch (err) {
        resultsDiv.innerHTML = `<p style="color:red;">Network error: ${err.message}</p>`;
    }
});
