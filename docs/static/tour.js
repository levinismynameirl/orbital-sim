export function startTutorial(){
  let step=0;
  const overlay=document.getElementById('tutorialOverlay');
  const nextBtn=document.getElementById('nextStep');
  const skipBtn=document.getElementById('skipTutorial');
  const steps=[
    { el: overlay.querySelector('.tutorial-step[data-step="1"]'), text:'Welcome!'} ,
    { el: document.getElementById('presetBodies'), text:'To begin, select a preset body from the dropdown.'},
    { el: document.getElementById('mass'), text:'Normally you would enter your mass here, but presets will fill this in for you.'},
    { el: document.getElementById('velocity'), text:'Enter your velocity in meters per second. This is your speed in orbit relative to the body you are orbiting.'},
    { el: document.getElementById('calculateBtn'), text:'Now click Calculate to see details about your orbit.'},
    { el: document.getElementById('energyOutput'), text:'This is your specific orbital energy. It is a measure of the total energy per unit mass in your orbit. It is calculated using the formula E = v^2/2 - GM/r, where v is your velocity, G is the gravitational constant, M is the mass of the body you are orbiting, and r is the distance from the center of that body.'},
    { el: document.getElementById('periodOutput'), text:'This is your orbital period. It is the time it takes to complete one full orbit around the body you are orbiting. It is calculated using the formula T = 2π√(a^3/GM), where a is the semi-major axis of your orbit.'},
    { el: document.getElementById('muOutput'), text:'This is the gravitational parameter μ. It measures the strength of the gravitational field of the body you are orbiting. It is calculated using the formula μ = G * M, where G is the gravitational constant and M is the mass of the body you are orbiting.'},
    { el: document.getElementById('advancedSection'), text:'Click the advanced section for more calculations. You can calculate eccentricity, apoapsis, periapsis, and delta V. More information is in the next steps.'},
    { el: document.getElementById('apoapsis'), text:'Enter apoapsis and periapsis for eccentricity. Eccentricity is a measure of how much your orbit deviates from a perfect circle. It is calculated using the formula e = (apoapsis - periapsis) / (apoapsis + periapsis). Apoapsis is the farthest point in your orbit from the center of the body you are orbiting, and periapsis is the closest point.'},
    { el: document.getElementById('periapsis'), text:'Enter periapsis to calculate eccentricity.'},
    { el: document.getElementById('deltaV'), text:'Enter delta V for delta V calculations. Delta V is the change in velocity needed to perform a maneuver, such as changing orbits. It is calculated using the formula ΔV = √(2μ/r) * (1 - √(1 - e^2)), where μ is the gravitational parameter, r is the distance from the center of the body you are orbiting, and e is the eccentricity of your orbit.'},
    { el: document.getElementById('advancedResults'), text:'Click Calculate again to see the advanced calculations.'},
    { el: document.getElementById('deltaVRequiredOutput'), text:'This is the delta V required for your orbit. It is the difference between your current velocity and the circular velocity at your distance from the body you are orbiting.'},
    { el: document.getElementById('escapeVelocityOutput'), text:'This is the escape velocity. It is the minimum velocity needed to escape the gravitational pull of the body you are orbiting.'},
    { el: document.getElementById('escapeCheckOutput'), text:'This tells you if you are escaping orbit or not. If your velocity is greater than or equal to the escape velocity, you are escaping orbit.'},
    { el: document.getElementById('eccentricityOutput'), text:'This is your orbit\'s eccentricity. It is a measure of how elliptical your orbit is. A value of 0 means a circular orbit, while values closer to 1 indicate more elongated orbits.'},
    { el: document.getElementById('resetBtn'), text:'Click Clear Fields to start over.'},
    { el: document.getElementById('tutorialOverlay'), text:'The tutorial is now complete! For more information, check the documentation page. You can access it from the top of the page.'},
    { el: document.getElementById('supportLink'), text:'If you have any questions or need help, feel free to reach out on Discord. More will be added to the simulator soon. (Discord link is at the footer of the page.)'}
  ];
  overlay.style.display='block';
  nextBtn.onclick=()=>{
    step++;
    if(step>=steps.length){ overlay.style.display='none'; return; }
    // highlight steps[step]
    alert(steps[step].text);
  };
  skipBtn.onclick=()=> overlay.style.display='none';
}