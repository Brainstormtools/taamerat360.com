/* Small progressive enhancement only: every business message stays visible without JS. */
(()=>{'use strict';
const menu=document.querySelector('.nav-toggle');
const links=document.querySelector('#nav-links');
if(!menu||!links)return;
function setMenu(open){menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');links.classList.toggle('is-open',open);}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
document.addEventListener('pointerdown',event=>{if(menu.getAttribute('aria-expanded')==='true'&&!event.target.closest('.site-header'))setMenu(false);});
})();