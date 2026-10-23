/* Four-stage illustration only: no network, persistence, live tasks, or user records. */
(()=>{'use strict';
const buttons=Array.from(document.querySelectorAll('.op-step-button[data-op-stage]'));
if(buttons.length!==4)return;
const panels=buttons.map(button=>document.getElementById('op-step-panel-'+button.dataset.opStage));
if(panels.some(panel=>!panel))return;
function choose(index,focus=false){
 buttons.forEach((button,i)=>{
  const current=index===i;
  button.setAttribute('aria-pressed',String(current));
  panels[i].hidden=!current;
 });
 dispatchEvent(new CustomEvent("operations:stage",{detail:{index}}));
 if(focus)buttons[index].focus();
}
buttons.forEach((button,index)=>{
 button.addEventListener('click',()=>choose(index));
 button.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%buttons.length;
  else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=buttons.length-1;
  else return;
  event.preventDefault();choose(next,true);
 });
});
choose(0);
})();
