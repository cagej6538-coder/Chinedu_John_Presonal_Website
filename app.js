const body=document.body;
body.classList.add('locked');
window.addEventListener('load',()=>setTimeout(()=>{body.classList.add('loaded');body.classList.remove('locked')},700));

const reveal=new IntersectionObserver((entries)=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}
}),{threshold:.14});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;reveal.observe(el)});

const counters=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,end=Number(el.dataset.count),start=performance.now(),dur=1300;
  const tick=now=>{const p=Math.min((now-start)/dur,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);counters.unobserve(el)
}),{threshold:.7});
document.querySelectorAll('[data-count]').forEach(el=>counters.observe(el));

const menu=document.querySelector('.menu'),open=document.querySelector('.menu-btn'),close=document.querySelector('.menu-close');
function toggleMenu(state){menu.classList.toggle('open',state);menu.setAttribute('aria-hidden',String(!state));open.setAttribute('aria-expanded',String(state));body.classList.toggle('locked',state)}
open.addEventListener('click',()=>toggleMenu(true));close.addEventListener('click',()=>toggleMenu(false));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));

const cursor=document.querySelector('.cursor'),cursorText=cursor.querySelector('span');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
document.querySelectorAll('[data-cursor],a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{cursorText.textContent=el.dataset.cursor||'OPEN';cursor.classList.add('show')});el.addEventListener('mouseleave',()=>cursor.classList.remove('show'))});

window.addEventListener('scroll',()=>{const p=window.scrollY/(document.documentElement.scrollHeight-innerHeight);document.documentElement.style.setProperty('--progress',p)});

const projects={
  oj:{number:'01',name:'O.J Fashion',type:'Premium Boutique Experience',copy:'A refined fashion storefront concept designed to make collections easy to explore and enquiries effortless.',tags:['UI / UX','E-commerce','Mobile-first']},
  estate:{number:'02',name:'Diamond Estate',type:'Modern Property Platform',copy:'A trustworthy property experience that helps visitors discover homes, understand offers and connect with an estate team.',tags:['Real Estate','Lead Generation','Responsive']},
  nova:{number:'03',name:'Nova Gameplay',type:'Immersive Games Store',copy:'A cinematic game discovery platform built around bold artwork, smooth navigation and a powerful catalogue experience.',tags:['Gaming','Storefront','Interactive']},
  bmw:{number:'04',name:'BMW Motion',type:'Automotive Brand Concept',copy:'An expressive automotive concept combining motion, heritage and performance in one premium visual experience.',tags:['Automotive','Motion','Brand Experience']}
};
const modal=document.querySelector('#projectModal');
document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>{
  const item=projects[btn.dataset.project];
  modal.querySelector('.modal-number').textContent=item.number;
  modal.querySelector('h3').textContent=item.name;
  modal.querySelector('.modal-type').textContent=item.type;
  modal.querySelector('.modal-copy').textContent=item.copy;
  modal.querySelector('.modal-tags').innerHTML=item.tags.map(tag=>`<span>${tag}</span>`).join('');
  modal.showModal();body.classList.add('locked');
}));
modal.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
modal.addEventListener('close',()=>body.classList.remove('locked'));

const shareData={title:'Chinedu John — Creative Developer',text:'Take a look at Chinedu John’s interactive web design portfolio.',url:location.href};
const toast=document.querySelector('.toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
async function shareSite(){if(navigator.share){try{await navigator.share(shareData)}catch(e){}}else{await navigator.clipboard.writeText(location.href);showToast('Portfolio link copied')}}
document.querySelector('#shareSite').addEventListener('click',shareSite);
document.querySelector('#quickShare').addEventListener('click',shareSite);
document.querySelector('#copyEmail').addEventListener('click',async e=>{await navigator.clipboard.writeText(e.currentTarget.dataset.email);showToast('Email copied')});
