(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{319:function(e,t,r){"use strict";r.r(t);var n=r(8),c=(r(42),r(27),r(144),{data:function(){return{searchQuery:"",articles:[]}},watch:{searchQuery:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e){r.next=3;break}return t.articles=[],r.abrupt("return");case 3:return r.next=5,t.$content("articles").limit(6).search(e).fetch();case 5:t.articles=r.sent;case 6:case"end":return r.stop()}}),r)})))()}}}),l=r(17),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"relative flex w-full flex-wrap items-stretch mb-3"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],staticClass:"\n        p-3\n        placeholder-gray-400\n        text-gray-600\n        relative\n        bg-white bg-white\n        rounded\n        text-sm\n        border border-gray-400\n        outline-none\n        focus:outline-none focus:ring\n        w-full\n      ",attrs:{type:"search",autocomplete:"off",placeholder:"Search Articles"},domProps:{value:e.searchQuery},on:{input:function(t){t.target.composing||(e.searchQuery=t.target.value)}}})]),e._v(" "),e.articles.length?r("ul",e._l(e.articles,(function(article){return r("li",{key:article.slug},[r("NuxtLink",{attrs:{to:{name:"blog-slug",params:{slug:article.slug}}}},[e._v("\n        "+e._s(article.title)+"\n      ")])],1)})),0):e._e()])}),[],!1,null,null,null);t.default=component.exports}}]);