/* Local, static journey explorer only. No forms, customer data, accounts or storage. */
(()=>{'use strict';
const buttons=Array.from(document.querySelectorAll('.cx-touchpoint-button[data-cx-stage]'));
if(buttons.length!==4)return;
const panels=buttons.map(button=>document.getElementById('cx-stage-panel-'+button.dataset.cxStage));
if(panels.some(panel=>!panel))return;
function activate(index,focus=false){
  buttons.forEach((button,i)=>{
    const current=i===index;
    button.setAttribute('aria-pressed',String(current));
    panels[i].hidden=!current;
  });
  dispatchEvent(new CustomEvent("customer-experience:stage",{detail:{index}}));
  if(focus)buttons[index].focus();
}
buttons.forEach((button,index)=>{
  button.addEventListener('click',()=>activate(index));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+buttons.length-1)%buttons.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=buttons.length-1;
    else return;
    event.preventDefault();activate(next,true);
  });
});
activate(0);
})();
