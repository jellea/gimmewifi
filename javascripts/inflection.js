/*
Copyright (c) 2010 Ryan Schuft (ryan.schuft@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/*
  This code is based in part on the work done in Ruby to support
  infection as part of Ruby on Rails in the ActiveSupport's Inflector
  and Inflections classes.  It was initally ported to Javascript by
  Ryan Schuft (ryan.schuft@gmail.com) in 2007.

  The code is available at http://code.google.com/p/inflection-js/

  The basic usage is:
    1. Include this script on your web page.
    2. Call functions on any String object in Javascript

  Currently implemented functions:

    String.pluralize(plural) == String
      renders a singular English language noun into its plural form
      normal results can be overridden by passing in an alternative

    String.singularize(singular) == String
      renders a plural English language noun into its singular form
      normal results can be overridden by passing in an alterative

    String.camelize(lowFirstLetter) == String
      renders a lower case underscored word into camel case
      the first letter of the result will be upper case unless you pass true
      also translates "/" into "::" (underscore does the opposite)

    String.underscore() == String
      renders a camel cased word into words seperated by underscores
      also translates "::" back into "/" (camelize does the opposite)

    String.humanize(lowFirstLetter) == String
      renders a lower case and underscored word into human readable form
      defaults to making the first letter capitalized unless you pass true

    String.capitalize() == String
      renders all characters to lower case and then makes the first upper

    String.dasherize() == String
      renders all underbars and spaces as dashes

    String.titleize() == String
      renders words into title casing (as for book titles)

    String.demodulize() == String
      renders class names that are prepended by modules into just the class

    String.tableize() == String
      renders camel cased singular words into their underscored plural form

    String.classify() == String
      renders an underscored plural word into its camel cased singular form

    String.foreign_key(dropIdUbar) == String
      renders a class name (camel cased singular noun) into a foreign key
      defaults to seperating the class from the id with an underbar unless
      you pass true

    String.ordinalize() == String
      renders all numbers found in the string into their sequence like "22nd"
*/
/*
  This sets up a container for some constants in its own namespace
  We use the window (if available) to enable dynamic loading of this script
  Window won't necessarily exist for non-browsers.
*/
window&&!window.InflectionJS&&(window.InflectionJS=null),InflectionJS={uncountable_words:["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"],plural_rules:[[new RegExp("(m)an$","gi"),"$1en"],[new RegExp("(pe)rson$","gi"),"$1ople"],[new RegExp("(child)$","gi"),"$1ren"],[new RegExp("^(ox)$","gi"),"$1en"],[new RegExp("(ax|test)is$","gi"),"$1es"],[new RegExp("(octop|vir)us$","gi"),"$1i"],[new RegExp("(alias|status)$","gi"),"$1es"],[new RegExp("(bu)s$","gi"),"$1ses"],[new RegExp("(buffal|tomat|potat)o$","gi"),"$1oes"],[new RegExp("([ti])um$","gi"),"$1a"],[new RegExp("sis$","gi"),"ses"],[new RegExp("(?:([^f])fe|([lr])f)$","gi"),"$1$2ves"],[new RegExp("(hive)$","gi"),"$1s"],[new RegExp("([^aeiouy]|qu)y$","gi"),"$1ies"],[new RegExp("(x|ch|ss|sh)$","gi"),"$1es"],[new RegExp("(matr|vert|ind)ix|ex$","gi"),"$1ices"],[new RegExp("([m|l])ouse$","gi"),"$1ice"],[new RegExp("(quiz)$","gi"),"$1zes"],[new RegExp("s$","gi"),"s"],[new RegExp("$","gi"),"s"]],singular_rules:[[new RegExp("(m)en$","gi"),"$1an"],[new RegExp("(pe)ople$","gi"),"$1rson"],[new RegExp("(child)ren$","gi"),"$1"],[new RegExp("([ti])a$","gi"),"$1um"],[new RegExp("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"),"$1$2sis"],[new RegExp("(hive)s$","gi"),"$1"],[new RegExp("(tive)s$","gi"),"$1"],[new RegExp("(curve)s$","gi"),"$1"],[new RegExp("([lr])ves$","gi"),"$1f"],[new RegExp("([^fo])ves$","gi"),"$1fe"],[new RegExp("([^aeiouy]|qu)ies$","gi"),"$1y"],[new RegExp("(s)eries$","gi"),"$1eries"],[new RegExp("(m)ovies$","gi"),"$1ovie"],[new RegExp("(x|ch|ss|sh)es$","gi"),"$1"],[new RegExp("([m|l])ice$","gi"),"$1ouse"],[new RegExp("(bus)es$","gi"),"$1"],[new RegExp("(o)es$","gi"),"$1"],[new RegExp("(shoe)s$","gi"),"$1"],[new RegExp("(cris|ax|test)es$","gi"),"$1is"],[new RegExp("(octop|vir)i$","gi"),"$1us"],[new RegExp("(alias|status)es$","gi"),"$1"],[new RegExp("^(ox)en","gi"),"$1"],[new RegExp("(vert|ind)ices$","gi"),"$1ex"],[new RegExp("(matr)ices$","gi"),"$1ix"],[new RegExp("(quiz)zes$","gi"),"$1"],[new RegExp("s$","gi"),""]],non_titlecased_words:["and","or","nor","a","an","the","so","but","to","of","at","by","from","into","on","onto","off","out","in","over","with","for"],id_suffix:new RegExp("(_ids|_id)$","g"),underbar:new RegExp("_","g"),space_or_underbar:new RegExp("[ _]","g"),uppercase:new RegExp("([A-Z])","g"),underbar_prefix:new RegExp("^_"),apply_rules:function(e,t,n,r){if(r)e=r;else{var i=n.indexOf(e.toLowerCase())>-1;if(!i)for(var s=0;s<t.length;s++)if(e.match(t[s][0])){e=e.replace(t[s][0],t[s][1]);break}}return e}},Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t,n){t||(t=-1);var r=-1;for(var i=t;i<this.length;i++)if(this[i]===e||n&&n(this[i],e)){r=i;break}return r}),String.prototype._uncountable_words||(String.prototype._uncountable_words=InflectionJS.uncountable_words),String.prototype._plural_rules||(String.prototype._plural_rules=InflectionJS.plural_rules),String.prototype._singular_rules||(String.prototype._singular_rules=InflectionJS.singular_rules),String.prototype._non_titlecased_words||(String.prototype._non_titlecased_words=InflectionJS.non_titlecased_words),String.prototype.pluralize||(String.prototype.pluralize=function(e){return InflectionJS.apply_rules(this,this._plural_rules,this._uncountable_words,e)}),String.prototype.singularize||(String.prototype.singularize=function(e){return InflectionJS.apply_rules(this,this._singular_rules,this._uncountable_words,e)}),String.prototype.camelize||(String.prototype.camelize=function(e){var t=this.toLowerCase(),n=t.split("/");for(var r=0;r<n.length;r++){var i=n[r].split("_"),s=e&&r+1===n.length?1:0;for(var o=s;o<i.length;o++)i[o]=i[o].charAt(0).toUpperCase()+i[o].substring(1);n[r]=i.join("")}return t=n.join("::"),t}),String.prototype.underscore||(String.prototype.underscore=function(){var e=this,t=e.split("::");for(var n=0;n<t.length;n++)t[n]=t[n].replace(InflectionJS.uppercase,"_$1"),t[n]=t[n].replace(InflectionJS.underbar_prefix,"");return e=t.join("/").toLowerCase(),e}),String.prototype.humanize||(String.prototype.humanize=function(e){var t=this.toLowerCase();return t=t.replace(InflectionJS.id_suffix,""),t=t.replace(InflectionJS.underbar," "),e||(t=t.capitalize()),t}),String.prototype.capitalize||(String.prototype.capitalize=function(){var e=this.toLowerCase();return e=e.substring(0,1).toUpperCase()+e.substring(1),e}),String.prototype.dasherize||(String.prototype.dasherize=function(){var e=this;return e=e.replace(InflectionJS.space_or_underbar,"-"),e}),String.prototype.titleize||(String.prototype.titleize=function(){var e=this.toLowerCase();e=e.replace(InflectionJS.underbar," ");var t=e.split(" ");for(var n=0;n<t.length;n++){var r=t[n].split("-");for(var i=0;i<r.length;i++)this._non_titlecased_words.indexOf(r[i].toLowerCase())<0&&(r[i]=r[i].capitalize());t[n]=r.join("-")}return e=t.join(" "),e=e.substring(0,1).toUpperCase()+e.substring(1),e}),String.prototype.demodulize||(String.prototype.demodulize=function(){var e=this,t=e.split("::");return e=t[t.length-1],e}),String.prototype.tableize||(String.prototype.tableize=function(){var e=this;return e=e.underscore().pluralize(),e}),String.prototype.classify||(String.prototype.classify=function(){var e=this;return e=e.camelize().singularize(),e}),String.prototype.foreign_key||(String.prototype.foreign_key=function(e){var t=this;return t=t.demodulize().underscore()+(e?"":"_")+"id",t}),String.prototype.ordinalize||(String.prototype.ordinalize=function(){var e=this,t=e.split(" ");for(var n=0;n<t.length;n++){var r=parseInt(t[n]);if(r===NaN){var i=t[n].substring(t[n].length-2),s=t[n].substring(t[n].length-1),o="th";i!="11"&&i!="12"&&i!="13"&&(s==="1"?o="st":s==="2"?o="nd":s==="3"&&(o="rd")),t[n]+=o}}return e=t.join(" "),e});