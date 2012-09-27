(function() {

  this.maps = {
    latitude: 0,
    longitude: 0,
    pointers: [],
    init: function(location) {
      var js;
      this.latitude = location.coords.latitude;
      this.longitude = location.coords.longitude;
      js = document.createElement('script');
      js.setAttribute('type', 'text/javascript');
      js.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=maps.render');
      return document.body.appendChild(js);
    },
    render: function() {
      var my_options;
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        setTimeout(this.render, 500);
        return;
      }
      console.log(maps);
      my_options = {
        zoom: 11,
        center: new google.maps.LatLng(maps.latitude, maps.longitude),
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            stylers: [
              {
                saturation: -100
              }, {
                gamma: 1.50
              }
            ]
          }
        ]
      };
      $('#welcome').slideUp(500);
      return this.map = new google.maps.Map($('#map_canvas')[0], my_options);
    },
    createPointer: function(pointer) {
      var temp_pointer;
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        setTimeout(this.render, 500);
        return;
      }
      console.log(pointer);
      temp_pointer = {
        marker: new google.maps.Marker({
          position: new google.maps.LatLng(pointer.venue.location.lat, pointer.venue.location.lng),
          map: this.map,
          animation: google.maps.Animation.DROP
        }),
        show: function() {
          return console.log('Showing');
        },
        hide: function() {
          return console.log('Hiding');
        },
        destroy: function() {
          return console.log('Destroying');
        },
        showInfo: function() {
          return console.log('Showing info panel');
        },
        hideInfo: function() {
          return console.log('Hiding info panel');
        }
      };
      return this.pointers.push(temp_pointer);
    }
  };

}).call(this);
