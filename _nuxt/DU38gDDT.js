import{o as t,c as n,b as e,i as r,f as l,g as u,a as h,_ as c,k as w,t as g,F as y,r as x,e as k,h as m}from"./CpWz7w5J.js";function b(o,i){return t(),n("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon"},[e("path",{"fill-rule":"evenodd",d:"M8.914 6.025a.75.75 0 0 1 1.06 0 3.5 3.5 0 0 1 0 4.95l-2 2a3.5 3.5 0 0 1-5.396-4.402.75.75 0 0 1 1.251.827 2 2 0 0 0 3.085 2.514l2-2a2 2 0 0 0 0-2.828.75.75 0 0 1 0-1.06Z","clip-rule":"evenodd"}),e("path",{"fill-rule":"evenodd",d:"M7.086 9.975a.75.75 0 0 1-1.06 0 3.5 3.5 0 0 1 0-4.95l2-2a3.5 3.5 0 0 1 5.396 4.402.75.75 0 0 1-1.251-.827 2 2 0 0 0-3.085-2.514l-2 2a2 2 0 0 0 0 2.828.75.75 0 0 1 0 1.06Z","clip-rule":"evenodd"})])}const M={class:"flex justify-end"},I={__name:"MoreLink",props:{to:{type:String,required:!0}},setup(o){const i=o;return(a,d)=>{const p=c;return t(),n("div",M,[r(p,{to:i.to,class:"flex items-center text-sm font-bold text-white hover:text-orange-500"},{default:l(()=>[u(" More "),r(h(b),{class:"ml-1 h-5 w-5","aria-hidden":"true"})]),_:1},8,["to"])])}}},j={class:"bg-gradient-to-b from-transparent to-background text-white"},D={class:"container mx-auto space-y-4 py-8 text-white"},L={class:"mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"},P={class:"h-full rounded-xl bg-black bg-opacity-70 drop-shadow-lg hover:ring-1 hover:ring-white"},V={class:"min-h-28 px-4 pt-4"},B={class:"pb-2 text-xl font-bold"},C=["innerHTML"],N={key:0},S=["src"],T={key:0},q="Experiments",F={__name:"Playground",props:{showImages:{type:Boolean,default:!1},limit:{type:Number,default:null},linkToPlayground:{type:Boolean,default:!1}},setup(o){const i=o,a=[{title:"Conway",description:"Conway's Game of Life",link:"/playground/conway",img:"/images/previews/conway.png"},{title:"wm.spoon",description:"Hammerpoon Window Manager",link:"https://github.com/cmpadden/wm.spoon",img:"/images/previews/wm.spoon.png"},{title:"Metronome",description:"A simple metronome for tracking tempo.",link:"/playground/metronome",img:"/images/previews/metronome.png"},{title:"Conjugations",description:"Search and explore the conjugations of 1000 French verbs",link:"/playground/french",img:"/images/previews/french-conjugations.png"},{title:"Mountains",description:"Visualize a gradient of colored waves generated with Perlin noise",link:"/playground/palettes/mountains",img:"/images/previews/noise.png"},{title:"Spectrogram",description:"Visualize the audio from your microphone as a waveform, frequency bars, and a spectrogram",link:"/playground/audio",img:"/images/previews/microphone.png"},{title:"Waves",description:"Demonstration of using p5.js within Vue.js to visualize trigonometric functions",link:"/playground/waves",img:"/images/previews/waves.png"},{title:"MIDI Chords",description:"Identify the chords being played by your attached MIDI device",link:"/playground/chords",img:"/images/previews/chord-identifier.png"},{title:"MIDI Events",description:"View the MIDI events triggered by a MIDI-controller through the Web MIDI API",link:"/playground/midi",img:"/images/previews/midi-events.png"},{title:"Matrix Multiplication",description:"Step through the process of matrix multiplication",link:"/playground/matrix",img:"/images/previews/matrix-multiplication.png"},{title:"Sequence Plotter",description:"Plot the fist 10,000 digits of Pi, or any sequence of digits, in 2-dimensional space",link:"/playground/plotter",img:"/images/previews/plotter.png"}],d=w(()=>i.limit===null||i.limit<=0?a:a.slice(0,i.limit));return(p,z)=>{const _=c,f=c,v=I;return t(),n("section",j,[e("div",D,[r(_,{to:"/playground",class:"font-mono text-3xl font-semibold lowercase underline decoration-orange-500 underline-offset-4 hover:text-orange-500"},{default:l(()=>[u(g(q))]),_:1}),e("div",L,[(t(!0),n(y,null,x(h(d),s=>(t(),k(f,{key:s.title,to:s.link},{default:l(()=>[e("div",P,[e("div",V,[e("h3",B,g(s.title),1),e("div",{class:"line-clamp-2 text-base font-light",innerHTML:s.description},null,8,C)]),o.showImages?(t(),n("div",N,[e("img",{class:"h-40 w-full rounded-b-xl object-cover object-top grayscale hover:grayscale-0",src:s.img||"images/placeholder.png"},null,8,S)])):m("",!0)])]),_:2},1032,["to"]))),128))]),o.linkToPlayground?(t(),n("div",T,[r(v,{to:"/playground"})])):m("",!0)])])}}};export{I as _,F as a};