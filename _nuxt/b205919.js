(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{314:function(t,e,n){"use strict";n.r(e);var r=n(101),c=n(8),l=(n(13),n(270),n(28),n(276),n(278),n(280),n(281),n(282),n(283),n(284),n(285),n(286),n(287),n(288),n(289),n(290),n(291),n(292),n(293),n(30),n(294),n(298),n(300),n(43),n(35),n(67),n(79),n(42),{asyncData:function(t){return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,t._,e.next=3,n("articles").only(["title","description","date","img","slug","author","tags","categories","excerpt","summary"]).sortBy("date","desc").fetch();case 3:return r=e.sent,e.abrupt("return",{articles:r});case 5:case"end":return e.stop()}}),e)})))()},data:function(){return{selected_tags:[],selected_categories:[]}},computed:{categories:function(){return Object(r.a)(new Set(this.articles.map((function(article){return article.categories})).flat().sort()))},tags:function(){return Object(r.a)(new Set(this.articles.map((function(article){return article.tags})).flat().sort()))},visible_articles:function(){var t=this;return this.articles.filter((function(article){return!(t.selected_categories.length>0&&!t.selected_categories.every((function(t){return article.categories.includes(t)})))&&!(t.selected_tags.length>0&&!t.selected_tags.every((function(t){return article.tags.includes(t)})))}))}},methods:{toggle_tag:function(t){this.selected_tags.includes(t)?this.selected_tags=this.selected_tags.filter((function(e){return e!==t})):this.selected_tags.push(t)},toggle_category:function(t){this.selected_categories.includes(t)?this.selected_categories=this.selected_categories.filter((function(e){return e!==t})):this.selected_categories.push(t)}}}),o=n(17),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"mx-6 md:mx-12"},[n("div",{staticClass:"grid grid-cols-4 gap-4"},[n("div",{staticClass:"col-span-4 lg:col-span-3"},t._l(t.visible_articles,(function(article){return n("div",{key:article.slug},[n("div",[n("div",{staticClass:"shadow-lg bg-gray-300 h-full relative mb-2"},[n("div",{staticClass:"px-4 py-2"},[n("div",{staticClass:"font-bold text-xl"},[n("NuxtLink",{staticClass:"gradient-underline",attrs:{to:{name:"posts-slug",params:{slug:article.slug}}}},[t._v(t._s(article.title))])],1),t._v(" "),n("p",{staticClass:"text-sm text-gray-600 flex items-center"},[t._v("\n                "+t._s(article.date)+"\n              ")])]),t._v(" "),n("div",{staticClass:"px-4 pt-2 pb-12 mb-3 bg-gray-100"},[n("p",{staticClass:"text-gray-700 prose-sm"},[n("nuxt-content",{attrs:{document:{body:article.excerpt}}})],1)]),t._v(" "),n("div",{staticClass:"mb-6 absolute bottom-0 right-0"},t._l(article.tags,(function(e){return n("span",{key:e,staticClass:"\n                  inline-block\n                  bg-gray-200\n                  px-3\n                  py-1\n                  mr-2\n                  text-sm text-blue-500\n                  mr-2\n                  select-none\n                ",class:{"bg-green-100":t.selected_tags.includes(e)}},[n("div",{staticClass:"tag"},[t._v(t._s(e))])])})),0)])])])})),0),t._v(" "),n("div",{staticClass:"col-span-4 lg:col-span-1 inline-block"},[n("div",{staticClass:"panel mb-3 bg-white"},[n("p",{staticClass:"font-bold text-xl bg-gray-300 py-2 px-3 mb-0"},[t._v("Categories")]),t._v(" "),t._l(t.categories,(function(e){return n("a",{key:e,staticClass:"\n            block\n            border-t\n            py-1\n            px-4\n            hover:bg-purple-200\n            text-blue-500\n            cursor-pointer\n            select-none\n          ",class:{"bg-green-100":t.selected_categories.includes(e),"hover:bg-red-100":t.selected_categories.includes(e)},on:{click:function(n){return t.toggle_category(e)}}},[t._v(t._s(e))])}))],2),t._v(" "),n("div",{staticClass:"panel mb-3"},[n("p",{staticClass:"font-bold text-xl bg-gray-300 py-2 px-3 mb-0"},[t._v("Tags")]),t._v(" "),n("div",{staticClass:"panel-block bg-gray-100 border p-2"},t._l(t.tags,(function(e,r){return n("span",{key:r,staticClass:"\n              inline-flex\n              py-2\n              leading-4\n              mr-2\n              mb-2\n              content-center\n              bg-gray-200\n              justify-center\n              h-8\n              px-3\n              text-sm text-blue-500\n              hover:bg-purple-200\n              cursor-pointer\n              select-none\n            ",class:{"bg-green-100":t.selected_tags.includes(e),"hover:bg-red-100":t.selected_tags.includes(e)},on:{click:function(n){return t.toggle_tag(e)}}},[n("div",[t._v(t._s(e))])])})),0)])])])])}),[],!1,null,null,null);e.default=component.exports}}]);