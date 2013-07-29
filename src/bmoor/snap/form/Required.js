;(function( $, global, undefined ){

bMoor.constructor.decorator({
	name : 'Required',
	namespace : ['bmoor','snap','form'],
	properties : {
		_isValid : function( value ){
			if ( this._wrapped(value) !== false ){
				// TODO : make this a more universal thing...
				return value !== ''; // has to be something...
			}else return false;
		},
	}
});

}( jQuery, this ));