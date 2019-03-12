<template>
<p> landing </p>
</template>

<!-- Not designed using Vue, I'm gonna go in and update it  -->

<!DOCTYPE html>
<html>
<head>

	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

	<title>SafeZone</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

	<link rel="stylesheet" type="text/css" href="landingpage.css">

	<link href="https://fonts.googleapis.com/css?family=Arrimo:400,700|Gudea:400,700" rel="stylesheet">

	<script type="text/javascript" src="googlesearch.js"></script>


	<style>
		html, body {
		  height: 100%;
		}  

		body {
		  background-image: url(https://images.unsplash.com/photo-1484689228555-fd6bc1b28b7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80);
		  background-repeat: no-repeat;
		  background-size: cover;
		}
		
		#buttonGo {
		  display: inline-block;
		}

		.container {
		  margin-top: 150px;
		  text-align: center;
		  padding-bottom: 50px;
		}

		.jumbotron {
		  max-height: 200px;
		  background: rgba(204, 204, 204, 0.35);
		  /*background: none;*/
		  color: black;
		  padding-top: 30px;
		}

		h1 {
		  font-family: 'Arimo', sans-serif;
		  font-weight: bold;
		  font-size: 5em;
		  font-variant: small-caps;
		}

		p {
		  font-family: Gudea;
		  font-size: 1.5em;
		  font-variant: small-caps;
		  font-weight: bold;
		}

		#form-group {
		  text-align: center;
		} 

		#pac-input {
		  text-align: center;
		    background-color: #fff;
		    font-family: Gudea;
		    font-size: 25px;
		    font-weight: 300;
		    margin-left: 12px;
		    padding: 0 11px 0 13px;
		    text-overflow: ellipsis;
		    width: 50%;
		    font-variant: small-caps;
		}
	</style>

	<script>
		function initAutocomplete() {
		var map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: -33.8688, lng: 151.2195},
		  zoom: 13,
		  mapTypeId: 'roadmap'
		});

		// Create the search box and link it to the UI element.
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

		// Bias the SearchBox results towards current map's viewport.
		map.addListener('bounds_changed', function() {
		  searchBox.setBounds(map.getBounds());
		});

		var markers = [];
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', function() {
		  var places = searchBox.getPlaces();

		  if (places.length == 0) {
		    return;
		  }

		  // Clear out the old markers.
		  markers.forEach(function(marker) {
		    marker.setMap(null);
		  });
		  markers = [];

		  // For each place, get the icon, name and location.
		  var bounds = new google.maps.LatLngBounds();
		  places.forEach(function(place) {
		    if (!place.geometry) {
		      console.log("Returned place contains no geometry");
		      return;
		    }
		    var icon = {
		      url: place.icon,
		      size: new google.maps.Size(71, 71),
		      origin: new google.maps.Point(0, 0),
		      anchor: new google.maps.Point(17, 34),
		      scaledSize: new google.maps.Size(25, 25)
		    };

		    // Create a marker for each place.
		    markers.push(new google.maps.Marker({
		      map: map,
		      icon: icon,
		      title: place.name,
		      position: place.geometry.location
		    }));

		    if (place.geometry.viewport) {
		      // Only geocodes have viewport.
		      bounds.union(place.geometry.viewport);
		    } else {
		      bounds.extend(place.geometry.location);
		    }
		  });
		  map.fitBounds(bounds);
		});
		}
	</script>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	  <a class="navbar-brand" href="#">SafeZone</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarNav">
	    <ul class="navbar-nav">
	      <li class="nav-item active">
	        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="#">Map</a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="#">Recent</a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="#">Routes</a>
	      </li>
	    </ul>
	  </div>
	</nav>

	<div class="container">
		<div class="jumbotron">
			<h1>SafeZone</h1>
			<p>Getting you home on your own</p>
		</div>
	</div>

	<div id="form-group" class="form-group">
		<form action="" id=addr-input method="post">
			<input id="pac-input" class="controls" type="text" placeholder="Where are you headed?">
	    	<div id=buttonGo class="col-2 col-md-1">
                <button type="submit" class="btn btn-block btn-lg btn-primary">Go!</button>
            </div>
	    	<div id="map"></div>
 			<!-- <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
			<script>
			    $("#pac-input").on('change', function() {
			          var url = $('#pac-input').val();
			          window.location = url;
			    });
			</script> -->
	    </form>
	</div>
    

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmvziUzhoWOK_EVHOc4wPS3eVhK4V7qTw&libraries=places&callback=initAutocomplete" async defer></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
</body>
</html>

