import{k as C,y as _,z as O,A as R,d as U,j as N,w as V,s as E,o as r,c as n,b as o,a,F as y,B as q,C as I,D as K,r as k,g as B,t as x,h as S}from"./CpWz7w5J.js";import{h as W}from"./DvDH6DOc.js";import{u as M}from"./C6F1HAxM.js";function G(h,l,v){const[e={},c]=typeof l=="string"?[{},l]:[l,v],s=C(()=>_(h)),t=e.key||W([c,typeof s.value=="string"?s.value:"",...H(e)]);if(!t||typeof t!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+t);const d=t===c?"$f"+t:t;if(!e.baseURL&&typeof s.value=="string"&&s.value[0]==="/"&&s.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:m,lazy:w,default:j,transform:D,pick:F,watch:u,immediate:p,getCachedData:i,deep:g,dedupe:L,...$}=e,b=O({...R,...$,cache:typeof e.cache=="boolean"?void 0:e.cache}),A={server:m,lazy:w,default:j,transform:D,pick:F,immediate:p,getCachedData:i,deep:g,dedupe:L,watch:u===!1?[]:[b,s,...u||[]]};let f;return M(d,()=>{var z;(z=f==null?void 0:f.abort)==null||z.call(f),f=typeof AbortController<"u"?new AbortController:{};const T=_(e.timeout);return T&&setTimeout(()=>f.abort(),T),(e.$fetch||globalThis.$fetch)(s.value,{signal:f.signal,...b})},A)}function H(h){var v;const l=[((v=_(h.method))==null?void 0:v.toUpperCase())||"GET",_(h.baseURL)];for(const e of[h.params||h.query]){const c=_(e);if(!c)continue;const s={};for(const[t,d]of Object.entries(c))s[_(t)]=_(d);l.push(s)}return l}const P={class:"flex h-screen flex-col font-mono"},Q={class:"flex flex-1 overflow-hidden"},J=o("div",{class:"flex w-20 bg-amber-500"},[o("div",{class:"absolute bottom-10 w-20 -rotate-90 transform whitespace-nowrap"},[o("div",{class:"text-4xl font-bold text-white"}," 1000 French Conjugations ")])],-1),X={class:"flex flex-1 flex-col overflow-y-auto bg-amber-100 p-8"},Y=o("div",{class:"flex rounded-xl bg-amber-500 p-4"},[o("div",{class:"text-center text-xl italic text-white"}," Click a word to the left or right to cycle through the 1000 most popular French verb conjugations! ")],-1),Z={class:"inline-flex flex-col justify-center py-4 text-gray-600"},ee={key:0,class:"mt-2 w-full border border-gray-100 bg-white"},te=["onClick"],oe=o("svg",{class:"absolute left-2 top-2 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[o("path",{d:"M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"})],-1),se={class:"flex p-4"},ae={class:"text-cyan-600 flex-1 text-center text-3xl font-bold"},re={class:"text-amber-500"},ne={class:"grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4 xl:gap-12"},le={class:"border-cyan-600 h-full space-y-3 rounded-md border-2 bg-white p-4 shadow shadow-amber-500"},ce={class:"text-2xl font-semibold capitalize text-gray-700"},ie={class:"text-gray-500"},ue={key:1,class:"italic"},xe=U({__name:"index",async setup(h){let l,v;const e=N(0),c=N(""),s=N([]),{data:t}=([l,v]=V(()=>G("/1000_french_conjugations.json",{transform:u=>u},"$lRKQKt9Al2")),l=await l,v(),l),d=C(()=>{if(t.value)return t.value[e.value]}),m=C(()=>{if(t.value!==null)return e.value===0?void 0:t.value[e.value-1]}),w=C(()=>{if(t.value!==null)return e.value+1===t.value.length?void 0:t.value[e.value+1]});E(c,u=>{if(s.value=[],!u)return;let p=0;s.value=t.value.filter(i=>i.word.normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").includes(u)&&p<=5?(p++,!0):!1)});const j=()=>{t.value&&e.value<t.value.length-1&&(e.value+=1)},D=()=>{e.value>0&&(e.value-=1)},F=u=>{c.value="",s.value=[],e.value=u.word_popularity-1};return(u,p)=>(r(),n("div",P,[o("div",Q,[J,o("div",X,[a(t)&&a(t).length>0&&a(d)?(r(),n(y,{key:0},[Y,o("div",Z,[q(o("input",{"onUpdate:modelValue":p[0]||(p[0]=i=>K(c)?c.value=i:null),class:"rounded-xl border border-2 border-gray-400 p-2 pl-8 focus:border-amber-500 focus:outline-none",type:"search",autocomplete:"off",placeholder:"Search Words"},null,512),[[I,a(c)]]),a(s).length>0?(r(),n("ul",ee,[(r(!0),n(y,null,k(a(s),i=>(r(),n("li",{key:i.word,class:"relative cursor-pointer py-1 pl-8 pr-2 hover:bg-yellow-50 hover:text-gray-900",onClick:g=>F(i)},[oe,B(" "+x(i.word),1)],8,te))),128))])):S("",!0)]),o("div",se,[o("div",{class:"flex-1 cursor-pointer select-none text-center text-2xl text-gray-400",onClick:D},x(a(m)?a(m).word:"-"),1),o("div",ae,[o("span",re," #"+x(a(d).word_popularity),1),B(" "+x(a(d).word),1)]),o("div",{class:"flex-1 cursor-pointer select-none text-center text-2xl text-gray-400",onClick:j},x(a(w)?a(w).word:"-"),1)]),o("div",ne,[(r(!0),n(y,null,k(a(d).conjugations,(i,g)=>(r(),n("div",{key:g},[o("div",le,[o("h1",ce,x(g),1),o("div",ie,[(r(!0),n(y,null,k(i,(L,$)=>(r(),n("p",{key:$},[(r(!0),n(y,null,k(L,(b,A)=>(r(),n("i",{key:A},x(b.text),1))),128))]))),128))])])]))),128))])],64)):(r(),n("div",ue,"Loading..."))])])]))}});export{xe as default};