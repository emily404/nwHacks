var fbRef = new Firebase('https://flickering-fire-8922.firebaseio.com/');
var foodRef = fbRef.child('food');
var recRef = fbRef.child('recipe');
var marketRef = fbRef.child('market');
var tweetRef = fbRef.child('tweets');


function setValue(section){
	if (section == 1){
		foodRef.set({
			0:{
				name: 'Broccoli',
				type:'vegetable',
				price:[1.56,1.22,1.39,1.89]
			},
			1:{
				name: 'Eggplant',
				type:'vegetable',
				price: [1.29,1.00,1.59,1.44]
			},
			2:{
				name: 'Apple',
				type:'fruit',
				price: [0.44,0.33,0.31,0.59]
			},	
			3:{
				name: 'Banana',
				type:'fruit',
				price: [0.59,0.44,0.99,0.78]
			},
			4:{
				name: 'Orange',
				type:'fruit',
				price: [0.69,0.49,0.88,0.23]
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
	var fruits_set = {labels:["January", "April", "July","October"]};
	var vegetables_set = {labels:["January", "April", "July","October"]};
	
	var color_setting = ["rgba(244,203,36,","rgba(120,131,242,","rgba(242,138,120,","rgba(13,121,175,"];
	
	foodRef.on("value", function(snapshot) {
		i = 0 ;
		j= 0;
		var fruits_datasets = [];
		var vegetables_datasets = [];
		snapshot.forEach(function(childSnapshot){
			if (childSnapshot.val().type == "fruit"){
				fruits_datasets.push(
					{
						title:childSnapshot.val().name,
						fillColor: color_setting[i] + "0.2)",
						strokeColor:  color_setting[i] +"1)",
						pointColor: color_setting[i] +"1)",
			            pointStrokeColor: "#fff",
			            pointHighlightFill: "#fff",
			            pointHighlightStroke: color_setting[i] +"1)",
			            data: childSnapshot.val().price
					}
				);
				i++;
			}
			else{
				vegetables_datasets.push(
						{
							title: childSnapshot.val().name,
							fillColor: color_setting[j] + "0.2)",
							strokeColor: color_setting[j] + "1)",
							pointColor: color_setting[j] + "1)",
				            pointStrokeColor: "#fff",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: color_setting[j] + "1)",
				            data: childSnapshot.val().price
						}
					);
				j++;
			}
		});	
		fruits_set.datasets = fruits_datasets;
		vegetables_set.datasets = vegetables_datasets;
		
		var ctx = $("#fruits").get(0).getContext("2d");
		var myLineChart = new Chart(ctx).Line(fruits_set,{graphTitleFontSize : 10,graphTitle : "Price Trend of Fruits in Greater Vancouver in 2015",xAxisLabel : "Month",yAxisLabel : "CAD / lb", legend: true, inGraphDataShow: true});
		ctx = $("#vegetables").get(0).getContext("2d");
		myLineChart = new Chart(ctx).Line(vegetables_set,{graphTitleFontSize : 10,graphTitle : "Price Trend of Vegetables in Greater Vancouver in 2015",xAxisLabel : "Month",yAxisLabel : "CAD / lb", legend:true, inGraphDataShow: true});
		
		
	});
}