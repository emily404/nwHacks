var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
var foodRef = fbRef.child('food');
function setValue(){
//	usersRef.set({
//		1:{
//			name: 'Eggplant',
//			type:'vegetable',
//			price: '1.29/lb'
//		},
//		2:{
//			name: 'Broccoli',
//			type:'vegetable',
//			price: '1.23/lb'
//		},
//		3:{
//			name: 'Apple',
//			type:'fruit',
//			price: '1.45/lb'
//		},	
//		4:{
//			name: 'Banana',
//			type:'fruit',
//			price: '1.00/lb'
//		},
//		5:{
//			name: 'Orange',
//			type:'fruit',
//			price: '1.01/lb'
//		}
//	});
}


function retrieveSeasonalData(){
	foodRef.on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot){
			var key = childSnapshot.key();
			alert(childSnapshot.val().type);
		})		
	});
}