(function() {

  this.venue = $$({}, '<li><span data-bind="name"/></li>', {
    'click span': function() {
      return console.log(this);
    }
  });

  this.foursquare = {
    clientId: '21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR',
    clientSecret: 'DEYFJL2KBMXUUVC0WFAAAAMLDDNX2Q351N2ORRTCQI4B1MJ0',
    tipSearch: function(geo) {
      var ll;
      ll = geo.coords.latitude + ',' + geo.coords.longitude;
      return $.Marelle(foursquare.clientId).done(function(M) {
        var params;
        params = {
          ll: ll,
          client_id: foursquare.clientId,
          client_secret: foursquare.clientSecret,
          v: '20120927',
          query: 'wifi'
        };
        return $.Marelle.Tip.search(params).done(function(M) {
          var tip, _i, _len, _ref, _results;
          _ref = M.response.tips;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tip = _ref[_i];
            _results.push(maps.createPointer(tip));
          }
          return _results;
        });
      });
    },
    addSpot: function() {
      var ll, params;
      $('#venuelist').slideDown(500);
      foursquare.addSpotRotate(45);
      ll = maps.latitude + ',' + maps.longitude;
      params = {
        ll: ll,
        client_id: foursquare.clientId,
        client_secret: foursquare.clientSecret,
        v: '20120927',
        limit: 10
      };
      return $.Marelle.Venue.search(params).done(function(M) {
        var newItem, venueitem, _i, _len, _ref, _results;
        foursquare.venues = [];
        _ref = M.response.venues;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          venueitem = _ref[_i];
          newItem = $$(venue, {
            name: venueitem.name
          });
          _results.push($$.document.append(newItem, '#venuelist ul'));
        }
        return _results;
      });
    },
    addSpotClose: function() {
      $('#venuelist').slideUp(500);
      return foursquare.addSpotRotate(-45);
    },
    addSpotRotate: function(degree) {
      return $('#addspot').animate({
        '-webkit-transform': 'rotate(' + degree + 'deg)',
        '-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
        'zoom': 1
      }, 500);
    }
  };

  $(function() {
    $('body').prepend('<div id="addspot">+</div>');
    return $('#addspot').toggle(foursquare.addSpot, foursquare.addSpotClose);
  });

}).call(this);
