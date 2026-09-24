(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`mono-m2-156`,nameAr:`خلية أحادية البلورة M2 (156×156 مم)`,nameEn:`Mono PERC M2 156mm`,type:`mono`,widthMm:156,heightMm:156,spec:{voc:.685,isc:9.6,vmp:.57,imp:9,tempCoeffVocPctPerC:-.32,tempCoeffIscPctPerC:.05},source:`قيم نمطية تعليمية مقاربة لخلايا Mono PERC تجارية شائعة (156مم)`},{id:`mono-m6-166`,nameAr:`خلية أحادية البلورة M6 (166×166 مم)`,nameEn:`Mono PERC M6 166mm`,type:`mono`,widthMm:166,heightMm:166,spec:{voc:.695,isc:10.9,vmp:.58,imp:10.3,tempCoeffVocPctPerC:-.29,tempCoeffIscPctPerC:.05},source:`قيم نمطية تعليمية مقاربة لخلايا Mono PERC تجارية شائعة (166مم)`},{id:`poly-156`,nameAr:`خلية متعددة البلورات (156×156 مم)`,nameEn:`Polycrystalline 156mm`,type:`poly`,widthMm:156,heightMm:156,spec:{voc:.61,isc:8.9,vmp:.5,imp:8.3,tempCoeffVocPctPerC:-.36,tempCoeffIscPctPerC:.06},source:`قيم نمطية تعليمية مقاربة لخلايا Poly تجارية شائعة (156مم)`}];function t(t){let n=e.find(e=>e.id===t);if(!n)throw Error(`موديل خلية غير معروف: `+t);return n}var n=.02585;function r(e){let{voc:t,isc:r,vmp:i,imp:a}=e,o=1.3,s=.005;for(let e=0;e<60;e++){let e=o*n,c=r/(Math.exp(t/e)-1),l=e*Math.log(Math.max((r-a)/c+1,1e-12))-a*s-i;if(Math.abs(l)<1e-5)break;o-=l/i*.15,o=Math.max(.9,Math.min(2,o)),s=Math.max(0,s+(l>0?.002:-.002)*Math.abs(l))}let c=o*n;return{iph:r,i0:r/(Math.exp(t/c)-1),n:o,rs:s}}function i(e,t,r,i){let a=Math.max(0,r)/1e3,o=i-25,s=e.iph*a*(1+t.tempCoeffIscPctPerC/100*o),c=t.voc*(1+t.tempCoeffVocPctPerC/100*o),l=e.n*n*(1+o/273);return{iph:s,i0:s>1e-9?s/(Math.exp(c/l)-1):e.i0,n:e.n,rs:e.rs}}function a(e,t){let{iph:r,i0:i,n:a,rs:o}=e,s=a*n;if(r<=1e-12)return 0;let c=r;for(let e=0;e<100;e++){let e=(t+c*o)/s,n=Math.exp(Math.min(e,80)),a=(r-i*(n-1)-c)/(-i*(o/s)*n-1),l=c-a;if(!isFinite(l))break;if(Math.abs(l-c)<1e-9){c=l;break}c=l}return Math.max(0,c)}function o(e,t,n){if(t<=0)return s(e,n);let r=0,i=n*1.05;for(let n=0;n<40&&!(a(e,i)<t);n++)i*=1.2;for(let n=0;n<80;n++){let n=(r+i)/2;a(e,n)>t?r=n:i=n}return(r+i)/2}function s(e,t){let n=0,r=t*1.2;for(let t=0;t<80;t++){let t=(n+r)/2;a(e,t)>1e-6?n=t:r=t}return(n+r)/2}function c(e){return e.reduce((e,t)=>t.p>e.p?t:e,e[0])}var l=class{parent=new Map;find(e){this.parent.has(e)||this.parent.set(e,e);let t=this.parent.get(e);if(t===e)return e;let n=this.find(t);return this.parent.set(e,n),n}union(e,t){let n=this.find(e),r=this.find(t);n!==r&&this.parent.set(n,r)}};function u(e,t,n,r){let i=e(n)>e(r),a=1e-7,o=n,s=r;for(let n=0;n<60;n++){let n=(o+s)/2,r=e(n);(i?r>t+a:r<t-a)?o=n:s=n}return(o+s)/2}function d(e,t,n){let r=e.nodeB===n,i=t.nodeB===n,a,o,s;r&&!i?(a=e,o=t,s=!1):i&&!r?(a=t,o=e,s=!1):(a=e,o=t,s=!0);let c=a.nodeA===n?a.nodeB:a.nodeA,l=o.nodeA===n?o.nodeB:o.nodeA,d=Math.min(e.iMaxHint,t.iMaxHint),f=e=>a.voltageAtCurrent(e)+o.voltageAtCurrent(e);return{id:`${e.id}+${t.id}`,componentId:`${e.componentId}+${t.componentId}`,kind:`series`,nodeA:c,nodeB:l,currentAtVoltage:e=>s?0:u(f,e,0,d*1.01),voltageAtCurrent:f,iMaxHint:d,vMaxHint:e.vMaxHint+t.vMaxHint,sourceComponentIds:[...e.sourceComponentIds,...t.sourceComponentIds],polarityConflict:s||e.polarityConflict||t.polarityConflict}}function f(e,t){let n=e.nodeA!==t.nodeA||e.polarityConflict||t.polarityConflict,r=n=>e.currentAtVoltage(n)+t.currentAtVoltage(n),i=Math.min(e.vMaxHint,t.vMaxHint);return{id:`${e.id}||${t.id}`,componentId:`${e.componentId}||${t.componentId}`,kind:`parallel`,nodeA:e.nodeA,nodeB:e.nodeB,currentAtVoltage:r,voltageAtCurrent:e=>n?0:u(r,e,0,i*1.01),iMaxHint:e.iMaxHint+t.iMaxHint,vMaxHint:i,sourceComponentIds:[...e.sourceComponentIds,...t.sourceComponentIds],polarityConflict:n}}function p(e,t,n,r){let i=new l;for(let t of e)i.union(t.fromTerminal,t.toTerminal);for(let e of t)i.find(e.fromTerminal),i.find(e.toTerminal);i.find(n),i.find(r);let a=i.find(n),o=i.find(r);if(a===o)return{ok:!1,isShort:!0,reason:`قصر مباشر بين طرفي الخرج (لا يوجد فرق جهد).`};let s=t.map(e=>({...e.edge,nodeA:i.find(e.fromTerminal),nodeB:i.find(e.toTerminal)}));if(s.length===0)return{ok:!1,isOpen:!0,reason:`لا توجد مكوّنات فعّالة موصولة بين طرفي الخرج.`};let c=!0,u=0;for(;c&&u<500;){c=!1,u++;for(let e=0;e<s.length;e++){for(let t=e+1;t<s.length;t++){let n=s[e],r=s[t];if(n.nodeA===r.nodeA&&n.nodeB===r.nodeB||n.nodeA===r.nodeB&&n.nodeB===r.nodeA){let i=f(n,r);s=s.filter((n,r)=>r!==e&&r!==t),s.push(i),c=!0;break}}if(c)break}if(c)continue;let e=new Map;for(let t of s)e.set(t.nodeA,(e.get(t.nodeA)||0)+1),e.set(t.nodeB,(e.get(t.nodeB)||0)+1);for(let[t,n]of e)if(t!==a&&t!==o&&n===2){let e=[];if(s.forEach((n,r)=>{(n.nodeA===t||n.nodeB===t)&&e.push(r)}),e.length===2){let n=d(s[e[0]],s[e[1]],t);s=s.filter((t,n)=>!e.includes(n)),s.push(n),c=!0;break}}}if(s.length===1&&(s[0].nodeA===a||s[0].nodeA===o)){let e=s[0];if(e.polarityConflict)return{ok:!1,isPolarityConflict:!0,reason:`تعارض قطبية: يوجد مصدران (أو أكثر) موصولان بقطبية متعاكسة على نفس نقطتي الاتصال — تحقق من اتجاه الخلايا أو السلاسل. صحّح اتجاه أحدهما.`};let t=e.voltageAtCurrent(0);return{ok:!0,equivalentEdge:e,isOutputReversed:(e.nodeA===a?t:-t)<0}}let p=new Map;for(let e of s)p.has(e.nodeA)||p.set(e.nodeA,[]),p.has(e.nodeB)||p.set(e.nodeB,[]),p.get(e.nodeA).push(e.nodeB),p.get(e.nodeB).push(e.nodeA);let m=new Set([a]),h=[a];for(;h.length;){let e=h.pop();for(let t of p.get(e)||[])m.has(t)||(m.add(t),h.push(t))}return m.has(o)?{ok:!1,outOfScope:!0,reason:`شبكة التوصيلات الحالية لا تُختزل بالكامل إلى سلسلة/توازي — هذه الحالة خارج نطاق المحرك حاليًا، فلا يمكن عرض نتيجة موثوقة.`}:{ok:!1,isOpen:!0,reason:`دائرة مفتوحة: لا يوجد مسار موصَّل من المكوّنات إلى طرفي الخرج.`}}function m(e,t,n=3){let r=Math.round(t/e*300),i=Array.from({length:n},(e,t)=>(t+1)*300/(n+1)),a=Array.from({length:22},(e,t)=>10+t*((r-20)/22));return`
  <svg viewBox="0 0 300 ${r}" xmlns="http://www.w3.org/2000/svg" class="cell-svg">
    <defs>
      <linearGradient id="siGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1a2f6b"/>
        <stop offset="50%" stop-color="#25428f"/>
        <stop offset="100%" stop-color="#152459"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="296" height="${r-4}" rx="6" fill="url(#siGrad)" stroke="#0d173d" stroke-width="2"/>
    ${a.map(e=>`<line x1="6" y1="${e}" x2="294" y2="${e}" stroke="#3a5bb0" stroke-width="0.6" opacity="0.55"/>`).join(``)}
    ${i.map(e=>`<rect x="${e-3}" y="4" width="6" height="${r-8}" fill="#d6dbe6" opacity="0.9"/>`).join(``)}
    <text x="150" y="${r-8}" text-anchor="middle" font-size="9" fill="#9fb0e0" font-family="sans-serif">الوجه الأمامي — قطب سالب (–)</text>
  </svg>`}function h(){return`
  <svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="10" width="200" height="120" rx="10" fill="#2b2d31" stroke="#111" stroke-width="3"/>
    <rect x="30" y="30" width="70" height="30" rx="4" fill="#444" stroke="#000"/>
    <text x="65" y="50" text-anchor="middle" font-size="10" fill="#9f9" font-family="sans-serif">Diode 1</text>
    <rect x="120" y="30" width="70" height="30" rx="4" fill="#444" stroke="#000"/>
    <text x="155" y="50" text-anchor="middle" font-size="10" fill="#9f9" font-family="sans-serif">Diode 2</text>
    <circle cx="45" cy="105" r="9" fill="#c0392b"/>
    <text x="45" y="122" text-anchor="middle" font-size="10" fill="#eee" font-family="sans-serif">+</text>
    <circle cx="175" cy="105" r="9" fill="#2c3e50"/>
    <text x="175" y="122" text-anchor="middle" font-size="10" fill="#eee" font-family="sans-serif">−</text>
    <text x="110" y="20" text-anchor="middle" font-size="9" fill="#ccc" font-family="sans-serif">صندوق التوصيل</text>
  </svg>`}function g(e,t,n){let r=e.getContext(`2d`),i=window.devicePixelRatio||1,a=e.clientWidth||320,o=e.clientHeight||220;if(e.width=a*i,e.height=o*i,r.setTransform(i,0,0,i,0,0),r.clearRect(0,0,a,o),!t.length){r.fillStyle=`#888`,r.font=`13px sans-serif`,r.textAlign=`center`,r.fillText(`لا توجد بيانات — أكمل التوصيل أولاً`,a/2,o/2);return}let s={l:42,r:42,t:14,b:28},c=a-s.l-s.r,l=o-s.t-s.b,u=Math.max(...t.map(e=>e.v))*1.05||1,d=Math.max(...t.map(e=>e.i))*1.15||1,f=Math.max(...t.map(e=>e.p))*1.15||1,p=e=>s.l+e/u*c,m=e=>s.t+l-e/d*l,h=e=>s.t+l-e/f*l;r.strokeStyle=`#d0d5dd`,r.lineWidth=1,r.beginPath(),r.moveTo(s.l,s.t),r.lineTo(s.l,s.t+l),r.lineTo(s.l+c,s.t+l),r.stroke(),r.strokeStyle=`#f59e0b`,r.lineWidth=2.2,r.beginPath(),t.forEach((e,t)=>{let n=p(e.v),i=m(e.i);t===0?r.moveTo(n,i):r.lineTo(n,i)}),r.stroke(),r.strokeStyle=`#2563eb`,r.lineWidth=2.2,r.beginPath(),t.forEach((e,t)=>{let n=p(e.v),i=h(e.p);t===0?r.moveTo(n,i):r.lineTo(n,i)}),r.stroke(),n&&(r.fillStyle=`#16a34a`,r.beginPath(),r.arc(p(n.v),m(n.i),4.5,0,Math.PI*2),r.fill()),r.fillStyle=`#475467`,r.font=`11px sans-serif`,r.textAlign=`center`,r.fillText(`الجهد (V)`,s.l+c/2,o-6),r.save(),r.translate(12,s.t+l/2),r.rotate(-Math.PI/2),r.fillStyle=`#f59e0b`,r.fillText(`التيار I (A)`,0,0),r.restore(),r.save(),r.translate(a-10,s.t+l/2),r.rotate(Math.PI/2),r.fillStyle=`#2563eb`,r.fillText(`القدرة P (W)`,0,0),r.restore()}var _=`custom-modules-v1`;function v(){try{return JSON.parse(localStorage.getItem(_)||`[]`)}catch{return[]}}function y(e){let t=v();t.push(e),localStorage.setItem(_,JSON.stringify(t))}var b=`lab1-panel-state-v1`;function x(e,t){return`${e}__${t}`}function S(){return{rows:2,cols:3,cellModelId:e[0].id,cells:[,,,,,,].fill(null),wires:[],irradiance:1e3,cellTemp:25,loadR:1/0,mode:`training`}}var C=O(),w=[JSON.parse(JSON.stringify(C))],T=0,E=null,D=null;function O(){try{let e=localStorage.getItem(b);if(e)return JSON.parse(e)}catch{}return S()}function k(){localStorage.setItem(b,JSON.stringify(C))}function A(){w=w.slice(0,T+1),w.push(JSON.parse(JSON.stringify(C))),T=w.length-1,k()}function j(){T>0&&(T--,C=JSON.parse(JSON.stringify(w[T])),k(),U())}function M(){T<w.length-1&&(T++,C=JSON.parse(JSON.stringify(w[T])),k(),U())}function N(e,t){let n=Array(e*t).fill(null);for(let r=0;r<Math.min(e,C.rows);r++)for(let e=0;e<Math.min(t,C.cols);e++)n[r*t+e]=C.cells[r*C.cols+e];C.rows=e,C.cols=t,C.cells=n,C.wires=[],A()}function ee(e){let t=Math.floor(e/C.cols),n=e%C.cols;C.cells[e]={id:`cell-${t}-${n}-${Date.now()}`,modelId:C.cellModelId,row:t,col:n},A()}function P(e){let t=C.cells[e];t&&(C.wires=C.wires.filter(e=>!e.fromTerminal.startsWith(t.id+`__`)&&!e.toTerminal.startsWith(t.id+`__`)),C.cells[e]=null,A())}function F(e){let t=x(e.owner,e.side);if(!E){E=e,U();return}let n=x(E.owner,E.side);if(n===t){E=null,U();return}C.wires.find(e=>e.fromTerminal===n&&e.toTerminal===t||e.fromTerminal===t&&e.toTerminal===n)||(C.wires.push({id:`w-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,fromTerminal:n,toTerminal:t}),A()),E=null,U()}function I(){D&&(C.wires=C.wires.filter(e=>e.id!==D),D=null,A(),U())}function L(){confirm(`سيتم حذف جميع التوصيلات الحالية. متابعة؟`)&&(C.wires=[],A(),U())}function R(){confirm(`إعادة ضبط التجربة بالكامل ستحذف كل الخلايا والتوصيلات. متابعة؟`)&&(C=S(),w=[JSON.parse(JSON.stringify(C))],T=0,k(),U())}function z(){let e=C.cells.filter(e=>!!e);if(e.length===0)return{ok:!1,reason:`لم تضع أي خلية بعد.`,curve:[],voc:0,isc:0,mpp:{v:0,i:0,p:0},operating:null,cellCount:0};let n=e.map(e=>{let n=t(e.modelId),s=i(r(n.spec),n.spec,C.irradiance,C.cellTemp),c=n.spec.voc*1.1,l={id:e.id,componentId:e.id,kind:`cell`,currentAtVoltage:e=>a(s,e),voltageAtCurrent:e=>o(s,e,c),iMaxHint:s.iph*1.1||.01,vMaxHint:c,sourceComponentIds:[e.id]};return{fromTerminal:x(e.id,`back`),toTerminal:x(e.id,`front`),edge:l}}),s=p(C.wires,n,x(`jbox`,`pos`),x(`jbox`,`neg`));if(!s.ok||!s.equivalentEdge)return{ok:!1,reason:s.reason||`تعذّر حساب الدائرة.`,isShort:s.isShort,isOpen:s.isOpen,isPolarityConflict:s.isPolarityConflict,curve:[],voc:0,isc:0,mpp:{v:0,i:0,p:0},operating:null,cellCount:e.length};let l=s.equivalentEdge,u=l.voltageAtCurrent(0),d=Math.abs(u),f=u>=0?1:-1,m=[];for(let e=0;e<=60;e++){let t=d*e/60,n=Math.max(0,l.currentAtVoltage(f*t));m.push({v:t,i:n,p:t*n})}let h=m[0]?Math.max(...m.map(e=>e.i)):0,g=c(m),_=null;if(C.loadR===1/0)_={v:d,i:0,p:0};else if(C.loadR===0)_={v:0,i:h,p:0};else{let e=0,t=d;for(let n=0;n<80;n++){let n=(e+t)/2;Math.max(0,l.currentAtVoltage(f*n))>n/C.loadR?e=n:t=n}let n=(e+t)/2,r=n/C.loadR;_={v:n,i:r,p:n*r}}return{ok:!0,curve:m,voc:d,isc:h,mpp:g,operating:_,cellCount:e.length,isOutputReversed:s.isOutputReversed}}function B(){let e=z();if(!e.ok){alert(`لا يمكن الحفظ: `+(e.reason||`الدائرة غير مكتملة.`));return}let t=prompt(`اسم اللوح المخصّص:`,`لوح ${e.cellCount} خلية`);t&&(y({id:`custom-${Date.now()}`,name:t,cellCount:e.cellCount,voc:e.voc,isc:e.isc,vmp:e.mpp.v,imp:e.mpp.i,pmax:e.mpp.p,createdAt:new Date().toISOString()}),alert(`تم الحفظ. سيظهر اللوح في مكتبة المكونات بالمعملين الثاني والثالث.`))}var V;function H(e){V=e,U()}function U(){let n=t(C.cellModelId),r=z();V.innerHTML=`
  <div class="lab1-shell">
    <aside class="panel-left" id="panelLeft">
      <h3>مكتبة المكونات</h3>
      <label>موديل الخلية
        <select id="cellModelSel">
          ${e.map(e=>`<option value="${e.id}" ${e.id===C.cellModelId?`selected`:``}>${e.nameAr}</option>`).join(``)}
        </select>
      </label>
      <div class="cell-thumb">${m(n.widthMm,n.heightMm)}</div>
      <p class="hint">اختر الموديل ثم اضغط على خانة فارغة في مساحة العمل لوضع خلية بهذا الموديل.</p>

      <h4>أبعاد اللوح</h4>
      <div class="row-inline">
        <label>صفوف <input type="number" id="rowsInp" min="1" max="6" value="${C.rows}"/></label>
        <label>أعمدة <input type="number" id="colsInp" min="1" max="6" value="${C.cols}"/></label>
        <button id="applyGridBtn">تطبيق</button>
      </div>

      <h4>بيانات الخلية (STC)</h4>
      <table class="spec-table">
        <tr><td>Voc</td><td>${n.spec.voc.toFixed(3)} V</td></tr>
        <tr><td>Isc</td><td>${n.spec.isc.toFixed(2)} A</td></tr>
        <tr><td>Vmp</td><td>${n.spec.vmp.toFixed(3)} V</td></tr>
        <tr><td>Imp</td><td>${n.spec.imp.toFixed(2)} A</td></tr>
      </table>
      <p class="hint small">المصدر: ${n.source}</p>

      <h4>وضع التجربة</h4>
      <div class="row-inline">
        <label><input type="radio" name="mode" value="training" ${C.mode===`training`?`checked`:``}/> تدريبي</label>
        <label><input type="radio" name="mode" value="assessment" ${C.mode===`assessment`?`checked`:``}/> تقييم</label>
      </div>
    </aside>

    <main class="workbench-area">
      <div class="toolbar">
        <button id="undoBtn" ${T===0?`disabled`:``}>↩ تراجع</button>
        <button id="redoBtn" ${T===w.length-1?`disabled`:``}>↪ إعادة</button>
        <button id="clearWiresBtn">مسح الأسلاك</button>
        <button id="deleteWireBtn" ${D?``:`disabled`}>حذف السلك المحدد</button>
        <button id="resetBtn" class="danger">إعادة ضبط التجربة</button>
        <span class="spacer"></span>
        <button id="checkBtn" class="primary">🔍 فحص التوصيل</button>
        <button id="runBtn" class="primary">▶ تشغيل</button>
        <button id="saveModuleBtn">💾 حفظ كلوح مخصّص</button>
        <button id="reportBtn">📄 تقرير الإنجاز</button>
      </div>

      <div class="workbench" id="workbench">
        ${W()}
        ${G()}
      </div>

      <div class="check-result" id="checkResult"></div>
    </main>

    <aside class="panel-right">
      <h3>أجهزة القياس والتحكم</h3>
      <label>الإشعاع الشمسي: <b>${C.irradiance}</b> W/m²
        <input type="range" id="irrRange" min="100" max="1200" step="50" value="${C.irradiance}"/>
      </label>
      <label>درجة حرارة الخلية: <b>${C.cellTemp}</b> °C
        <input type="range" id="tempRange" min="0" max="75" step="1" value="${C.cellTemp}"/>
      </label>
      <label>مقاومة الحمل (DC Load)
        <select id="loadSel">
          <option value="inf" ${C.loadR===1/0?`selected`:``}>دائرة مفتوحة (فولتميتر فقط)</option>
          <option value="0" ${C.loadR===0?`selected`:``}>قصر (اختبار Isc)</option>
          <option value="mpp">عند نقطة القدرة القصوى تقريبًا</option>
          ${[1,2,5,10,20,50,100].map(e=>`<option value="${e}" ${C.loadR===e?`selected`:``}>${e} Ω</option>`).join(``)}
        </select>
      </label>

      <div class="meters">
        <div class="meter-box"><span>V</span><b>${r.operating?r.operating.v.toFixed(2):`--`}</b></div>
        <div class="meter-box"><span>I</span><b>${r.operating?r.operating.i.toFixed(2):`--`}</b></div>
        <div class="meter-box"><span>P</span><b>${r.operating?r.operating.p.toFixed(2):`--`}</b></div>
      </div>

      <h4>منحنيا I-V وP-V</h4>
      <canvas id="ivChart" width="320" height="220" style="width:100%;height:220px"></canvas>

      <h4>نتائج المصفوفة الحالية</h4>
      ${r.ok?`<table class="spec-table">
              <tr><td>عدد الخلايا الفعّالة</td><td>${r.cellCount}</td></tr>
              <tr><td>Voc</td><td>${r.voc.toFixed(2)} V</td></tr>
              <tr><td>Isc</td><td>${r.isc.toFixed(2)} A</td></tr>
              <tr><td>Vmp</td><td>${r.mpp.v.toFixed(2)} V</td></tr>
              <tr><td>Imp</td><td>${r.mpp.i.toFixed(2)} A</td></tr>
              <tr><td>Pmax</td><td>${r.mpp.p.toFixed(2)} W</td></tr>
            </table>`:`<p class="hint">${r.reason||`أكمل التوصيل لعرض النتائج.`}</p>`}
    </aside>
  </div>`,q(r),requestAnimationFrame(()=>{let e=document.getElementById(`ivChart`);e&&g(e,r.curve,r.operating||void 0)})}function W(){let e=`<div class="cell-grid" style="grid-template-columns:repeat(${C.cols}, 96px); gap:26px;">`;return C.cells.forEach((n,r)=>{if(!n)e+=`<div class="cell-slot empty" data-idx="${r}"><span>+</span></div>`;else{let i=t(n.modelId),a=x(n.id,`front`),o=x(n.id,`back`),s=E&&x(E.owner,E.side)===a?`selected`:``,c=E&&x(E.owner,E.side)===o?`selected`:``;e+=`<div class="cell-slot filled" data-idx="${r}">
        <div class="cell-img">${m(i.widthMm,i.heightMm)}</div>
        <button class="term-dot term-front ${s}" data-owner="${n.id}" data-side="front" title="الطرف الأمامي (–)"></button>
        <button class="term-dot term-back ${c}" data-owner="${n.id}" data-side="back" title="الطرف الخلفي (+)"></button>
        <button class="remove-cell" data-idx="${r}" title="إزالة">✕</button>
      </div>`}}),e+=`</div>`,e}function G(){let e=E&&x(E.owner,E.side)===x(`jbox`,`pos`)?`selected`:``,t=E&&x(E.owner,E.side)===x(`jbox`,`neg`)?`selected`:``;return`
  <div class="jbox-area">
    <div class="jbox-img">${h()}</div>
    <button class="term-dot jbox-pos ${e}" data-owner="jbox" data-side="pos" title="خرج موجب +"></button>
    <button class="term-dot jbox-neg ${t}" data-owner="jbox" data-side="neg" title="خرج سالب −"></button>
  </div>
  <p class="hint">وصّل الطرف الخلفي (+) لآخر خلية بالطرف الموجب لصندوق التوصيل، والطرف الأمامي (–) لأول خلية بالطرف السالب.</p>
  <div class="wire-list">
    ${C.wires.map(e=>`<button class="wire-chip ${D===e.id?`selected`:``}" data-wid="${e.id}">${K(e.fromTerminal)} → ${K(e.toTerminal)}</button>`).join(``)||`<span class="hint">لا توجد توصيلات بعد</span>`}
  </div>`}function K(e){let[t,n]=e.split(`__`);return t===`jbox`?n===`pos`?`صندوق التوصيل (+)`:`صندوق التوصيل (−)`:`خلية ${n===`front`?`أمامي(–)`:`خلفي(+)`}`}function q(e){V.querySelector(`#cellModelSel`)?.addEventListener(`change`,e=>{C.cellModelId=e.target.value,U()}),V.querySelector(`#applyGridBtn`)?.addEventListener(`click`,()=>{let e=Number(V.querySelector(`#rowsInp`).value)||1,t=Number(V.querySelector(`#colsInp`).value)||1;N(Math.min(6,Math.max(1,e)),Math.min(6,Math.max(1,t))),U()}),V.querySelectorAll(`input[name="mode"]`).forEach(e=>e.addEventListener(`change`,e=>{C.mode=e.target.value,k(),U()})),V.querySelectorAll(`.cell-slot.empty`).forEach(e=>e.addEventListener(`click`,()=>{ee(Number(e.dataset.idx)),U()})),V.querySelectorAll(`.remove-cell`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation(),P(Number(e.dataset.idx)),U()})),V.querySelectorAll(`.term-dot`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.owner,r=e.dataset.side;F({owner:n,side:r})})),V.querySelectorAll(`.wire-chip`).forEach(e=>e.addEventListener(`click`,()=>{D=e.dataset.wid,U()})),V.querySelector(`#undoBtn`)?.addEventListener(`click`,j),V.querySelector(`#redoBtn`)?.addEventListener(`click`,M),V.querySelector(`#clearWiresBtn`)?.addEventListener(`click`,L),V.querySelector(`#deleteWireBtn`)?.addEventListener(`click`,I),V.querySelector(`#resetBtn`)?.addEventListener(`click`,R),V.querySelector(`#saveModuleBtn`)?.addEventListener(`click`,B),V.querySelector(`#reportBtn`)?.addEventListener(`click`,()=>J(e)),V.querySelector(`#irrRange`)?.addEventListener(`input`,e=>{C.irradiance=Number(e.target.value),k(),U()}),V.querySelector(`#tempRange`)?.addEventListener(`input`,e=>{C.cellTemp=Number(e.target.value),k(),U()}),V.querySelector(`#loadSel`)?.addEventListener(`change`,e=>{let t=e.target.value;if(t===`inf`)C.loadR=1/0;else if(t===`0`)C.loadR=0;else if(t===`mpp`){let e=z();C.loadR=e.ok&&e.mpp.i>0?e.mpp.v/e.mpp.i:1/0}else C.loadR=Number(t);k(),U()}),V.querySelector(`#checkBtn`)?.addEventListener(`click`,()=>{let e=z(),t=V.querySelector(`#checkResult`);t.innerHTML=e.ok&&e.isOutputReversed?`<div class="err-msg">⚠️ القطبية معكوسة: الطرف الموجب للمصفوفة وصل إلى الطرف السالب لصندوق التوصيل والعكس. Voc المقاس=${e.voc.toFixed(2)}V لكن بإشارة معكوسة — صحّح اتجاه التوصيل بصندوق التوصيل.</div>`:e.ok?`<div class="ok-msg">✅ التوصيل صحيح فيزيائيًا. ${e.cellCount} خلية مُختزلة بنجاح إلى شبكة سلسلة/توازي متّسقة. Voc=${e.voc.toFixed(2)}V، Isc=${e.isc.toFixed(2)}A.</div>`:e.isShort?`<div class="err-msg">⚠️ قصر كهربائي: طرفا الخرج موصولان مباشرة بلا فرق جهد. راجع التوصيلات.</div>`:e.isOpen?`<div class="err-msg">⚠️ دائرة مفتوحة: لا يوجد مسار مكتمل من الخلايا إلى صندوق التوصيل.</div>`:e.isPolarityConflict?`<div class="err-msg">⚠️ تعارض قطبية: يوجد مساران متوازيان بقطبية متعاكسة على نفس نقطتي الاتصال. راجع اتجاه التوصيل.</div>`:`<div class="err-msg">⚠️ ${e.reason}</div>`}),V.querySelector(`#runBtn`)?.addEventListener(`click`,()=>U())}function J(e){let t=window.open(``,`_blank`);if(!t)return;let n=prompt(`اسم المتدرب:`)||`—`,r=prompt(`الشعبة/المجموعة:`)||`—`,i=new Date().toLocaleString(`ar-SA`);t.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تقرير إنجاز — معمل تجميع اللوح</title>
  <style>body{font-family:'Tahoma',sans-serif;padding:24px;color:#111} h1{color:#b8860b} table{width:100%;border-collapse:collapse;margin-top:12px} td,th{border:1px solid #ccc;padding:8px;text-align:right} .warn{color:#b91c1c}
  @media print{button{display:none}}</style></head><body>
  <h1>تقرير إنجاز — معمل تجميع اللوح الشمسي</h1>
  <p>المدرب: فهد رفاعي — fahdacademy.org</p>
  <table>
    <tr><th>المتدرب</th><td>${n}</td></tr>
    <tr><th>الشعبة</th><td>${r}</td></tr>
    <tr><th>التاريخ</th><td>${i}</td></tr>
    <tr><th>عدد الخلايا الموصولة</th><td>${e.cellCount}</td></tr>
    <tr><th>حالة التوصيل</th><td>${e.ok?`صحيح ✅`:`به خطأ ⚠️ — `+(e.reason||``)}</td></tr>
    <tr><th>Voc</th><td>${e.ok?e.voc.toFixed(2)+` V`:`—`}</td></tr>
    <tr><th>Isc</th><td>${e.ok?e.isc.toFixed(2)+` A`:`—`}</td></tr>
    <tr><th>Pmax</th><td>${e.ok?e.mpp.p.toFixed(2)+` W`:`—`}</td></tr>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#666">هذا الحفظ/الطباعة لا يُعدّ تسليمًا إلكترونيًا للمدرب. للتسليم الرسمي يُرجى اتباع تعليمات المدرب المباشرة.</p>
  <button onclick="window.print()">طباعة / حفظ PDF</button>
  </body></html>`)}function Y(){return JSON.stringify(C,null,2)}function X(e){try{C=JSON.parse(e),A(),U()}catch{alert(`ملف التجربة غير صالح.`)}}function Z(e){let t=v();e.innerHTML=`
  <div class="stub-lab">
    <h2>المعمل الثاني: النظام الشمسي المنفصل عن الشبكة (Off-Grid)</h2>
    <div class="stub-badge">قيد التطوير — البنية المشتركة جاهزة</div>
    <p>هذا المعمل يستخدم نفس محرك الدوائر ونظام الأصول المبني في المعمل الأول (اختزال سلسلة/توازي، نموذج الدايود الواحد للخلايا، مكتبة مكونات مستقلة عن منطق المحاكاة). لم يُبنَ بعد داخله: صندوق التجميع، فيوزات gPV، منظم شحن MPPT، البطارية وBMS، الإنفرتر المنفصل، لوحة توزيع AC، والمحاكاة الزمنية لشحن/تفريغ البطارية.</p>
    <h3>الألواح المخصّصة المحفوظة من المعمل الأول</h3>
    ${t.length?`<table class="spec-table"><tr><th>الاسم</th><th>عدد الخلايا</th><th>Voc</th><th>Isc</th><th>Pmax</th></tr>
      ${t.map(e=>`<tr><td>${e.name}</td><td>${e.cellCount}</td><td>${e.voc.toFixed(2)}V</td><td>${e.isc.toFixed(2)}A</td><td>${e.pmax.toFixed(1)}W</td></tr>`).join(``)}</table>`:`<p class="hint">لا توجد ألواح محفوظة بعد. اذهب إلى المعمل الأول واحفظ لوحًا لتظهر هنا (هذا الربط بين المعامل يعمل فعليًا).</p>`}
  </div>`}function Q(e){e.innerHTML=`
  <div class="stub-lab">
    <h2>المعمل الثالث: النظام المتصل بالشبكة والهجين</h2>
    <div class="stub-badge">قيد التطوير — البنية المشتركة جاهزة</div>
    <p>سيُبنى على نفس محرك الدوائر والبنية المشتركة، مع سيناريوهات: إنتاج أقل/أكبر من الاستهلاك، التشغيل الليلي، انقطاع الشبكة (فصل إلزامي للإنفرتر الشبكي)، وشحن/تفريغ البطارية في المسار الهجين مع منع تغذية الشبكة المفصولة.</p>
  </div>`}var te=document.getElementById(`app`);function ne(){return`
  <header class="topbar">
    <div class="brand">
      <span class="logo">☀️</span>
      <div>
        <h1>معمل الأنظمة الشمسية الذكي</h1>
        <p>فكرة وتنفيذ المدرب فهد رفاعي — <a href="https://fahdacademy.org" target="_blank" rel="noopener">fahdacademy.org</a></p>
      </div>
    </div>
    <button id="mobileNavToggle" class="mobile-only nav-toggle">☰ المعامل</button>
  </header>
  <nav class="lab-nav" id="labNav">
    <a href="#/lab1" data-route="lab1">1️⃣ تجميع اللوح الشمسي</a>
    <a href="#/lab2" data-route="lab2">2️⃣ النظام المنفصل عن الشبكة</a>
    <a href="#/lab3" data-route="lab3">3️⃣ النظام المتصل بالشبكة والهجين</a>
    <span class="nav-tools">
      <button id="exportBtn" title="تصدير ملف التجربة">⬇ تصدير</button>
      <label class="import-label">⬆ استيراد<input type="file" id="importFile" accept="application/json" hidden/></label>
    </span>
  </nav>
  <div id="labRoot" class="lab-root"></div>
  `}function re(){return location.hash.replace(`#/`,``)||`home`}function $(){te.innerHTML=ne();let e=document.getElementById(`labRoot`),t=re();document.querySelectorAll(`.lab-nav a`).forEach(e=>{e.classList.toggle(`active`,e.dataset.route===t)}),t===`lab1`||t===`home`?H(e):t===`lab2`?Z(e):t===`lab3`&&Q(e),document.getElementById(`mobileNavToggle`)?.addEventListener(`click`,()=>{document.getElementById(`labNav`)?.classList.toggle(`open`)}),document.getElementById(`exportBtn`)?.addEventListener(`click`,()=>{let e=new Blob([Y()],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`تجربة-معمل-اللوح.json`,n.click(),URL.revokeObjectURL(t)}),document.getElementById(`importFile`)?.addEventListener(`change`,e=>{let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=()=>X(String(n.result)),n.readAsText(t)})}window.addEventListener(`hashchange`,$),location.hash||(location.hash=`#/lab1`),$();