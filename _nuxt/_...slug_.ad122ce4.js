import i from"./ContentRendererMarkdown.98d019ff.js";import l from"./ContentRenderer.77144288.js";import{k as p,y as d,Z as u,o as x,c as f,d as t,$ as n,u as o,a as r,w as h}from"./entry.4b1bb13a.js";import{u as g}from"./asyncData.d3869fa6.js";import{q as y}from"./query.c997db34.js";import"./index.1dec55d2.js";import"./preview.05ba6a81.js";import"./index.48c103b6.js";import"./utils.8333162a.js";const w={class:"container mx-auto px-2"},v={class:"mx-6 md:mx-12"},C={class:"shadow-lg bg-gray-200 mb-10 p-10"},b={class:"font-bold text-3xl text-gray-700"},k={class:"text-sm text-gray-600 flex items-center mb-4"},B={class:"prose max-w-none"},j=p({__name:"[...slug]",async setup(R){let e,a;const c=d(),{data:s}=([e,a]=u(()=>g("page-data",()=>y(c.path).findOne())),e=await e,a(),e);return($,q)=>{const m=i,_=l;return x(),f("div",w,[t("div",v,[t("article",C,[t("h1",b,n(o(s).title),1),t("p",k,n(o(s).date),1),t("article",B,[r(_,{class:"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto",value:o(s)},{default:h(()=>[r(m,{value:o(s)},null,8,["value"])]),_:1},8,["value"])])])])])}}});export{j as default};