!function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/boy.html","<div><h2>Hi, Sunny</h2><p>How, are you?</p>this is boy only view</div>")}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/boys.html","<div>this is boys list view form folder</div>")}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/contact-us.html",'<div><h2>Contact Us</h2><form><div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><label for="exampleInputPassword1">Password</label><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><div class="form-group"><label for="exampleInputFile">File input</label><input type="file" id="exampleInputFile"> Example block-level help text here.</div><div class="checkbox"><label><input type="checkbox"> Check me out</label></div><button type="submit" class="btn btn-default">Submit</button></form></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/footer.html",'<div class="collapse footer-collapse"><div class="col-lg-3 col-md-3"><ul><li ng-repeat="item in items"><% item.label %></li></ul></div><div class="col-lg-3 col-md-3"><div><form ng-show="isFormShow"><div class="form-group"><label for="text1">Name</label><input type="text" class="form-control" id="text1"></div><div class="form-group"><label for="text1">City</label><input type="text" class="form-control" id="text2"></div><div class="form-group"><label for="text1">Country</label><input type="text" class="form-control" id="text3"></div></form><button ng-click="toggle()">Send</button></div></div><div class="col-lg-3 col-md-3">Hi this is footer.</div><div class="col-lg-3 col-md-3">Hi this is footer.</div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/home.html",'<div><h2>Welcome Users and Developers</h2><h3>Current Topics</h3><div ng-if="isLoading" class="progress-bar-wrapper"><div class="progress-bar">Loading...</div></div><!--\n	<input type="search" ng-model="q" placeholder="filter friends..." aria-label="filter friends"/>\n	<div><button ng-click="">Click</button></div>\n	<div><button ng-click="">Click</button></div>\n		--><div><!--\n	<div class=\'animate-repeat\' ng-repeat="project in items | filter:q as results"> \n		<h4><% project.title %></h4>\n	</div>\n	--><!--<div class=\'animate-repeat\' ng-repeat="project in info.projects"> --><div class="animate-repeat" ng-repeat="project in info.projects | filter:q as results"><div><h4><% project.title %></h4><p>Status:<span style="color:green"><% project.info %></span></p><p>Writer: <span style="color:teal"><% project.writer %></span></p></div></div></div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/mobile-menu.html",'<button class="menu-toggle menu-toggle--rot" ng-click="toggle()" ng-class="{&quot;is-active&quot;:menuDisplay===false}"><span>toggle menu</span></button><div ng-class="{&quot;mobile-menu-display&quot;:menuDisplay===true,&quot;mobile-menu-nodisplay&quot;:menuDisplay===false}"><nav2><navitem2 label="Services ours" page="#/services"></navitem2><navitem2 label="About us" page="#"></navitem2><navitem2 label="Contact Us" page="#"></navitem2><navitem2 label="Help" page="#"></navitem2><navitem2 label="Training" page="#"></navitem2><navitem2 label="Projects" page="#/projects"></navitem2></nav2></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/nav1.html",'<div class="navbar navbar-default"><ul class="nav navbar-nav"><li ng-repeat="item in items" ng-class="{active:item.selected}"><a href="<% item.page %>" ng-click="select(item)"><% item.label %></a></li></ul><div ng-transclude></div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/nav2.html",'<nav class="navbar navbar-default"><div class="container"><!-- Brand and toggle get grouped for better mobile display --><div class="navbar-header"><button type="button" ng-click="toggle()" class="navbar-toggle collapsed"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">TaPatch</a></div><!-- nav bar header --><!-- Collect the nav links, forms, and other content for toggling --><div class="collapse navbar-collapse" ng-hide="isCollapse"><ul class="nav navbar-nav"><li ng-repeat="item in items" ng-class="{active:item.selected}"><a href="<% item.page %>" ng-click="select(item)"><% item.label %></a></li></ul><div ng-transclude></div></div><!-- /.navbar-collapse --></div><!-- /.container-fluid --></nav>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/navbar.html",'<div class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">TaPatch</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li ng-repeat="item in items" ng-class="{active1:item.selected}"><a href="<% item.page %>" ng-click="select(item)"><% item.label %></a></li></ul></div></div><div ng-transclude></div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/projects.html",'<div class="panel panel-success"><div class="panel-heading">Projects</div><div class="panel-body"><div ng-if="isLoading" class="progress-bar-wrapper"><div class="progress-bar">Loading...</div></div><ul><li ng-repeat="project in projects"><% project.name %></li></ul></div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/services.html",'<div class="panel panel-success"><div class="panel-heading">Services</div><div class="panel-body"><ul><li ng-repeat="service in services"><% service.name %></li></ul></div></div>')}])}(),function(a){try{a=angular.module("Templates1")}catch(e){a=angular.module("Templates1",[])}a.run(["$templateCache",function(a){a.put("/partials/welcome.html",'<div><h2><% message %></h2><div><img class="img-desktop" src="images/coffee.jpg" alt="Start your day with a cup of coffee!"><p>This is my suggestion to our visitors that first take a sip of sweet coffee and then let\'s talk rest of the things.</p></div></div>')}])}();