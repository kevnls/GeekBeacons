// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
	var map;
	var markersArray = [];
	var coordsArray = [];
        
        function detectBrowser()
        {
            var useragent = navigator.userAgent;
            var mapdiv = document.getElementById("map_canvas");
              
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
	    detectBrowser();
	    var myLocation;
	    var myOptions = {
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	    if(navigator.geolocation)
	    {
			browserSupportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position)
			{
				
				
				//add coordinates to the form elements
				document.forms['mapForm'].elements['lat'].value = position.coords.latitude;
				document.forms['mapForm'].elements['long'].value = position.coords.longitude;
			    
			    myLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
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
			    
			    //get the array of nearby geeks
			    $.getJSON("http://localhost:3000/beacons.json?callback=?",
			      {
			        lat: "45.502286",
			        long: "-122.626509"
			      }, parseBeacons);
			       	
			    function parseBeacons(json)
			    {
			    	$.each(json.beacons, function(i, beacon)
			    	{
			    		//parse json
			    		alert ('object: ' + beacon);
			    	});
			    }
			    		    
			    function addMarker(location)
			    {
				    var image = 'geek.gif';
					marker = new google.maps.Marker({
					    position: location,
					    icon: image,
					    title:"Number of Geeks",
					    animation: google.maps.Animation.BOUNCE,
					    map: map
					});
					markersArray.push(marker);
		    	}
				
			}, function() 
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