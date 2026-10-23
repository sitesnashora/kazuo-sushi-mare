/* Kazuo Sushi · CARDÁPIO DE EXEMPLO (itens inspirados nas fotos do Google; preços ilustrativos) */
window.FL={
 IMG:{var:'photo-1563612116625-3012372fccce',phila:'photo-1579871494447-9811cf80d66c',barca:'photo-1553621042-f6e147245754',tray:'photo-1582450871972-ab5ca641643d',blk:'photo-1611143669185-af224c5e3252',sq:'photo-1617196034796-73dfa7b1fd56',tare:'photo-1653122024993-31e02aedb1ac',rect:'photo-1617196905100-216ffe128142',board:'photo-1579584425555-c3ce17fd4351',plate:'photo-1580822184713-fc5400e7fe10',tem:'photo-1710962169574-d1b52a2670e2',lata:'photo-1696739696220-8d2e27465662'},
 SZ:['Média','Grande'],
 CATS:[
  {id:'combo',name:'Combinados',rm:['Sem cebolinha','Sem gergelim','Sem cream cheese'],ex:1,items:[
   ['Combinado 20 peças','Uramaki, hossomaki, hot roll e niguiri de salmão.','blk'],['Combinado 30 peças','Uramaki, hot roll, joe, hossomaki e niguiri de salmão.','sq'],['Combinado 50 peças','Mix da casa com hot roll, uramaki, joe com camarão e sashimi.','tray'],['Barca 70 peças','Barca da casa com sashimi, joe, uramaki, hot roll e niguiri.','barca']]},
  {id:'hot',name:'Hot Roll',ex:1,rm:['Sem tarê','Sem cebolinha'],items:[
   ['Hot Roll Salmão · 10 un','Empanado, recheado com salmão e cream cheese, com tarê.','tare'],['Hot Roll Camarão · 10 un','Empanado, recheado com camarão e cream cheese, com tarê.','tare']]},
  {id:'ura',name:'Uramaki e Joe',ex:1,rm:['Sem cebolinha','Sem gergelim'],items:[
   ['Uramaki Philadelphia · 8 un','Salmão, cream cheese e cebolinha.','phila'],['Joe de Salmão · 4 un','Salmão envolvendo arroz, com cream cheese.','plate'],['Joe com Camarão · 4 un','Joe de salmão finalizado com camarão.','rect'],['Hossomaki Salmão · 8 un','Enrolado fino de salmão com alga.','board']]},
  {id:'tem',name:'Temaki',ex:1,rm:['Sem cebolinha','Sem cream cheese'],items:[
   ['Temaki Salmão','Cone de alga com arroz, salmão, cream cheese e cebolinha.','tem'],['Temaki Skin','Pele de salmão crocante com cream cheese e tarê.','tem'],['Temaki Camarão','Camarão empanado, cream cheese e cebolinha.','tem']]},
  {id:'sas',name:'Sashimi e Niguiri',rm:[],items:[
   ['Sashimi de Salmão · 10 fatias','Fatias de salmão fresco.','rect'],['Niguiri de Salmão · 4 un','Bolinho de arroz coberto com salmão.','var']]},
  {id:'beb',name:'Bebidas',rm:[],items:[
   ['Refrigerante Lata','350 ml.','lata'],['Refrigerante 2 L','Garrafa de 2 litros.','lata'],['Água','500 ml.','lata']]}
 ],
 PRICE:{'combo-0':45,'combo-1':65,'combo-2':99,'combo-3':149,'hot-0':25,'hot-1':28,'ura-0':28,'ura-1':24,'ura-2':28,'ura-3':18,'tem-0':28,'tem-1':22,'tem-2':30,'sas-0':38,'sas-1':22,'beb-0':6,'beb-1':13,'beb-2':4},
 EXPRICE:[],
 EXTRAS:[['Shoyu extra',1],['Tarê extra',2],['Cream cheese extra',3],['Gengibre',2],['Wasabi',2]],
 KEY:{orders:'kz_orders',cfg:'kz_cfg',me:'kz_me',mine:'kz_mine'},
 ST:{novo:'Recebido',forno:'No forno',saiu:'Saiu pra entrega',pronto:'Pronto pra retirar',fim:'Entregue',cancel:'Cancelado'}
};
(function(F){F.PRODUCTS=[];F.CATS.forEach(c=>c.items.forEach((it,i)=>{const id=c.id+'-'+i,p=F.PRICE[id];F.PRODUCTS.push({exp:(F.EXPRICE||[]).includes(id),id,cat:c.id,name:it[0],desc:it[1],img:F.IMG[it[2]],sz:Array.isArray(p)?p.slice():[p],szn:c.szn||null,ex:!!c.ex,rm:c.rm||[]})}));
 F.get=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}};
 F.set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}try{F.bc&&F.bc.postMessage(k)}catch(e){}};
 try{F.bc=new BroadcastChannel('kazuo')}catch(e){F.bc=null}
 F.cfg=()=>Object.assign({mode:'auto',wait:'40 a 60 min',off:[],price:{}},F.get(F.KEY.cfg,{}));
 F.sizes=p=>{const c=F.cfg(),o=c.price[p.id];return o?p.sz.map(v=>o+(v-p.sz[0])):p.sz};
 F.brl=v=>'R$ '+Number(v).toFixed(2).replace('.',',');
 F.esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 F.U=(id,w,h)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=68`;
 /* horário real (Google): ter a dom 19h; fecha 0h (sex e sáb 1h); segunda fechado */
 F.hoursOpen=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),h=+p.hour;const open=(h>=19&&d!==1)||(h<1&&(d===6||d===0));return{d,h,open}};
 F.isOpen=()=>{const c=F.cfg();return c.mode==='open'?true:c.mode==='closed'?false:F.hoursOpen().open};
 F.on=fn=>{addEventListener('storage',e=>{if(!e.key||e.key.startsWith('kz_'))fn()});F.bc&&F.bc.addEventListener('message',fn)};
})(window.FL);
