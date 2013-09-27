;(function( $, global, undefined ){

//TODO : move where this is used over to bMoor.module.Wait
bMoor.constructor.singleton({
	name : 'WaitFor',
	namespace : ['bmoor','lib'],
	construct: function(){},
	require : {
		references : { 'bMoor.module.Resource' : ['bmoor','lib','Resource'] }
	},
	module : 'Wait',
	properties : {
		_waiting : 0,
		_done : [],
		_return : function(){
			var func;

			this._waiting--;
			
			while ( this._done.length && this._waiting < 1 ){
				func = this._done.pop();
				func();
			}
		},
		done : function( cb ){
			if ( this._waiting < 1 ){
				cb();
			}else{
				this._done.unshift( cb );
			}
		},
		require : function( requirements, cb ){
			var dis = this;
			
			this._waiting++;
			
			bMoor.autoload.require( requirements, function(){ if ( cb ){ cb(); } dis._return(); } );
			
			return this;
		},
		loadScript : function( src, cb ){
			var dis = this;
			
			this._waiting++;
			
			bMoor.module.Resource.loadScript( src, function(){ if ( cb ){ cb(); } dis._return(); } );
			
			return this;
		},
		loadStyle : function( src, cb ){
			var dis = this;
			
			this.waiting++;
			
			bMoor.module.Resource.loadStyle( src, function(){ if ( cb ){ cb(); } dis._return(); } );
			
			return this;
		},
		loadImage : function( src, cb ){
			var dis = this;
			
			this._waiting++;
			
			bMoor.module.Resource.loadImage( src, function(){ if ( cb ){ cb(); } dis._return(); } );
			
			return this;
		},
		loadTemplate : function( id, src, cb ){
			var dis = this;
			
			this._waiting++;
			
			bMoor.module.Resource.loadTemplate( id, src, function(){ if ( cb ){ cb(); } dis._return(); } );
			
			return this;
		}
	}
});

}( jQuery, this ));