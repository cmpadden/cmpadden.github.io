(window.webpackJsonp=window.webpackJsonp||[]).push([[9,5,6,7,8],{271:function(t,e,n){"use strict";n.r(e);var l={props:["articles"]},r=n(17),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container mx-auto mb-4"},[n("div",{staticClass:"p-2 mx-6 md:mx-12"},[n("h1",{staticClass:"py-4 text-4xl font-bold leading-tight text-white"},[t._v("\n      Latest Blog Posts\n    ")]),t._v(" "),t._l(t.articles,(function(article){return n("div",{key:article.slug},[n("NuxtLink",{attrs:{to:{name:"posts-slug",params:{slug:article.slug}}}},[n("div",{staticClass:"mb-2 text-white bg-black border border-white shadow-lg bg-opacity-30 hover:bg-opacity-70"},[n("div",{staticClass:"flex"},[n("div",{staticClass:"flex-grow py-4 pl-4"},[n("div",{staticClass:"text-xl font-bold"},[t._v("\n                "+t._s(article.title)+"\n              ")]),t._v(" "),n("div",{staticClass:"text-sm"},[t._v("\n                "+t._s(article.date)+"\n              ")])]),t._v(" "),article.tags.includes("tip")?n("div",{staticClass:"flex flex-wrap content-center p-4"},[n("svg",{staticClass:"w-6 h-6 hover:text-yellow-800",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"}})])]):t._e()])])])],1)}))],2)])}),[],!1,null,null,null);e.default=component.exports},272:function(t,e,n){"use strict";n.r(e);var l={data:function(){return{links:[{title:"MIDI Chord Identifier",description:"Identify the chords being played by your attached MIDI device",link:"/playground/chords"},{title:"MIDI Events",description:"View the MIDI events triggered by a MIDI-controller through the Web MIDI API",link:"/playground/midi"},{title:"1000 French Conjugations",description:"Study the conjugations of the top 1000 most popular French verbs",link:"/playground/french"},{title:"Matrix Multiplication",description:"Step through the process of matrix multiplication",link:"/playground/matrix"}]}}},r=n(17),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container mx-auto mb-4"},[n("div",{staticClass:"px-2 mx-6 text-white md:mx-12"},[n("h1",{staticClass:"py-4 text-4xl font-bold leading-tight text-white"},[t._v("\n      Playground\n    ")]),t._v(" "),n("div",{staticClass:"grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-auto"},t._l(t.links,(function(link){return n("nuxt-link",{key:link.title,attrs:{to:link.link}},[n("div",{staticClass:"h-full p-3 bg-black border bg-opacity-30 hover:bg-opacity-70"},[n("h3",{staticClass:"pb-2 text-xl font-bold"},[t._v(t._s(link.title))]),t._v(" "),n("div",{staticClass:"text-base font-light",domProps:{innerHTML:t._s(link.description)}})])])})),1)])])}),[],!1,null,null,null);e.default=component.exports},273:function(t,e,n){"use strict";n.r(e);var l=n(17),component=Object(l.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container mx-auto mb-4"},[n("div",{staticClass:"mx-6 md:mx-12"},[n("div",{staticClass:"flex flex-wrap"},[n("div",{staticClass:"w-full md:w-2/3"},[n("div",{staticClass:"p-2"},[n("h1",{staticClass:"pb-4 text-4xl font-bold leading-tight text-white"},[t._v("\n            Who·Am·I\n          ")]),t._v(" "),n("div",{staticClass:"font-medium tracking-wide text-white sm:text-base lg:text-lg"},[t._v("\n            I am a\n            "),n("span",{staticClass:"gradient-highlight"},[t._v("data engineer and web developer")]),t._v("\n            working at Georgetown University's\n            "),n("a",{staticClass:"border-b-2 border-blue-200",attrs:{target:"_blank",rel:"noopener noreferrer",href:"https://mccourt.georgetown.edu/research/the-massive-data-institute/"}},[t._v("Massive Data Institute")]),t._v("\n            in the McCourt School of Public Policy, with a primary focus on\n            building data warehousing and processing solutions for social\n            scientists and researchers to leverage large-scale organic data.\n          ")])])]),t._v(" "),n("div",{staticClass:"flex flex-col items-center justify-center hidden w-full p-12 md:block md:w-1/3"},[n("img",{staticClass:"shadow-lg ring-2 ring-white",attrs:{src:"https://avatars.githubusercontent.com/u/5807118?v=4",alt:"Colton Padden Avatar"}})])])])])}],!1,null,null,null);e.default=component.exports},274:function(t,e,n){"use strict";n.r(e);var l=n(17),component=Object(l.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"py-12 text-white bg-gradient-to-r from-blackish to-pink-600"},[n("div",{staticClass:"container mx-auto"},[n("div",{staticClass:"mx-6 md:mx-12"},[n("div",{staticClass:"flex flex-wrap-reverse"},[n("div",{staticClass:"w-full p-2 md:w-1/3"},[n("div",{staticClass:"h-full p-3 bg-black border bg-opacity-70"},[n("h3",{staticClass:"pb-2 text-xl font-bold text-center"},[t._v("\n              Technical Interests\n            ")]),t._v(" "),n("hr",{staticClass:"py-2 border-gray-300"}),t._v(" "),n("ul",{staticClass:"text-base custom-list"},[n("li",[t._v("Data Pipeline Engineering")]),t._v(" "),n("li",[t._v("Distributed Systems")]),t._v(" "),n("li",[t._v("Embedded Systems")]),t._v(" "),n("li",[t._v("Programming Languages")]),t._v(" "),n("li",[t._v("Developer Tooling")])])])]),t._v(" "),n("div",{staticClass:"w-full p-2 md:w-1/3"},[n("div",{staticClass:"h-full p-3 bg-black border bg-opacity-70"},[n("h3",{staticClass:"pb-2 text-xl font-bold text-center"},[t._v("Air Quality")]),t._v(" "),n("hr",{staticClass:"py-2 border-gray-300"}),t._v(" "),n("p",{staticClass:"mb-8 text-base text-center"},[t._v("\n              I am a founding member and technical adviser to\n              "),n("a",{staticClass:"underline",attrs:{href:"https://guaq.tech"}},[t._v("Globally Unified Air Quality")]),t._v(", a startup aimed at providing low-cost solutions for measuring\n              and analysing air-quality conditions around the world.\n            ")])])]),t._v(" "),n("div",{staticClass:"w-full p-2 md:w-1/3"},[n("div",{staticClass:"h-full p-3 bg-black border bg-opacity-70"},[n("h3",{staticClass:"pb-2 text-xl font-bold text-center"},[t._v("Consulting")]),t._v(" "),n("hr",{staticClass:"py-2 border-gray-300"}),t._v(" "),n("p",{staticClass:"mb-8 text-base text-center"},[t._v("\n              I worked as a technical consultant for financial institutions\n              and government agencies in the Washington, D.C. area, providing\n              guidance on identity and access management, and big data\n              solutions.\n            ")])])])])])])])}],!1,null,null,null);e.default=component.exports},330:function(t,e,n){"use strict";n.r(e);var l=n(8),r=(n(42),n(2).a.extend({asyncData:function(t){return Object(l.a)(regeneratorRuntime.mark((function e(){var n,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,t._,e.next=3,n("articles").only(["title","description","date","img","slug","author","tags"]).sortBy("date","desc").limit(5).fetch();case 3:return l=e.sent,e.abrupt("return",{articles:l});case 5:case"end":return e.stop()}}),e)})))()}})),o=n(17),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("SectionAboutMe"),t._v(" "),n("SectionInterests"),t._v(" "),n("SectionBlogPosts",{attrs:{articles:t.articles}}),t._v(" "),n("SectionPlayground")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{SectionAboutMe:n(273).default,SectionInterests:n(274).default,SectionBlogPosts:n(271).default,SectionPlayground:n(272).default})}}]);