import{_ as n,o as h,c,d as r}from"./entry.476c2a3d.js";const o={name:"Waveform",props:{canvasWidth:{type:Number,default:750},canvasHeight:{type:Number,default:500},fillStyle:{type:String,default:"rgba(0,0,0)"},strokeStyle:{type:String,default:"rgb(255, 255, 255)"}},mounted(){navigator.mediaDevices.getUserMedia({audio:!0}).then(t=>{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.audioCtx.createAnalyser(),this.source=this.audioCtx.createMediaStreamSource(t),this.source.connect(this.analyser),this.analyser.fftSize=2048,this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),this.canvas=document.getElementById(this._uid),this.canvasCtx=this.canvas.getContext("2d"),this.canvasCtx.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.draw()}).catch(function(t){console.error(t)})},methods:{draw(){requestAnimationFrame(this.draw),this.analyser.getByteTimeDomainData(this.dataArray),this.canvasCtx.fillStyle=this.fillStyle,this.canvasCtx.fillRect(0,0,this.canvasWidth,this.canvasHeight),this.canvasCtx.lineWidth=2,this.canvasCtx.strokeStyle=this.strokeStyle,this.canvasCtx.beginPath();const t=this.canvasWidth*1/this.bufferLength;let a=0;for(let e=0;e<this.bufferLength;e++){const i=this.dataArray[e]/128*this.canvasHeight/2;e===0?this.canvasCtx.moveTo(a,i):this.canvasCtx.lineTo(a,i),a+=t}this.canvasCtx.lineTo(this.canvas.width,this.canvas.height/2),this.canvasCtx.stroke()}}},d=["id","width","height"];function l(t,a,e,s,i,u){return h(),c("div",null,[r("canvas",{id:t._uid,width:e.canvasWidth,height:e.canvasHeight},null,8,d)])}const f=n(o,[["render",l]]);export{f as default};