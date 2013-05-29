;(function( $, global, undefined ){

bMoor.constructor.define({
	name : 'List',
	namespace : ['bmoor','snap'],
	parent : ['bmoor','snap','Node'],
	properties: {
		_element : function( element ){
			this.__Node._element.call( this, element );
			this.childTag = element.hasAttribute('snap-child') ? element.getAttribute('snap-child') : this.childTag;
		},
		_makeContent : function(){
			if ( this.data ){
				for( var i = 0, c = this.data.length; i < c; i++ ){
					this.append( this.data[i] );
				}
			}
		},
		_makeChild : function( data, tag, attributes, asString ){
			if ( asString ){
				var attrs = '';
					
				for( var attr in attributes ){
					attrs += attr+'="'+attributes[attr]+'" ';
				}
					
				if ( this.prepared ){
					return '<'+tag+' class="'+this.childClass+'" '+attrs+'>'
						+ bMoor.template.getDefaultTemplator().run( this.prepared, data )
						+ '</'+tag+'>';
				}else return '<'+tag+' class="'+this.childClass+'" '+attrs+'>'+ '</'+tag+'>';
			}else{
				if ( this.prepared ){
					var 
						template = bMoor.template.getDefaultTemplator().run( this.prepared, data ),
						element = document.createElement( tag );
						
					element.innerHTML = template;
					element.className = this.childClass;
					
					for( var attr in attributes ){
						element.setAttribute( attr, attributes[attr] );
					}
					
					bmoor.templating.Builder.setContext( element, data );
					
					return element;
				}else{
					return document.createElement( tag );
				}
			}
		},
		append : function( data ){
			var el = this._makeChild(data,this.childTag);
			this.$.append( el );
			
			return el;
		},
		prepend : function( data ){
			var el = this._makeChild(data,this.childTag);
			this.$.prepend( el );
			
			return el;
		},
		childTag : 'li',
		childClass : 'snap-li',
		baseClass  : 'snap-list'
	}
});

}( jQuery, this ));