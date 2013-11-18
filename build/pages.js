!function(){define("bz.pages/app",["angular","bz","ng-table","bz-nested-model"],function(a){"use strict";return a.module("bz.pages",["bz","ngTable","bzNestedModel"])}),define("bz.pages/factories/page",["bz.pages/app"],function(a){"use strict";a.factory("bz.pages.factories.page",["$resource","bzConfig",function(a,b){var c=a(b.resource("/pages/:id"),{id:"@id"},{hit:{method:"PUT",params:{action:"view"}}});return c}])}),define("bz.pages/directives/page",["bz.pages/app","bz.pages/factories/page"],function(a){"use strict";a.directive("bzPagesPage",["bz.pages.factories.page","$parse","$log",function(a,b){return{restrict:"AE",scope:!0,link:function(c,d,e){var f=b(e.bzPagesPage)(c);c.loading=!0,a.get(f,function(a){c.loading=!1,c.page=a},function(){c.loading=!1})}}}])}),define("bz.pages/factories/category",["bz.pages/app"],function(a){"use strict";a.factory("bz.pages.factories.category",["bzNestedResource","bzConfig",function(a,b){var c=a(b.resource("/pages/categories/:id"),{id:"@id"},{});return c}])}),define("bz.pages/directives/category",["bz.pages/app","bz.pages/factories/category"],function(a){"use strict";a.directive("bzPagesCategory",["bz.pages.factories.page","bz.pages.factories.category","$parse","$log",function(a,b,c){return{restrict:"AE",scope:!0,link:function(d,e,f){var g=c(f.bzPagesCategory)(d);b.get(g,function(a){d.category=a}),d.loading=!0,a.get(g,function(a){d.loading=!1,d.pages=a},function(){d.loading=!1})}}}])}),define("bz.pages/controllers/page",["bz.pages/app","bz.pages/factories/page"],function(a){"use strict";a.controller("bz.pages.controllers.page",["$scope","page","bz.pages.factories.page",function(a,b,c){b&&(a.page=b,c.hit({id:b.id}))}])}),define("bz.pages/controllers/category",["bz.pages/app","bz.pages/factories/category"],function(a){"use strict";a.controller("bz.pages.controllers.category",["$scope","bz.pages.factories.page","ngTableParams","$log","category","pageParams",function(a,b,c,d,e,f){d.debug('Controller "bz.pages.controllers.category": ',e,f),a.category=e,f=f||{},a.tableParams=new c({page:1,total:0,count:10,sorting:{name:"asc"}},{counts:[],getData:function(c,e){a.loading=!0;var g=e.url();g.category_id=a.category.id,g=angular.extend(g,f),b.get(g,function(b){d.debug("Load pages: ",b),a.loading=!1,a.tableParams.total(b.pager.total),c.resolve(a.pages=b.data)})}})}])}),define("bz.pages",["bz.pages/app","bz.pages/directives/page","bz.pages/directives/category","bz.pages/controllers/page","bz.pages/controllers/category"],function(a){return a})}();
//# sourceMappingURL=pages.map