var flapperModule = angular.module('flapperNews', ['ui.router']);

var postsFactory = flapperModule.factory('posts', [function() {
	var o = {
		posts: [{ title: 'My sample post',
				link : 'Link to my sample post',
				upvotes: 100,
				comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				]
			}
		]
	};
	return o;
}]);

flapperModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	
	$stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

    $stateProvider.state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  	$urlRouterProvider.otherwise('home');
}]);

//angularjs dependency injection
//we are injecting $scope into the controller
flapperModule.controller('MainCtrl', ['$scope','posts', function($scope, posts) {
	$scope.posts = posts.posts;
	$scope.title = '',
	$scope.link = '';
 	$scope.addPost = function() {
 	  // if ($scope.title === '' || $scope.link === '') {
 	  if ($scope.title === '') {
 	   return; 
 	  }
	  $scope.posts.push({
	  	title: $scope.title,
	  	link: $scope.link,  
	  	upvotes: 0,
	  	comments: []
	  });
	  $scope.title = '',
	  $scope.link = '';
	};
	$scope.incrementUpvotes = function(post) {
		post.upvotes += 1;
	};

}]);

flapperModule.controller('PostsCtrl', ['$scope','$stateParams','posts', function($scope, $stateParams, posts) {
	$scope.post = posts.posts[$stateParams.id];
	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};
}]);
