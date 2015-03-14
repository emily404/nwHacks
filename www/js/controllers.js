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
        
        var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
        var resRef = fbRef.child('restaurant');
        
        resRef.on("value", function(snapshot) {
    		snapshot.forEach(function(childSnapshot){
    			var marker = new google.maps.Marker({
    	            position: new google.maps.LatLng(childSnapshot.val().lat, childSnapshot.val().lon),
    	        });
    			
    			marker.setMap(map);
    		})		
    	});
        
        $scope.map = map;
 
});
