function initialize() {

  var styles_array = 
  [
    {
     "elementType": "geometry",
                    "stylers": [{ "hue": "#00e5ff" }]
    },
    {
      "featureType": "poi.school",
      "stylers": [{ "hue": "#ff0000" }]
    },
    {}
  ];

  var mapOptions = {
    center: new google.maps.LatLng(41.5526833,-72.6612454),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 13,
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
       mapOptions);
  map.setOptions({styles: styles_array});
    
  /* spreads out markers that are close */
  var oms = new OverlappingMarkerSpiderfier(map, 
        {
            markersWontHide: true,
            keepSpiderfied: true
        });

  /*a Adds markers for all events in 'events' to the map
   */
  var markers = [];

  function markerize(pos, name, str) {
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        //title: name,
    });
    marker.id = name;

    var infowindow = new google.maps.InfoWindow({
      content: content_str,
    });

    google.maps.event.addListener(marker,'click',function() {
      infowindow.open(map,marker);
    });

    google.maps.event.addListener(map,'click',function() {
      infowindow.close();
    });

    oms.addMarker(marker);

    return marker;
  }

  /* Adds events to map
   */
  for (var i=0;i<events.length;i++) {
    if ((events[i].lat) != 0.0 && (events[i].lon) != 0.0) {

      var content_str = '<div id="content">'+
        '<a href="' + events[i].link + '" id="firstHeading" class="firstHeading">' + events[i].name + '</a>'+
        '<div id="bodyContent">'+
        '<p>' + events[i].desc + '</p>' +
        '</div>'+
        '</div>';

      var pos = new google.maps.LatLng(events[i].lat,events[i].lon);
      var name = events[i].name;

      var m = markerize(pos, name, content_str);

      markers.push(m);
    }
  }


  // Adds a click listener to all the rows in the event table
  $(".event_name").each(function() {
    var m;
    var name = this.id;
    $(this).click(function(){
      for (var i=0;i<markers.length;i++) {
        if (name == markers[i].id) {
          m = markers[i];
        }
      }
      if (m != undefined && m != null) {
        google.maps.event.trigger(m,"click");
      }
    });
  });

  google.maps.event.addListener(map,'center_changed',function() { 

    var sw = new google.maps.LatLng(41.54, -72.69);
    var ne = new google.maps.LatLng(41.565, -72.63);
    var allowedBounds = new google.maps.LatLngBounds(sw, ne);
    if(! allowedBounds.contains(map.getCenter())) {
      var C = map.getCenter();
      var X = C.lng();
      var Y = C.lat();

      var AmaxX = allowedBounds.getNorthEast().lng();
      var AmaxY = allowedBounds.getNorthEast().lat();
      var AminX = allowedBounds.getSouthWest().lng();
      var AminY = allowedBounds.getSouthWest().lat();

      if (X < AminX) {X = AminX;}
      if (X > AmaxX) {X = AmaxX;}
      if (Y < AminY) {Y = AminY;}
      if (Y > AmaxY) {Y = AmaxY;}

      map.setCenter(new google.maps.LatLng(Y,X));
    }
  });

  /* Logic for instant search of events list. It removes events
   * that do not match the search bar from the DOM and keeps
   * them in an array. It adds them back into the DOM when the
   * do match the text in the search bar.
   */
  var removed = [];
  $("#search_input").keyup(function(event) {
    var search_re = new RegExp(this.value,"i");
    $("#events_tb").children("tr").each(function() {
      var event_name = $(this).children("td").first().attr("id");
      if (!search_re.test(event_name)) {
        var obj = Object.create(null);
        for(var i=0;i<events.length;i++) {
          if (event_name === events[i].name) {
            //obj.cat = events[i].cat;
            //obj.link = events[i].link;
            obj.time = $(this).children("td").last().html();
            obj.name = events[i].name;
            //obj.desc = events[i].desc;
            //obj.lat = events[i].lat;
            //obj.lon = events[i].lon;
          }
        } 
        removed.push(obj);
        $(this).remove()
      }
    });
    for (var i=0;i<removed.length;i++) {
      var obj = removed[i];
      if (search_re.test(obj.name)) {
        $("#events_tb").append('<tr><td id="' + obj.name + '" style="width: 50%;" class="event_name"><a href="' + obj.name + '">' + obj.name + '</a></td><td style="width: 50%;">' + obj.time + '</td></tr>');
        removed.splice(i,1);
      }
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
