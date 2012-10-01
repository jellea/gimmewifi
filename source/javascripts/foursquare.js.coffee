@venue = $$({},'<li><span data-bind="name"/></li>',{
  'click span': ->
    console.log this.model.get('content')
    $('#venuelist').hide();
    $$.document.append $$(venuemodal, {content : this.model.get 'content' })
})

@venuemodaltmp =
  """
  <div id="venuemodal" class="overlay">
    <form action="#">
      <input placeholder="Wifi name">
      <input placeholder="Password">
      <button>
    </form>
  </div>
  """

@venuemodal = $$({},venuemodaltmp,{
  'click button': ->
    console.log this.model.get('content')

})

@foursquare = 
  clientId:     'CRGUR0KPVTPW1TQF0NFIPJA5ZDYOSREMHOWPI3UBKDFIWZIR',
  clientSecret: 'QO4FNRG3SB52DWDZQ4XMWVAW1UXAGG40OXJUY50Q3MXG5WZE',
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
    $.Marelle(foursquare.clientId).done (M) ->
      authpromise = M.authenticateVisitor()
      authsuccess = (visitor) ->
        $.Marelle.Venue.search(params).done (M) ->
        foursquare.venues = []
        for venueitem in M.response.venues
          newItem = $$ venue, {content:venueitem, name: venueitem.name}
          $$.document.append newItem, '#venuelist ul'
          $('#venuelist').show()
      authfailure = ->
        Marelle.startSession()
      authpromise.then authsuccess,authfailure

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
  $('#addspot').toggle foursquare.addSpot, foursquare.addSpotClose
