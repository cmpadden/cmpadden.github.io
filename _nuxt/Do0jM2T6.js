import{m as u,c as v,b as c,o as h}from"./DH5Mm2Xg.js";const y={data(){return{}},mounted(){document.getElementById("canvas").textContent="";const o=["#FFBA08","#FAA307","#F48C06","#E85D04","#DC2F02","#D00000","#9D0208","#6A040F","#370617","#03071E"],a=e=>{const m=document.getElementById("canvas"),r=m.clientWidth,n=m.clientHeight,f=[{color:o[1],min:0,max:.2,yoff:2},{color:o[2],min:.2,max:.4,yoff:2},{color:o[3],min:.4,max:.6,yoff:2},{color:o[4],min:.6,max:.8,yoff:2},{color:o[5],min:.8,max:1,yoff:2}],l=t=>{e.fill(t.color),e.beginShape();let s=1;for(let i=0;i<=r;i+=10){const x=e.map(e.noise(s,t.yoff),0,1,t.min*n,t.max*n);e.curveVertex(i,x),s+=e.random(.5)}t.yoff+=e.random(-.5,.5),e.curveVertex(r,n),e.curveVertex(0,n),e.endShape(e.CLOSE)},d=()=>{e.clear(),e.background(o[0]),f.forEach(t=>l(t))};e.setup=()=>{e.createCanvas(r,n),e.frameRate(5),e.smooth(),e.stroke(255),e.strokeWeight(3),d(),e.noLoop()},e.mousePressed=()=>{d()}};new this.$p5(a,"canvas")}},p={class:"select-none bg-gradient-to-b from-green-800 to-gray-800"};function g(o,a,e,m,r,n){return h(),v("div",p,a[0]||(a[0]=[c("div",{class:"m-6 grid h-2/3 place-items-center"},[c("div",{class:"font-mono text-white"},[c("div",{id:"canvas",class:"mb-2 h-96 border-2 border-white"}),c("div",{class:"my-2 w-48 text-center md:w-full"}," Click or tap anywhere to redraw the waves! ")])],-1)]))}const E=u(y,[["render",g]]);export{E as default};