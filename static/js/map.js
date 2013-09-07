function initialize() {

  /*
   * Dynamically adds html options to a select menu with given id
   */
  function add_options(selector, options) {
    for (var i=0;i<options.length;i++) {
      $(selector).append("<option>"+options[i]+"<\\options>");    }
  };

  var mapOptions = {
    center: new google.maps.LatLng(41.5526833,-72.6612454),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 12,
    draggable: false,
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  /* locations
   * Marks locations on the map. The input must be an array of 
   * objects with lat, lon, name attributes
   *
  //console.log(locs);
  //console.log(locs[0]);
  //console.log(locs[0].lat);
  for (var i=0;i<locs.length;i++) {
    //console.log('LATITUDE:'+locs[i].lat);
    //console.log('LONGITUDE:'+locs[i].lon);
    //console.log('NAME:'+locs[i].name);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locs[i].lat, locs[i].lon),
      map: map,
      title:locs[i].name,
    });
    marker.setMap(map);
  }
  */
  
  //adds options to the three search bars
  var loc_names = [];
  for (var i=0;i<locs.length;i++) {
    loc_names.push(locs[i].name);
  }
  add_options('#location_search',loc_names);

  /*
   * Makes search bars pretty using the chosen framework
   */
  $("#event_search").chosen({no_results_text: "Nothing Happening :(", placeholder_text_multiple: "Search for events by name."});

  $("#category_search").chosen({no_results_text: "No categories found :(", placeholder_text_multiple: "Filter by event category"});

  $("#location_search").chosen({no_results_text: ":(", placeholder_text_multiple: "Filter event by location"});

}
google.maps.event.addDomListener(window, 'load', initialize);



//search logic
