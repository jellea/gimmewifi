(function() {

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
      ll = maps.latitude + ',' + maps.longitude;
      params = {
        ll: ll,
        client_id: foursquare.clientId,
        client_secret: foursquare.clientSecret,
        v: '20120927',
        limit: 10
      };
      return $.Marelle.Venue.search(params).done(function(M) {
        var counter, venue, _i, _len, _ref;
        counter = 0;
        _ref = M.response.venues;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          venue = _ref[_i];
          console.log(venue);
          $('#venuelist ul').append('<li id="' + counter + '">' + venue.name + '</li>');
          counter++;
        }
        return $('#venuelist').show();
      });
    }
  };

  $(function() {
    $('body').prepend('<div id="addspot">+</div>');
    return $('#addspot').click(foursquare.addSpot);
  });

}).call(this);
