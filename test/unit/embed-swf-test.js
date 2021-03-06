import $ from 'jquery';
import EmbedSwf from 'utils/embedswf';

describe('Embed SWF Util', function() {

    it('embeds a swf', function() {
        var parent = $('<div id="container"></div>')[0];
        var id = 'player_swf_0';
        var swf = createEmbedder(parent, id);

        assert.equal(swf.nodeName, 'OBJECT', 'object node is returned');
        assert.equal(swf.id, id, 'object id matches specified id');
        assert.strictEqual(swf.parentNode, parent, 'object is added to specified parent');

        // To Flash interface
        assert.equal(typeof swf.triggerFlash, 'function', 'object.triggerFlash is a function');

        // commenting out this test as it triggers console.error message when flash is not present
        var chainableSwf = swf.triggerFlash('setup', {}).triggerFlash('stop');
        assert.strictEqual(chainableSwf, swf, 'triggerFlash method is chainable');

        // From Flash interface (Backbone.Events)
        assert.equal(typeof swf.trigger, 'function', 'object.trigger is a function');
        assert.equal(typeof swf.on, 'function', 'object.on is a function');
        assert.equal(typeof swf.off, 'function', 'object.off is a function');
        assert.equal(typeof swf.once, 'function', 'object.once is a function');

        EmbedSwf.remove(swf);
    });

    it('remove a swf', function() {
        var parent = $('<div id="container"></div>')[0];
        var id = 'player_swf_1';
        var swf = createEmbedder(parent, id);
        EmbedSwf.remove(swf);

        assert.equal(swf.parentNode, null, 'object is removed from parent');
    });

    function createEmbedder(parent, id) {
        // document.append(parent);

        return EmbedSwf.embed('../bin-debug/jwplayer.flash.swf', parent, id);
    }
});
