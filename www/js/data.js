var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
var foodRef = fbRef.child('food');
var recRef = fbRef.child('recipe');
var marketRef = fbRef.child('market');

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
	else if (section == 3){
		
		marketRef.set({
			0:{
				hour: 'Sat 9AM - 2PM, May 10 - Oct 18',
				neighbourhood: 'Trout Lake',
				location: 'Lakewood Dr and 13th Ave., Vancouver'
			},		
			1:{
				hour: 'Sun 10AM - 2PM, May 11 - Oct 19',
				neighbourhood: 'Kitslano',
				location: 'West 10th Ave., Vancouver'
			},
			2:{
				hour: 'Sat 10AM - 2PM, Jun 14 - Oct 11',
				neighbourhood: 'Kerrisdale',
				location: '5500 East Blvd., Vancouver'
			},
			3:{
				hour: 'Sat 9AM-5PM, Jun 14 - Oct 11',
				neighbourhood: 'West End',
				location: 'Comox St., Vancouver'
			}
		});
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