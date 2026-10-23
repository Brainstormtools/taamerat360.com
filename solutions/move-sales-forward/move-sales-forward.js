/* Browser-only sales route: no customer data, network calls, persistence, or CRM integration. */
(()=>{'use strict';
const buttons=Array.from(document.querySelectorAll('.sf-stage-button[data-stage]'));
if(!buttons.length)return;
const panels=buttons.map(button=>document.getElementById('stage-panel-'+button.dataset.stage));
if(panels.some(panel=>!panel))return;
function select(index,focus=false){
  buttons.forEach((button,i)=>{
    const active=i===index;
    button.setAttribute('aria-pressed',String(active));
    panels[i].hidden=!active;
  });
  dispatchEvent(new CustomEvent("sales-forward:stage",{detail:{index}}));
  if(focus)buttons[index].focus();
}
buttons.forEach((button,index)=>{
  button.addEventListener('click',()=>select(index));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%buttons.length;
    else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+buttons.length-1)%buttons.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=buttons.length-1;
    else return;
    event.preventDefault();select(next,true);
  });
});
select(0);
})();
