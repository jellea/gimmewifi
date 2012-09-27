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
    if typeof google is 'undefined' or typeof google.maps is 'undefined'
      setTimeout this.render, 500
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

    $('#welcome').slideUp(500)

    this.map = new google.maps.Map $('#map_canvas')[0], my_options

  createPointer: (pointer) ->
    if typeof google is 'undefined' or typeof google.maps is 'undefined'
      setTimeout this.render, 500
      return

    console.log pointer

    temp_pointer =
      marker: new google.maps.Marker(
        position: new google.maps.LatLng(pointer.venue.location.lat, pointer.venue.location.lng)
        map: this.map
        animation: google.maps.Animation.DROP
      );

      show: ->
        console.log 'Showing'
      hide: ->
        console.log 'Hiding'
      destroy: ->
        console.log 'Destroying'
      showInfo: ->
        console.log 'Showing info panel'
      hideInfo: ->
        console.log 'Hiding info panel'

    this.pointers.push temp_pointer
