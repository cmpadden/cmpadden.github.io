import{p as D,s as q,v as T,o as y,c as b,b as t,d as E,j as W,x as R,i as C,a as x,F as A,r as F,t as u}from"./CpWz7w5J.js";const M={id:"waveform-canvas-container",class:"bg-green h-full w-full"},N=["width","height"],P={__name:"Waveform",props:{timeDomainBufferHistory:{type:Array},canvasWidth:{type:Number},canvasHeight:{type:Number},fillStyle:{type:String,default:"rgba(0,0,0)"},strokeStyle:{type:String,default:"rgb(255, 255, 255)"}},setup(f){const n=f;return D(()=>{const d=document.getElementById("waveformCanvas2"),e=d.getContext("2d"),s=document.getElementById("waveform-canvas-container"),i=n.canvasHeight?n.canvasHeight:s.clientHeight,o=n.canvasWidth?n.canvasWidth:s.clientWidth;d.height=i,d.width=o,e.fillRect(0,0,o,i),q(n.timeDomainBufferHistory,a=>{e.fillStyle=n.fillStyle,e.fillRect(0,0,o,i),e.lineWidth=2,e.strokeStyle=n.strokeStyle,e.beginPath();const h=a.slice(-1)[0],_=h.length,m=o/_;let g=0;for(let l=0;l<_;l++){const v=h[l]/128*i/2;l===0?e.moveTo(g,v):e.lineTo(g,v),g+=m}e.lineTo(d.width,d.height/2),e.stroke()})}),T(()=>{}),(d,e)=>(y(),b("div",M,[t("canvas",{id:"waveformCanvas2",width:f.canvasWidth,height:f.canvasHeight},null,8,N)]))}},U={id:"spectrogram-canvas-container",class:"h-full w-full"},O=["width","height"],k=36,G={__name:"Spectrogram",props:{frequencyDomainBufferHistory:{type:Array},canvasWidth:{type:Number},canvasHeight:{type:Number},fillStyle:{type:String,default:"rgba(0,0,0)"}},setup(f){const n=f,d=(e,s,i,o,a)=>(e-s)*(a-s)/(i-s)+o;return D(()=>{const e=document.getElementById("spectrogramCanvas"),s=e.getContext("2d"),i=document.getElementById("spectrogram-canvas-container"),o=n.canvasHeight?n.canvasHeight:i.clientHeight,a=n.canvasWidth?n.canvasWidth:i.clientWidth;e.height=o,e.width=a,s.fillRect(0,0,a,o),q(n.frequencyDomainBufferHistory,h=>{s.fillStyle=n.fillStyle,s.fillRect(0,0,a,o);const _=h.slice(-k),m=a/128,g=o/k;for(let l=0;l<128;l++)for(let c=0;c<k;c++){const v=_[c][l],w=d(v,0,255,1,4);s.fillStyle=`rgb(${v}, 0, ${v})`,s.beginPath(),s.arc(l*m+m/2,c*g+g/2,w,0,2*Math.PI),s.fill()}})}),(e,s)=>(y(),b("div",null,[t("div",U,[t("canvas",{id:"spectrogramCanvas",width:f.canvasWidth,height:f.canvasHeight},null,8,O)])]))}},L={id:"bar-graph-container",class:"h-full w-full"},V=["width","height"],I=2,Y={__name:"FrequencyBarGraph",props:{audioBufferHistory:{type:Array},canvasWidth:{type:Number},canvasHeight:{type:Number},fillStyle:{type:String,default:"rgba(0,0,0)"},strokeStyle:{type:String,default:"rgb(255, 255, 255)"}},setup(f){const n=f,d=(e,s,i,o,a)=>(e-s)*(a-s)/(i-s)+o;return D(()=>{const e=document.getElementById("frequencyBarGraphCanvas"),s=e.getContext("2d"),i=document.getElementById("bar-graph-container"),o=n.canvasHeight?n.canvasHeight:i.clientHeight,a=n.canvasWidth?n.canvasWidth:i.clientWidth;e.height=o,e.width=a,s.fillRect(0,0,a,o),q(n.audioBufferHistory,h=>{s.fillStyle=n.fillStyle,s.fillRect(0,0,a,o);const _=h.slice(-1)[0],m=a/_.length-I;let g=0;for(let l=0;l<_.length;l++){const c=_[l],v=d(c,0,255,0,o);s.fillStyle=`rgb(${c},0,${c})`,s.fillRect(g,o-v,m,v),g+=m+I}})}),(e,s)=>(y(),b("div",null,[t("div",L,[t("canvas",{id:"frequencyBarGraphCanvas",width:f.canvasWidth,height:f.canvasHeight},null,8,V)])]))}},j={class:"container mx-auto font-mono"},z={class:"bg-background text-white"},K={class:"grid grid-cols-3 gap-4"},X={class:"col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1"},Z=t("div",{class:"mb-2 text-xl font-bold"},"Time Domain Waveform",-1),J={class:"col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1"},Q=t("div",{class:"mb-2 text-xl font-bold"},"Frequency Spectrogram",-1),tt={class:"col-span-3 rounded-xl bg-black/75 p-4 lg:col-span-1"},et=t("div",{class:"mb-2 text-xl font-bold"},"Frequency Bar Chart",-1),st={class:"col-span-3 rounded-xl bg-black/75 p-4"},nt=t("div",{class:"mb-2 text-xl font-bold"},"Frequency Buffer History",-1),ot={class:"w-full table-fixed"},at=t("thead",{class:"collapse border-b-2 md:visible"},[t("tr",null,[t("th",{class:"text-left"},"Index"),t("th",{class:"text-left"},"Mean"),t("th",{class:"text-left"},"Min"),t("th",{class:"text-left"},"Max"),t("th",{class:"text-left"},"FFT"),t("th",{class:"text-right"},"Buffer")])],-1),lt={class:"text-left font-bold"},it={class:"text-left"},ct={class:"text-left"},rt={class:"text-left"},dt={class:"text-left"},ht={class:"truncate text-right"},ut={class:"col-span-3 rounded-xl bg-black/75 p-4"},ft=t("div",{class:"mb-2 text-xl font-bold"},"Time Domain Buffer History",-1),gt={class:"w-full table-fixed"},_t=t("thead",{class:"collapse border-b-2 md:visible"},[t("tr",null,[t("th",{class:"text-left"},"Index"),t("th",{class:"text-left"},"Mean"),t("th",{class:"text-left"},"Min"),t("th",{class:"text-left"},"Max"),t("th",{class:"text-left"},"FFT"),t("th",{class:"text-right"},"Buffer")])],-1),vt={class:"text-left font-bold"},mt={class:"text-left"},yt={class:"text-left"},bt={class:"text-left"},pt={class:"text-left"},xt={class:"truncate text-right"},B=256,wt=E({__name:"index",setup(f){let n=null,d=null,e=null,s=null,i=null,o=W([]),a=null,h=W([]);W(!1);const _=()=>{requestAnimationFrame(_),e.getByteTimeDomainData(i),i!==null&&(o.value.push(i.slice()),o.value.length>B&&o.value.shift()),e.getByteFrequencyData(a),a!==null&&(h.value.push(a.slice()),h.value.length>B&&h.value.shift())},m=()=>{navigator.mediaDevices.getUserMedia({audio:!0}).then(l=>{n=l,d=new(window.AudioContext||window.webkitAudioContext),e=d.createAnalyser(),s=d.createMediaStreamSource(n),s.connect(e),e.fftSize=2048,i=new Uint8Array(e.frequencyBinCount),a=new Uint8Array(e.frequencyBinCount);for(let c=0;c<B;c++)o.value.push(new Uint8Array(e.frequencyBinCount));for(let c=0;c<B;c++)h.value.push(new Uint8Array(e.frequencyBinCount));_()}).catch(function(l){console.error(l)})},g=()=>{n!==null&&n.active&&n.getAudioTracks().forEach(l=>{l.stop()})};return R(()=>{console.log("disabling"),g()}),(l,c)=>{const v=P,w=G,$=Y;return y(),b("div",j,[t("div",z,[t("div",K,[t("div",{class:"col-span-3 space-x-2"},[t("div",{class:"inline-block rounded-lg bg-black px-6 py-2 text-sm font-bold uppercase text-white shadow-lg shadow-green-400/25 transition duration-150 ease-in-out hover:cursor-pointer hover:shadow-white/25",onClick:m}," Enable "),t("div",{class:"inline-block rounded-lg bg-black px-6 py-2 text-sm font-bold uppercase text-white shadow-lg shadow-red-400/25 transition duration-150 ease-in-out hover:cursor-pointer hover:shadow-white/25",onClick:g}," Disable ")]),t("div",X,[Z,C(v,{timeDomainBufferHistory:x(o),strokeStyle:"rgb(255, 0, 255)",class:"h-72 border-2 border-gray-400"},null,8,["timeDomainBufferHistory"])]),t("div",J,[Q,C(w,{frequencyDomainBufferHistory:x(h),class:"h-72 border-2 border-gray-400"},null,8,["frequencyDomainBufferHistory"])]),t("div",tt,[et,C($,{audioBufferHistory:x(h),class:"h-72 border-2 border-gray-400"},null,8,["audioBufferHistory"])]),t("div",st,[nt,t("div",null,[t("table",ot,[at,t("tbody",null,[(y(!0),b(A,null,F(x(h).slice(-10),(r,p)=>(y(),b("tr",{key:p},[t("td",lt,u(p),1),t("td",it,u((r.reduce((H,S)=>H+S)/r.length).toFixed(2)),1),t("td",ct,u(Math.min(...r)),1),t("td",rt,u(Math.max(...r)),1),t("td",dt,u(r.length),1),t("td",ht,u(r.slice(0,4))+" ... "+u(r.slice(-4)),1)]))),128))])])])]),t("div",ut,[ft,t("div",null,[t("table",gt,[_t,t("tbody",null,[(y(!0),b(A,null,F(x(o).slice(-10),(r,p)=>(y(),b("tr",{key:p},[t("td",vt,u(p),1),t("td",mt,u((r.reduce((H,S)=>H+S)/r.length).toFixed(2)),1),t("td",yt,u(Math.min(...r)),1),t("td",bt,u(Math.max(...r)),1),t("td",pt,u(r.length),1),t("td",xt,u(r.slice(0,4))+" ... "+u(r.slice(-4)),1)]))),128))])])])])])])])}}});export{wt as default};