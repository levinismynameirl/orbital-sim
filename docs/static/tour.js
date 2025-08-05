export function startTutorial(){
  let step=0;
  const overlay=document.getElementById('tutorialOverlay');
  const nextBtn=document.getElementById('nextStep');
  const skipBtn=document.getElementById('skipTutorial');
  const steps=[
    { el: overlay.querySelector('.tutorial-step[data-step="1"]'), text:'Welcome!'} ,
    { el: document.getElementById('presetBodies'), text:'Select a planet preset.'},
    { el: document.getElementById('mass'), text:'Enter your spacecraft mass.'},
    { el: document.getElementById('velocity'), text:'Enter your speed.'},
    { el: document.getElementById('calculateBtn'), text:'Click Calculate to see results.'},
    { el: document.getElementById('energyOutput'), text:'This is your specific orbital energy.'},
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