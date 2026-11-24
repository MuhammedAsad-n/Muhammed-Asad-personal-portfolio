const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement;
const dark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
try{const s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
function sync(){$('#tt').textContent=dark()?'☀':'☾';if(window.applyCols)applyCols()}
$('#tt').onclick=()=>{const t=dark()?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}sync()};
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',sync);
$('#mb').onclick=()=>$('#lk').classList.toggle('open');
$$('.links a').forEach(a=>a.onclick=()=>$('#lk').classList.remove('open'));
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}

// typing
const roles=['Full-Stack Developer','AI & Backend Engineer','ERP & Business Systems Builder','Embedded & Robotics Developer'];let ri=0,ci=0,del=false;
(function ty(){const w=roles[ri];ci+=del?-1:1;$('#ty').textContent=w.slice(0,ci);let d=del?35:70;
 if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=300}setTimeout(ty,d)})();

// skills + projects
const SK={'Frontend':['React.js','Next.js','TypeScript','JavaScript','HTML5','CSS3','Tailwind CSS'],
'Backend & Data':['Python','FastAPI','REST APIs','Microservices','SQLAlchemy','Alembic','JWT','RBAC','PostgreSQL','SQL Server','Redis','Pandas','SQL','C#'],
'AI & ML':['RAG','NLP','OCR','Embeddings','Semantic search','LLM APIs','LangChain','PyTorch','OpenCV'],
'DevOps & Testing':['Docker','Kubernetes','Linux','Git','GitHub','Prometheus','Grafana','Pytest','Playwright'],
'Reporting & Business':['OpenPyXL','ReportLab','Microsoft Excel','Inventory & stock management','GST','Invoicing','B2B commerce','Logistics','Team leadership'],
'Embedded':['Embedded C','C/C++','Arduino','ESP32','ESP8266','GPIO · PWM · ADC','UART','SPI','I2C','WiFi','Bluetooth','Servo & motor control','Hardware debugging','Rapid prototyping','Proteus','STM32 (basic)','RTOS']};
function tabs(el,names,cb){el.innerHTML=names.map((n,i)=>`<button class="tab${i?'':' on'}">${n}</button>`).join('');
 $$('#'+el.id+' .tab').forEach(b=>b.onclick=()=>{$$('#'+el.id+' .tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');cb(b.textContent)});cb(names[0])}
tabs($('#st'),Object.keys(SK),k=>$('#sc').innerHTML=SK[k].map(s=>`<span class="chip">${s}</span>`).join(''));
const PJ=[
['FORGELYNX – Multi-Company Manufacturing ERP','f','A production-ready ERP covering multi-company inventory, production tracking, supplier and purchase management, and team-based piecework wage calculation. Includes JWT authentication, RBAC, company-level data isolation, audit logs, low-stock alerts and Excel/PDF reporting, tested with Pytest and Playwright.',['Python','FastAPI','Next.js','PostgreSQL','Docker']],
['Open Source Code Intelligence','a','Analyzed 100+ repositories with AI-assisted static analysis and test coverage evaluation, cutting manual review effort by about 50%.',['Python','FastAPI','Docker','PostgreSQL']],
['Vision-RAG Multimodal Search','a','OCR, semantic search and RAG pipelines with sub-500ms query response across 10,000+ document indexes.',['FastAPI','OpenCV','PyTorch','Qdrant','LangChain']],
['Multi-Model AI API Platform','a','A backend serving 5+ LLMs through unified APIs; async services and Redis caching cut routing latency by 30%.',['FastAPI','Redis','Docker','PostgreSQL']],
['AI System Monitoring Platform','a','An observability platform tracking 15+ AI metrics in real time, lowering mean time to detect model degradation by about 60%.',['Prometheus','Grafana','FastAPI','Docker']],
['LIBA – Smart Library Assistant Robot','e','ESP32 firmware drives servo motors for automated book handling, with sensors for detection and positioning, linked to a database and an AI recognition layer for live inventory.',['ESP32','Embedded C','Servos','AI']],
['Face Recognition Attendance','e','A Python and OpenCV face recognition module triggers an Arduino/ESP32 relay to log attendance automatically.',['Python','OpenCV','ESP32','Relay']],
['IoT Home Automation','e','WiFi-enabled ESP8266/ESP32 firmware that switches appliances remotely through relays, with sensor-triggered automation.',['ESP8266','WiFi','Relays','Sensors']]];
$('#pg').innerHTML=PJ.map(p=>`<div class="card proj tilt" data-c="${p[1]}"><h3>${p[0]}</h3><p>${p[2]}</p>${p[3].map(t=>`<span class="tag">${t}</span>`).join('')}</div>`).join('');
tabs($('#ptabs'),['All','Full-Stack','AI & Backend','Embedded'],k=>{const c=k==='All'?'':k==='Full-Stack'?'f':k==='Embedded'?'e':'a';$$('.proj').forEach(p=>p.classList.toggle('hide',!!c&&p.dataset.c!==c))});

// tilt
$$('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(8px)`});
 el.addEventListener('mouseleave',()=>el.style.transform='')});
function openModal(p){$('#mrole').textContent=({e:'Embedded / Robotics',a:'AI & Backend',f:'Full-Stack / ERP'})[p[1]];$('#mt').textContent=p[0];$('#md').textContent=p[2];$('#mtags').innerHTML=p[3].map(t=>`<span class="tag">${t}</span>`).join('');$('#modal').classList.add('show')}
$$('.proj').forEach((p,i)=>{p.onclick=()=>{p.animate([{transform:p.style.transform||'rotateY(0)'},{transform:'rotateY(20deg)'}],{duration:250,easing:'ease-out'});openModal(PJ[i])}});
$('#mx').onclick=()=>$('#modal').classList.remove('show');
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')$('#modal').classList.remove('show')});

// reveal + counters + progress + active link
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
 e.target.querySelectorAll('[data-n]').forEach(n=>{if(n.done)return;n.done=1;const T=+n.dataset.n,dd=n.dataset.d?1:0,t0=performance.now();
 (function f(t){const k=Math.min((t-t0)/1400,1);n.textContent=(T*(1-Math.pow(1-k,3))).toFixed(dd)+(k===1&&!dd?'+':'');if(k<1)requestAnimationFrame(f)})(t0)});io.unobserve(e.target)}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
addEventListener('scroll',()=>{const h=document.documentElement;$('#bar').style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%'},{passive:true});
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText('asadmuhammed2003@gmail.com');toast('Email copied')}catch(e){toast('asadmuhammed2003@gmail.com')}};
$('#cf').onsubmit=e=>{e.preventDefault();location.href='mailto:asadmuhammed2003@gmail.com?subject='+encodeURIComponent('Portfolio message from '+$('#fn').value)+'&body='+encodeURIComponent($('#fm').value+'\n\n'+$('#fe').value);toast('Opening your email app')};

// 3D scene
try{
const R=new THREE.WebGLRenderer({canvas:$('#bg'),alpha:true,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(50,1,.1,100);C.position.z=7;
const G=new THREE.Group();S.add(G);
const shapes=[()=>new THREE.IcosahedronGeometry(2.2,1),()=>new THREE.TorusKnotGeometry(1.5,.5,120,16),()=>new THREE.OctahedronGeometry(2.4,1),()=>new THREE.DodecahedronGeometry(2.2)];let si=0;
const wire=new THREE.Mesh(shapes[0](),new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.5}));
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),new THREE.MeshStandardMaterial({flatShading:true,roughness:.25,metalness:.7}));
const r1=new THREE.Mesh(new THREE.TorusGeometry(3.1,.015,8,120),new THREE.MeshBasicMaterial({transparent:true,opacity:.6})),r2=r1.clone();r2.scale.setScalar(.8);r2.rotation.x=1.2;r1.rotation.y=1;
const N=700,pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*26;
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({size:.05,transparent:true,opacity:.8}));
G.add(wire,core,r1,r2);S.add(pts);
const amb=new THREE.AmbientLight(0xffffff,.6),pl=new THREE.PointLight(0xffffff,1.4,40);pl.position.set(4,4,6);S.add(amb,pl);
window.applyCols=()=>{const c=new THREE.Color(dark()?0x5fd9b0:0x0f7a5a),g=new THREE.Color(dark()?0xd49a4c:0x9a6525);wire.material.color.copy(g);r1.material.color.copy(g);[r2.material,pts.material,core.material].forEach(m=>m.color.copy(c));
 core.material.emissive=new THREE.Color(dark()?0x0b4d3a:0x000000);pts.material.opacity=dark()?.8:.55};
applyCols();
$('#shape').onclick=()=>{si=(si+1)%shapes.length;wire.geometry.dispose();wire.geometry=shapes[si]();G.scale.setScalar(.6);boost=1};
let mx=0,my=0,boost=0;addEventListener("click",()=>{boost=.5});addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function rs(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}rs();addEventListener('resize',rs);
(function loop(){const sf=Math.min(scrollY/innerHeight,1.5),bx=innerWidth>860?2.7:0;
 G.position.x+=((bx-sf*bx*1.8)-G.position.x)*.06;G.position.y+=((sf*-.6)-G.position.y)*.06;
 G.scale.x+=(1-G.scale.x)*.08;G.scale.setScalar(G.scale.x);
 G.rotation.y+=(mx*1.2+scrollY*.002-G.rotation.y)*.05+.003+boost*.1;G.rotation.x+=(my*.8-G.rotation.x)*.05;boost*=.94;
 wire.rotation.z+=.002;core.rotation.x+=.01;core.rotation.y+=.008;r1.rotation.z+=.004;r2.rotation.z-=.006;pts.rotation.y+=.0006;
 pts.position.y=scrollY*.002;pl.position.x=mx*14;pl.position.y=-my*10;R.render(S,C);requestAnimationFrame(loop)})();
}catch(e){console.warn('WebGL unavailable',e)}
const CM={help:'Commands: about, skills, projects, freelance, contact, theme, shape, hire, clear',
about:'Muhammed Asad N: full-stack, AI and backend engineer in Kollam, Kerala.',
skills:'Frontend: React, Next.js, TypeScript, Tailwind\nBackend and AI: Python, FastAPI, PostgreSQL, RAG, PyTorch\nDevOps: Docker, Kubernetes, Pytest, Playwright',
projects:'FORGELYNX ERP, Code Intelligence, Vision-RAG Search, Multi-Model AI API, AI Monitoring, LIBA robot, Face Recognition Attendance, IoT Home Automation',
freelance:'Open to website, custom software, Python/AI backend and embedded projects.',
contact:'asadmuhammed2003@gmail.com | +91 77365 38435'};
function run(c){c=c.trim().toLowerCase();const o=$('#to');if(!c)return;if(c==='clear'){o.textContent='';return}
 o.textContent+='$ '+c+'\n';
 if(c==='theme'){$('#tt').click();o.textContent+='Theme switched.\n'}
 else if(c==='shape'){$('#shape').click();o.textContent+='New 3D shape loaded.\n'}
 else if(c==='hire'){o.textContent+='Scrolling to contact...\n';$('#contact').scrollIntoView({behavior:'smooth'})}
 else o.textContent+=(CM[c]||'Command not found. Type help.')+'\n';
 o.scrollTop=o.scrollHeight}
$('#tcs').innerHTML=['help','skills','projects','freelance','contact','theme','shape','hire'].map(c=>`<button class="tab" data-c="${c}">${c}</button>`).join('');
$$('#tcs .tab').forEach(b=>b.onclick=()=>run(b.dataset.c));
$('#ti').addEventListener('keydown',e=>{if(e.key==='Enter'){run(e.target.value);e.target.value=''}});
addEventListener('pointermove',e=>{$('#glow').style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
// custom cursor
const cur=$('#cur'),curr=$('#curr');let cx=innerWidth/2,cy=innerHeight/2,rx=cx,ry=cy;
addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;cur.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`});
(function cl(){rx+=(cx-rx)*.18;ry+=(cy-ry)*.18;curr.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(cl)})();
$$('a,button,.proj,.tilt,input,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>curr.classList.add('big'));el.addEventListener('mouseleave',()=>curr.classList.remove('big'))});
// preloader
let prog=0;const pb=$('#pb');const pv=setInterval(()=>{prog+=Math.random()*18;if(prog>92)prog=92;pb.style.width=prog+'%'},140);
addEventListener('load',()=>{clearInterval(pv);pb.style.width='100%';setTimeout(()=>$('#pre').classList.add('gone'),350)});
setTimeout(()=>{clearInterval(pv);pb.style.width='100%';$('#pre').classList.add('gone')},3500);
// command palette
const CMDS=[['About','#about'],['Skills','#skills'],['Experience','#experience'],['Projects','#projects'],['Education','#projects'],['Contact','#contact'],['Toggle theme',null,()=>$('#tt').click()],['Change 3D shape',null,()=>$('#shape').click()],['Download resume',null,()=>$('#dl').click()],['Copy email',null,()=>$('#cp').click()]];
let csel=0;
function openPal(){$('#cmdk').classList.add('show');$('#cq').value='';renderCmd('');$('#cq').focus()}
function closePal(){$('#cmdk').classList.remove('show')}
function renderCmd(q){q=q.toLowerCase();const list=CMDS.filter(c=>c[0].toLowerCase().includes(q));csel=0;
 $('#cres').innerHTML=list.map((c,i)=>`<button data-i="${i}" class="${i===0?'sel':''}">${c[0]}</button>`).join('')||'<div style="padding:14px 16px;color:var(--mute)">No matches</div>';
 $$('#cres button').forEach((b,i)=>{b.onclick=()=>{act(list[i]);}})}
function act(c){closePal();if(c[2])c[2]();else if(c[1])$(c[1]).scrollIntoView({behavior:'smooth'})}
$('#pal').onclick=openPal;$('#pal2').onclick=openPal;
$('#cq').addEventListener('input',e=>renderCmd(e.target.value));
$('#cmdk').addEventListener('click',e=>{if(e.target.id==='cmdk')closePal()});
addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#cmdk').classList.contains('show')?closePal():openPal()}
 else if(e.key==='Escape'){closePal();$('#modal').classList.remove('show')}
 else if($('#cmdk').classList.contains('show')){const btns=$$('#cres button');if(!btns.length)return;
  if(e.key==='ArrowDown'){e.preventDefault();btns[csel].classList.remove('sel');csel=(csel+1)%btns.length;btns[csel].classList.add('sel');btns[csel].scrollIntoView({block:'nearest'})}
  else if(e.key==='ArrowUp'){e.preventDefault();btns[csel].classList.remove('sel');csel=(csel-1+btns.length)%btns.length;btns[csel].classList.add('sel');btns[csel].scrollIntoView({block:'nearest'})}
  else if(e.key==='Enter'){btns[csel].click()}}});
// marquee
const MQ=['Full-Stack','Next.js & React','FastAPI','RAG & LLMs','ERP Systems','Python','Docker','Embedded Systems','Freelance Ready'];
$('#mqw').innerHTML=[...MQ,...MQ].map(m=>`<span><b>◆</b>${m}</span>`).join('');
$$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
const secs=$$('section[id]');addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=s.id});$$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))},{passive:true});
sync();
