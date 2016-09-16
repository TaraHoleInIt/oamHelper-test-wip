angular.module( "oamHelperApp" ).service( "attr2Service", function( ) {
    var unpackAttribute = function( attr2 ) {
        var result = { }

        result.tileOffset = ( attr2 & 0x03FF );
        result.priority = ( attr2 >> 10 ) & 0x03;
        result.paletteIndex = ( attr2 >> 12 ) & 0x0F;

        return result;
    }

    return {
        getAttributes: unpackAttribute
    }
} );
