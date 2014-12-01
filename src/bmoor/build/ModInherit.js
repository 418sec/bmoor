bMoor.inject(['bmoor.build.Compiler',function( compiler ){
	'use strict';

	compiler.addModule( 90, 'bmoor.build.ModInherit', 
		['-id','-namespace','-name', '-mount','-parent',
		function( id, namespace, name, mount, parent ){
			var construct,
				proto;

			if ( parent ){
				construct = this;

				if ( bMoor.isFunction(parent) ){
					// we assume this a constructor function
					proto = parent.prototype;
				}else{
					// we want to inherit directly from this object
					proto = parent;
				}

				this.prototype = bMoor.object.mask( proto );
				this.prototype.constructor = construct;

				delete this.$generic;
			}
			
			this.prototype.$static = this;	
			this.prototype.__class = id;
			this.prototype.__namespace = namespace;
			this.prototype.__name = name;
			this.prototype.__mount = mount;
		}]
	);
}]);