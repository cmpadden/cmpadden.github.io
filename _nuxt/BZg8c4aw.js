import{m as u,c as m,b as c,o as p}from"./B89Hy56H.js";const v={data(){return{}},mounted(){const a=["#FFBA08","#FAA307","#F48C06","#E85D04","#DC2F02","#D00000","#9D0208","#6A040F","#370617","#03071E"],s=e=>{const i=t=>e.unhex([t.slice(1,3),t.slice(3,5),t.slice(5,7)]),d=(t,o)=>t.map(n=>{const r=e.floor(n+e.random(-o,o));return r<0?0:r>255?255:r});e.setup=()=>{e.createCanvas(400,400),e.frameRate(5)},e.draw=()=>{e.background(0,0,0),e.noStroke(),e.noFill();const t=9,o=400/t;for(let n=0;n<=t;n++)for(let r=0;r<=t;r++){const f=a[r%9];e.fill(d(i(f),15)),e.square(n*o,r*o,o)}}};new this.$p5(s,"canvas")}},I={class:"bg-gradient-to-b from-green-800 to-gray-800"};function b(a,s,e,i,d,l){return p(),m("div",I,s[0]||(s[0]=[c("div",{class:"grid h-screen place-items-center"},[c("div",{class:"font-mono text-white"},[c("div",{class:"mb-2 border-2 border-white"},[c("div",{id:"canvas"})])])],-1)]))}const _=u(v,[["render",b]]);export{_ as default};