import{C as _,D as E,r as S,E as k,F as x}from"./entry.476c2a3d.js";import{h as p}from"./index.65a31f1c.js";import{w as l,s as P,u as A}from"./utils.5c0504c5.js";const h=(r,e)=>e.split(".").reduce((t,s)=>t&&t[s],r),g=(r,e)=>Object.keys(r).filter(e).reduce((t,s)=>Object.assign(t,{[s]:r[s]}),{}),D=r=>e=>Array.isArray(e)?e.map(t=>r(t)):r(e),d=r=>{const e=[],t=[];for(const s of r)["$","_"].includes(s)?e.push(s):t.push(s);return{prefixes:e,properties:t}},j=(r=[])=>e=>{if(r.length===0||!e)return e;const{prefixes:t,properties:s}=d(r);return g(e,i=>!s.includes(i)&&!t.includes(i[0]))},I=(r=[])=>e=>{if(r.length===0||!e)return e;const{prefixes:t,properties:s}=d(r);return g(e,i=>s.includes(i)||t.includes(i[0]))},Q=(r,e)=>{const t=new Intl.Collator(e.$locale,{numeric:e.$numeric,caseFirst:e.$caseFirst,sensitivity:e.$sensitivity}),s=Object.keys(e).filter(i=>!i.startsWith("$"));for(const i of s)r=r.sort((n,a)=>{const o=[h(n,i),h(a,i)].map(c=>{if(c!==null)return c instanceof Date?c.toISOString():c});return e[i]===-1&&o.reverse(),t.compare(o[0],o[1])});return r},B=(r,e="Expected an array")=>{if(!Array.isArray(r))throw new TypeError(e)},u=r=>Array.isArray(r)?r:r?[r]:[],C=["sort","where","only","without"],m=(r,e)=>{const t={...e};for(const n of C)t[n]&&(t[n]=u(t[n]));const s=(n,a=o=>o)=>(...o)=>(t[n]=a(...o),i),i={params:()=>t,only:s("only",u),without:s("without",u),where:s("where",n=>[...u(t.where),n]),sort:s("sort",n=>[...u(t.sort),...u(n)]),limit:s("limit",n=>parseInt(String(n),10)),skip:s("skip",n=>parseInt(String(n),10)),find:()=>r(i),findOne:()=>(t.first=!0,r(i)),findSurround:(n,a)=>(t.surround={query:n,...a},r(i)),locale:n=>i.where({_locale:n})};return i};function w(r){return JSON.stringify(r,O)}function O(r,e){return e instanceof RegExp?`--REGEX ${e.toString()}`:e}const T=r=>{let e=w(r);return e=typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e),e=e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,""),(e.match(/.{1,100}/g)||[]).join("/")},y=r=>async e=>{var a,o,c;const{content:t}=S().public;r&&(e.params().first&&(e.params().where||[]).length===0?e.where({_path:k(r)}):e.where({_path:new RegExp(`^${r.replace(/[-[\]{}()*+.,^$\s/]/g,"\\$&")}`)})),(a=e.params().sort)!=null&&a.length||e.sort({_file:1,$numeric:!0}),t.locales.length&&((c=(o=e.params().where)==null?void 0:o.find(f=>f._locale))!=null&&c._locale||e.locale(t.defaultLocale));const s=e.params(),i=t.experimental.stripQueryParameters?l(`/query/${`${p(s)}.${t.integrity}`}/${T(s)}.json`):l(`/query/${p(s)}.${t.integrity}.json`);if(P())return(await x(()=>import("./client-db.7c022714.js"),["./client-db.7c022714.js","./entry.476c2a3d.js","./entry.5a9e0e05.css","./utils.5c0504c5.js","./index.1dec55d2.js","./index.65a31f1c.js"],import.meta.url).then(f=>f.useContentDatabase())).fetch(e);const n=await $fetch(i,{method:"GET",responseType:"json",params:t.experimental.stripQueryParameters?void 0:{_params:w(s),previewToken:A("previewToken").value}});if(typeof n=="string"&&n.startsWith("<!DOCTYPE html>"))throw new Error("Not found");return n};function F(r,...e){return typeof r=="string"?m(y(_(E(r,...e)))):m(y(),r)}export{B as a,u as b,D as c,I as d,T as e,m as f,h as g,w as j,F as q,Q as s,j as w};