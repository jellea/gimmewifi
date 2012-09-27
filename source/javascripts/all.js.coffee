#= require "jquery-1.8.2.min"
#= require "inflection"
#= require "marelle"
#= require "agility"

#= require "maps"
#= require "foursquare"

locationSucces = (location) ->
  maps.init location
  foursquare.tipSearch location

locationError = (error) ->
  alert 'Could not fetch location.'
  console.log error

navigator.geolocation.getCurrentPosition locationSucces, locationError
