#FSQUARE_CLIENT_ID = "CRGUR0KPVTPW1TQF0NFIPJA5ZDYOSREMHOWPI3UBKDFIWZIR" # Production
#FSQUARE_CLIENT_ID = "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR"  # Development localhost...

@foursquare = {
  clientId :    "21123S2W0VJYKFM0KDCDYMCUCQYZYLSHEROTKPNT1JY2SUFR",
  clientSecret: "DEYFJL2KBMXUUVC0WFAAAAMLDDNX2Q351N2ORRTCQI4B1MJ0",
  tipSearch: {}
}

@foursquare.tipSearch = (geo) ->
  ll = geo.coords.latitude + "," + geo.coords.longitude
  $.Marelle(foursquare.clientId).done (M) ->
    console.log "Marelle init"
    params = {
      ll            : ll,
      client_id     : foursquare.clientId,
      client_secret : foursquare.clientSecret,
      v             : "20120927",
      query         : "wifi"
    }
    $.Marelle.Tip.search(params).done (M) ->
      for tip in M.response.tips
        maps.createPointer tip

$ ->
  $("body").add("div").addClass("addspot")
