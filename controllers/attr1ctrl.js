angular.module( "oamHelperApp" ).service( "attr1Service", function( ) {
    var unpackAttribute = function( attr1 ) {
        var result = { };

        result.x = attr1 & 0x01FF;
        result.scaleParam = ( attr1 >> 8 ) & 0x1F;
        result.horizontalFlip = ( attr1 & 0x800 ) ? true : false;
        result.verticalFlip = ( attr1 & 0x1000 ) ? true : false;
        result.size = ( attr1 >> 14 ) & 0x03;

        return result;
    }

    return {
        getAttributes: unpackAttribute
    }
} );
