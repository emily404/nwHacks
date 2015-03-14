var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
var foodRef = fbRef.child('food');
function setValue(section){
	if (section == 1){
		foodRef.set({
			0:{
				name: 'Broccoli',
				type:'vegetable',
				price: '$1.23/lb'
			},
			1:{
				name: 'Eggplant',
				type:'vegetable',
				price: '$1.29/lb'
			},
			2:{
				name: 'Apple',
				type:'fruit',
				price: '$1.45/lb'
			},	
			3:{
				name: 'Banana',
				type:'fruit',
				price: '$1.01/lb'
			},
			4:{
				name: 'Orange',
				type:'fruit',
				price: '$1.00/lb'
			}
		});
	}
	else if (section == 2){
		
	}
}

function retrieveSeasonalData(){
	foodRef.on("value", function(snapshot) {
		$("#fruits").html("");
		$("#vegetables").html("");
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().type == "fruit")
				$("#fruits").append("<tr><td>"+childSnapshot.val().name+"</td><td>"+childSnapshot.val().price+"</td></tr>");
			else
				$("#vegetables").append("<tr><td>"+childSnapshot.val().name+"</td><td>"+childSnapshot.val().price+"</td></tr>");
		})		
	});
}