import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  fn_copy(_string: string) {
    let aux = document.createElement("input");
    aux.setAttribute("value", _string);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    console.log("Copy: ", _string)
  }

  fn_compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  fn_normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

    for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

    return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
        var c = str.charAt( i );
        if( mapping.hasOwnProperty( str.charAt( i ) ) )
          ret.push( mapping[ c ] );
        else
          ret.push( c );
      }
      return ret.join( '' );
    }

  })();
}
