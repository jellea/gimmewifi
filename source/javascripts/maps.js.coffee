@maps =
  latitude: 0
  longitude: 0
  pointers: []

  init: (location) ->
    this.latitude = location.coords.latitude
    this.longitude = location.coords.longitude

    js = document.createElement 'script'
    js.setAttribute 'type', 'text/javascript'
    js.setAttribute 'src', 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=maps.render'
    document.body.appendChild js

  render: ->
    if typeof(google) is 'undefined' or typeof(google.maps) == 'undefined'
      setTimeout showMap, 500
      return

    console.log maps

    my_options =
      zoom: 11
      center: new google.maps.LatLng(maps.latitude, maps.longitude)
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

    this.map = new google.maps.Map $('#map_canvas')[0], my_options

    $('#welcome').slideUp(500)

  createPointer: (pointer) ->
    console.log pointer
