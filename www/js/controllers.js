angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	retrieveSeasonalData();	
	initData($scope);
})


.controller('TwitterCtrl', function($scope) {
	initData($scope);
})

.controller('MarketCtrl', function($scope) {
	initData($scope);
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
            var image = 'img/pegman.png';
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                icon: image
            });
        });
        
        var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
        var resRef = fbRef.child('restaurant');
        var lastwindow = null;
        resRef.on("value", function(snapshot) {
        	
    		snapshot.forEach(function(childSnapshot){
    			var val = childSnapshot.val();
    			var marker = new google.maps.Marker({
    	            position: new google.maps.LatLng(val.lat, val.lon),
    	        });
    			var contentString = 
    			  '<p><b>'+ val.name +'</b></p>'+	
    			  '<p><b>Hours</b>:'+ val.hour +'</p>'
    		      ;
    			var infowindow = new google.maps.InfoWindow({
    			      content: contentString
    			});
    			google.maps.event.addListener(marker, 'click', function() {
    				if(lastwindow != null){
    					lastwindow.close();
    				}
    				infowindow.open(map,marker);
    				lastwindow = infowindow;
    			});
    			marker.setMap(map);
    		})		
    	});
        $scope.map = map;
        initData($scope);
});
