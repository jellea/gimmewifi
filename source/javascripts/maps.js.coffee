@maps = {}

$ ->
  js = document.createElement 'script'
  js.setAttribute 'type', 'text/javascript'
  js.setAttribute 'src', 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=maps.render'
  document.body.appendChild js

maps.render = ->
  if typeof(google) is 'undefined' or typeof(google.maps) == 'undefined'
    setTimeout showMap, 500
    return

  my_options =
    zoom: 11
    center: new google.maps.LatLng(52.36, 4.90)
    mapTypeControl: false
    streetViewControl: false
    mapTypeId: google.maps.MapTypeId.ROADMAP
    styles: [
      stylers: [
        saturation: -100
      ,
        gamma: 1.50
      ]
    ]

  map = new google.maps.Map document.getElementById('map_canvas'), my_options

  # var marker_image = new google.maps.MarkerImage('/img/marker.png',
  #     new google.maps.Size(39.0, 50.0),
  #     new google.maps.Point(0, 0),
  #     new google.maps.Point(20.0, 50.0)
  # );
  # var marker_shadow = new google.maps.MarkerImage('/img/shadow-marker.png',
  #     new google.maps.Size(65.0, 50.0),
  #     new google.maps.Point(0, 0),
  #     new google.maps.Point(20.0, 50.0)
  # );

  # var marker = new google.maps.Marker(
  # {
  #   position: new google.maps.LatLng(52.165864, 21.130142),
  #   map: map,
  #   title: 'Markus Holland',
  #   icon: marker_image,
  #   shadow: marker_shadow,
  #   animation: google.maps.Animation.DROP
  # });

  # var content =
  # '<p style="margin: 0; padding-right: 20px;">' +
  # ' <b>Markus Holland</b> residential design<br>' +
  # ' Wal Zawadowski 99<br>' +
  # ' 02-986 Warsaw, Poland<br>' +
  # ' <br>' +
  # ' Tel PL: +48 889966154<br>' +
  # ' Tel NL: +31 642732192<br>' +
  # ' E-mail: <span class="email">loading...</span>' +
  # '</p>';

  # var info_window = new google.maps.InfoWindow(
  # {
  #   content: content
  # });

  # setTimeout(function()
  # {
  #   info_window.open(map, marker);
  #   setTimeout(showEmail, 500);
  # }, 1000);

  # google.maps.event.addListener(marker, 'click', function()
  # {
  #   info_window.open(map, marker);
  #   setTimeout(showEmail, 500);
  # });

maps.moveTo = ->
  console.log location