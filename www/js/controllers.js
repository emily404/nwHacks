angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	retrieveSeasonalData();	
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapController', function($scope, $ionicLoading) {
		
		var myLatlng = new google.maps.LatLng(49.2827, -123.1207);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
        
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(49.3, -123.1207),
            title:"Hello World!"
        });

        marker.setMap(map);
        
        $scope.map = map;

 
});
