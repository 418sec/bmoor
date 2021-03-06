
const {expect} = require('chai');

describe('bmoor.lib.config', function() {

	const {Config} = require('./config.js');

	describe('basic functionality', function(){
		it('should allow defaults to be set', function(){
			const config = new Config({
				foo: 'bar',
				hello: {
					world: 'value'
				}
			});

			expect(config.get('foo'))
			.to.equal('bar');

			expect(config.get('hello'))
			.to.deep.equal({
				world: 'value'
			});

			expect(config.get('hello.world'))
			.to.equal('value');
		});

		it('should allow the overriding of default values', function(){
			const config = new Config({
				foo: 'eins',
				hello: {
					world: 'zwei'
				}
			});

			config.set('foo', 1);
			config.set('hello.world', 2);

			expect(config.get('foo'))
			.to.equal(1);

			expect(config.get('hello'))
			.to.deep.equal({
				world: 2
			});

			expect(config.get('hello.world'))
			.to.equal(2);
		});
	});

	describe('::assign', function(){
		it('should allow bulk overriding', function(){
			const config = new Config({
				foo: 'eins',
				hello: {
					world: 'zwei'
				}
			});

			config.assign({
				foo: 1,
				hello: {
					world: 2
				}
			});

			expect(config.get('foo'))
			.to.equal(1);

			expect(config.get('hello'))
			.to.deep.equal({
				world: 2
			});

			expect(config.get('hello.world'))
			.to.equal(2);
		});

		it('should work with arrays', function(){
			const config = new Config({
				arr: [0],
				hello: [{
					world: 1 
				}]
			});

			config.assign({
				arr: [1, 2],
				hello: [{
					world: 2
				}]
			});

			expect(config.get('arr'))
			.to.deep.equal([1, 2]);

			expect(config.get('hello'))
			.to.deep.equal([{
				world: 2
			}]);

			expect(config.get('hello.0.world'))
			.to.equal(2);
		});
	});

	describe('::on', function(){
		it('should trigger off a ::set', function(done){
			let called = false;

			const config = new Config({
				foo: 'bar'
			});

			config.on('foo', function(){
				called = true;
			});

			config.set('foo', 'eins')
			.then(() => {
				expect(called)
				.to.equal(true);

				expect(config.get('foo'))
				.to.equal('eins');

				done();
			});
		});

		it('should trigger off an ::assign', function(done){
			let called = false;

			const config = new Config({
				foo: 'bar'
			});

			config.on('foo', function(){
				called = true;
			});

			config.assign({
				foo: 'eins'
			}).then(() => {
				expect(called)
				.to.equal(true);

				expect(config.get('foo'))
				.to.equal('eins');

				done();
			});
		});
	});
});
