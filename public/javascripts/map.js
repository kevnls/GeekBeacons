function detectBrowser()
{
	var useragent = navigator.userAgent;
	var mapdiv = document.getElementById("map");
		
	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 )
	{
		mapdiv.style.width = '100%';
		mapdiv.style.height = '100%';
	}
	else
	{
		mapdiv.style.width = '600px';
		mapdiv.style.height = '500px';
	}
}

function initialize() 
{
	var markersArray = [];
	detectBrowser();
	var myLocation;
	var myOptions = {zoom: 14, mapTypeId: google.maps.MapTypeId.ROADMAP};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	if(navigator.geolocation)
	{
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position)
		{		
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			
			myLocation = new google.maps.LatLng(latitude,longitude);
			map.setCenter(myLocation);
			
			//add me
			var marker = new google.maps.Marker({
				position: myLocation,
				title:"Hello World!"
			});
		
			// To add the marker to the map, call setMap();
			marker.setMap(map);
			
			//add other geeks
			google.maps.event.addListener(map, 'click', function(event) 
			{
				addMarker(event.latLng);
			});
		
			//format the lat/long for the url (replace dot)
			var formatLat = latitude.toString().replace(".", ":");
			var formatLong = longitude.toString().replace(".", ":");
			var url = "/beacons/near/" + formatLat + "," + formatLong + ".json?callback=?";
			
			//get the array of nearby geeks
			$.get(url,
			function(data)
			{
				$.each(data, function(index, item)
				{
					addMarker(new google.maps.LatLng(item.beacon.latitude, item.beacon.longitude));
				});
			});
				
			function addMarker(location)
			{
				var image = '/images/geek.gif';
				marker = new google.maps.Marker({
					position: location,
					icon: image,
					title:"Hello World!",
					animation: google.maps.Animation.BOUNCE,
					map: map
				});
				markersArray.push(marker);
			}
		},
		function() 
		{
			handleNoGeolocation(browserSupportFlag);
		});
	}
	else
	{
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
}

function createBeacon(authenticityToken)
{
	navigator.geolocation.getCurrentPosition(function(position)
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		
		var url = "/beacons.json";
		
		$.post(url,
		{
			"beacon[latitude]": latitude,
			"beacon[longitude]": longitude,
			authenticity_token: authenticityToken
		});
		
		alert('Geek Beacon Added!');
		initialize();
	});
}

function handleNoGeolocation(errorFlag)
{
	if (errorFlag == true)
	{
		alert("Geolocation service failed.");
	}
	else
	{
		alert("Your browser doesn't support geolocation.");
	}
}