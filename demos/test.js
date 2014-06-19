(function(){
	// Basic declaration	
	console.log( 'foo.Hello' );
	bMoor.make( 'foo.Hello', {
		properties : {
			hello : function(){ 
				console.log('world'); 
			}
		}
	}).then(function( obj ){
		( new obj() ).hello();
	});

	// Define a singleton
	console.log( 'foo.Woot' );
	bMoor.make( 'foo.Woot',{
		singleton : {
			woot : [ 'the singleton' ]
		},
		construct : function( woot ){
			this.woot = woot || 'hello world';
		},
		properties : {
			hello : function(){
				this.say( this.woot );
			},
			say : function( something ){ 
				console.log( something ); 
			}
		}
	});

	foo.Woot.$woot.hello();
	foo.Woot.$woot.say( 'hello to my little friend' );

	console.log( 'foo.Dog' );
	// Define a factory
	bMoor.make('foo.Dog', {
		factory : {
			make : function( words ){
				var obj = this;

				return new obj( words );
			}
		},
		construct : function( whatToSay ){
			this.something = whatToSay;
		},
		properties : {
			speak : function(){ 
				console.log( this.something ); 
			}
		}
	});

	obj = foo.Dog.$make('woof');
	obj.speak();

	// Injecion comes standard

	// Decoration
	// wrappers around your functionality... they stack up
	console.log( 'foo.Decorator1' );
	bMoor.make( 'foo.Decorator1', ['bmoor.core.Decorator', function( Decorator ){
		return {
			parent : Decorator,
			properties : {
				speak : function(){
					this.$wrapped();
					console.log('now roll over');
				}
			}
		};
	}]);

	console.log( 'foo.Pheonix' );
	bMoor.make( 'foo.Pheonix', ['foo.Dog', function( Dog ){
		return {
			parent : Dog,
			construct : function( whatToSay ){
				Dog.call( this, whatToSay );
			},
			decorators : [
				'foo.Decorator1'
			]
		};
	}]).then(function( obj ){
		( new obj('woofie woof') ).speak();
	});

	// Requiring
	console.log( 'foo.Body' );
	bMoor.make( 'foo.Body', [
		'>jQuery>//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
		function( $ ){
			return {
				construct : function(){
					$('body').append('<span>Was Loaded and Created</span>');
				}
			};
		}
	]).then(function( obj ){
		new obj();
	});

	// Mixins
	// Save you copy and pasting similar functionality between none inheriting classes
	console.log( 'foo.Mixin1' );
	bMoor.define( 'foo.Mixin1', {
		saySomething : function(){
			console.log('wow');
		}
	});

	console.log( 'foo.Hello2' );
	bMoor.make( 'foo.Hello2', 
		['foo.Hello','foo.Mixin1', function( Hello, Mixin1 ){
			console.log( Mixin1 );
			return {
				parent : Hello,
				construct : function( helloWith ){
					Hello.call( this, helloWith );
				},
				mixins : [
					Mixin1
				]
			};
		}]
	).then(function( obj ){
		var t = new obj();
		console.log( t );
		t.hello();
		t.saySomething();
	});;

	// Easily recreate with mock objects
	console.log( 'foo.Mixin2' );
	bMoor.define( 'foo.Mixin2', {
		saySomething : function( words ){
			console.log( 'this is completely fake' );
		}
	});

	console.log( 'mocking...' );
	console.log( foo.Woot );
	console.log( foo.Mixin2 );
	bMoor.mock('foo.Hello2', {
		'foo.Hello' : foo.Woot,
		'foo.Mixin1' : foo.Mixin2
	}).then(function( fake ){
		var t = new fake('this is now fake');

		console.log( fake );
		console.log( t );
		
		t.hello();
		t.saySomething( 'like this' );
	});
}());