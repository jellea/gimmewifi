#FSQUARE_CLIENT_ID = "CRGUR0KPVTPW1TQF0NFIPJA5ZDYOSREMHOWPI3UBKDFIWZIR" # Production
#FSQUARE_CLIENT_ID = "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR"  # Development localhost...

@foursquare = {
  clientId : "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR",
  tipSearch: {}
}

@foursquare.tipSearch = (ll) ->
  console.log(ll)
  $.Marelle foursquare.clientId, (evt, M) ->
    $.marelle.Venue.search params, (response) ->
      console.log(response)
