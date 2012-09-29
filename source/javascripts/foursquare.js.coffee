#FSQUARE_CLIENT_ID = "CRGUR0KPVTPW1TQF0NFIPJA5ZDYOSREMHOWPI3UBKDFIWZIR" # Production
#FSQUARE_CLIENT_ID = "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR"  # Development localhost...

@venue = $$({},'<li><span data-bind="name"/></li>',{
  'click span': ->
    console.log this
})

@foursquare =
  clientId            : '21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR'
  clientSecret        : 'DEYFJL2KBMXUUVC0WFAAAAMLDDNX2Q351N2ORRTCQI4B1MJ0'

  tipSearch: (geo) ->
    ll = geo.coords.latitude + ',' + geo.coords.longitude
    $.Marelle(foursquare.clientId).done (M) ->
      params = {
        ll            : ll,
        client_id     : foursquare.clientId,
        client_secret : foursquare.clientSecret,
        v             : '20120927',
        query         : 'wifi'
      }
      $.Marelle.Tip.search(params).done (M) ->
        for tip in M.response.tips
          maps.createPointer tip

  addSpot: ->
    $('#venuelist').slideDown(500)
    foursquare.addSpotRotate(45)

    ll = maps.latitude + ',' + maps.longitude
    params = {
      ll              : ll,
      client_id       : foursquare.clientId,
      client_secret   : foursquare.clientSecret,
      v               : '20120927',
      limit           : 10
    }
    $.Marelle.Venue.search(params).done (M) ->
      foursquare.venues = []
      for venueitem in M.response.venues
        newItem = $$ venue, {name: venueitem.name}
        $$.document.append newItem, '#venuelist ul'

  addSpotClose: ->
    $('#venuelist').slideUp(500)
    foursquare.addSpotRotate(-45)

  addSpotRotate: (degree) ->
    $('#addspot').animate(
      '-webkit-transform': 'rotate(' + degree + 'deg)'
      '-moz-transform': 'rotate(' + degree + 'deg)'
      '-ms-transform': 'rotate(' + degree + 'deg)'
      '-o-transform': 'rotate(' + degree + 'deg)'
      'transform': 'rotate(' + degree + 'deg)'
      'zoom': 1
    , 500)


$ ->
  $('body').prepend('<div id="addspot">+</div>')
  $('#addspot').toggle(foursquare.addSpot, foursquare.addSpotClose)
