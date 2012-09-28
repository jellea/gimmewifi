#FSQUARE_CLIENT_ID = "CRGUR0KPVTPW1TQF0NFIPJA5ZDYOSREMHOWPI3UBKDFIWZIR" # Production
#FSQUARE_CLIENT_ID = "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR"  # Development localhost...

@venue = $$({},'<li><span data-bind="content"/></li>',{
  'click span': ->
    console.log this
})

@foursquare = {
  clientId:     '21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR',
  clientSecret: 'DEYFJL2KBMXUUVC0WFAAAAMLDDNX2Q351N2ORRTCQI4B1MJ0',
  tipSearch:    (geo) ->
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

  addSpot:      ->
    $('#venuelist').show()
    ll = maps.latitude + ',' + maps.longitude
    params = {
      ll            : ll,
      client_id     : foursquare.clientId,
      client_secret : foursquare.clientSecret,
      v             : '20120927',
      limit         : 10
    }
    $.Marelle.Venue.search(params).done (M) ->
      foursquare.venues = []
      for venueitem in M.response.venues
        newItem = $$ venue, {content:venueitem, name: venueitem.name}
        $$.document.append newItem, '#venuelist ul'
}
$ ->
  $('body').prepend('<div id="addspot">+</div>')
  $('#addspot').click(foursquare.addSpot)
