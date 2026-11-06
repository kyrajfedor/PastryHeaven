const IMG={
  "logo": "images/logo.jpg",
  "croissant": "images/croissant.jpg",
  "cake": "images/cake.jpg",
  "coffee": "images/coffee.jpg",
  "comfort": "images/comfort.jpg",
  "basil": "images/basil.jpg",
  "cap": "images/cap.jpg",
  "comfortS": "images/comfortS.jpg",
  "esp": "images/esp.jpg",
  "pan": "images/pan.jpg",
  "kidpan": "images/kidpan.jpg"
};
document.querySelectorAll('[data-img]').forEach(e=>e.src=IMG[e.dataset.img]);



function renderMenu(SECTIONS){
const root=document.getElementById('sections');
SECTIONS.forEach(s=>{
  const sec=document.createElement('section');sec.id=s.id;
  sec.innerHTML='<h2></h2>';sec.querySelector('h2').textContent=s.title;
  if(s.banner){const b=document.createElement('img');b.className='banner';b.src=s.banner;b.alt='';sec.appendChild(b);}
  const ul=document.createElement('ul');ul.className='menu';
  s.items.forEach(i=>{
    const li=document.createElement('li');
    const d=document.createElement('div');d.className='item';
    d.innerHTML='<div class="row"><span class="n"></span><span class="dots"></span><span class="p"></span></div>';
    d.querySelector('.n').textContent=i.name;d.querySelector('.p').textContent=i.price;
    if(i.img){li.classList.add('stack');const m=document.createElement('div');m.className='media';const im=document.createElement('img');im.src=i.img;im.alt=i.name;m.appendChild(im);if(i.description){const sm=document.createElement('small');sm.textContent=i.description;m.appendChild(sm);}d.appendChild(m);}else if(i.description){const sm=document.createElement('small');sm.textContent=i.description;d.appendChild(sm);}
    li.appendChild(d);ul.appendChild(li);
  });
    if(s.note){const n=document.createElement('p');n.className='note top';n.textContent=s.note;sec.appendChild(n);}
  sec.appendChild(ul);
  if(s.id==='kids'){const n=document.createElement('p');n.className='note';n.textContent='Please notify us about any allergies when you order.';sec.appendChild(n);}
  root.appendChild(sec);
});
}
fetch('menu.json').then(r=>r.json()).then(renderMenu).then(spy).catch(()=>{document.getElementById('sections').innerHTML='<p style="padding:2rem 0">The menu could not be loaded. Please try again later.</p>';});
const catLinks=[...document.querySelectorAll('.cats a')],topLinks=[...document.querySelectorAll('.bar nav a')];
const spyIds=[...catLinks.map(a=>a.hash.slice(1)),'visit'];
function spy(){
  let cur=null;
  spyIds.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=window.innerHeight*0.35)cur=id;});
  if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur='visit';
  catLinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+cur));
  topLinks[0].classList.remove('active');
  topLinks[1].classList.remove('active');
}
addEventListener('scroll',spy,{passive:true});addEventListener('resize',spy);spy();