import{_ as r,o as n,c as h,d as c}from"./entry.4b1bb13a.js";const o={name:"Spectrogram",props:{canvasWidth:{type:Number,default:750},canvasHeight:{type:Number,default:500},fillStyle:{type:String,default:"rgba(0,0,0)"}},data(){return{dataArray:[],dataArrayHistory:[]}},mounted(){navigator.mediaDevices.getUserMedia({audio:!0}).then(a=>{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.audioCtx.createAnalyser(),this.source=this.audioCtx.createMediaStreamSource(a),this.source.connect(this.analyser),this.analyser.fftSize=256,this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),this.canvas=document.getElementById("spectrogramCanvas"),this.canvasCtx=this.canvas.getContext("2d"),this.canvasCtx.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.draw()}).catch(function(a){console.error(a)})},methods:{draw(){requestAnimationFrame(this.draw),this.analyser.getByteFrequencyData(this.dataArray),this.dataArrayHistory.push(this.dataArray.slice()),this.dataArrayHistory.length>256&&this.dataArrayHistory.shift(),this.canvasCtx.fillStyle=this.fillStyle,this.canvasCtx.fillRect(0,0,this.canvasWidth,this.canvasHeight);const a=this.canvasWidth/this.bufferLength,s=this.canvasHeight/256;for(let t=0;t<this.dataArrayHistory.length;t++)for(let e=0;e<this.dataArrayHistory[t].length;e++){const i=this.dataArrayHistory[t][e];this.canvasCtx.fillStyle=`rgb(${i},${0},${i})`,this.canvasCtx.fillRect(e*a,t*s,a,s)}}}},d=["width","height"];function l(a,s,t,e,i,y){return n(),h("div",null,[c("canvas",{id:"spectrogramCanvas",width:t.canvasWidth,height:t.canvasHeight},null,8,d)])}const f=r(o,[["render",l]]);export{f as default};