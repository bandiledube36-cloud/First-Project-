const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('video').forEach(v=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches&&v.autoplay){v.autoplay=false;v.controls=true}});
const lb=$('#lb');
$$('.z').forEach(b=>b.onclick=()=>{const i=b.firstElementChild;lb.firstElementChild.src=i.src;lb.firstElementChild.alt=i.alt;lb.showModal()});
lb.onclick=()=>lb.close();
const qty={};
function render(){const l=Object.entries(qty).filter(e=>e[1]);const u=$('#sum');u.textContent='';
if(!l.length){const li=document.createElement('li');li.className='empty';li.textContent='Nothing added yet. Use the + buttons above.';u.append(li)}
l.forEach(([n,v])=>{const li=document.createElement('li');li.textContent=v+' x '+n;u.append(li)});$('#send').disabled=!l.length}
$$('.item').forEach(it=>{const n=it.dataset.n,o=it.querySelector('output');it.querySelectorAll('button').forEach(b=>b.onclick=()=>{qty[n]=Math.max(0,(qty[n]||0)+Number(b.dataset.d));o.textContent=qty[n];render()})});
render();
function done(box,title,text){box.textContent='';const h=document.createElement('strong');h.textContent=title;const p=document.createElement('pre');p.textContent=text;const a=document.createElement('div');a.className='act';
const c=document.createElement('button');c.className='btn alt';c.type='button';c.textContent='Copy details';c.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(text).then(()=>c.textContent='Copied')};
const t=document.createElement('a');t.className='btn g';t.href='tel:+27114407750';t.textContent='Call 011 440 7750';a.append(t,c);box.append(h,p,a);box.style.display='block'}
$('#oform').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),l=Object.entries(qty).filter(x=>x[1]).map(x=>x[1]+' x '+x[0]).join('\n');
done($('#odone'),'Order request ready','Name: '+f.get('n')+'\nPhone: '+f.get('p')+'\nDate needed: '+(f.get('d')||'not set')+'\n\n'+l+'\n\nNotes: '+(f.get('m')||'none')+'\n\nCall us on 011 440 7750 to confirm pricing and delivery.')};
$('#eform').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
done($('#edone'),'Enquiry ready','Name: '+f.get('n')+'\nPhone: '+f.get('p')+'\nService: '+f.get('s')+'\nDate and guests: '+(f.get('d')||'not set')+'\n\n'+(f.get('m')||''))};
$$('[data-s]').forEach(a=>a.onclick=()=>{$('#svc').value=a.dataset.s});
