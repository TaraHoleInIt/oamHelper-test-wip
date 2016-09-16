angular.module( "oamHelperApp" ).service( "attr0Service", function( ) {
    var unpackAttribute = function( attr0 ) {

        var result = { }

        result.y = attr0 & 0xFF;                                 // Sprite y coordinate
        result.rotScale = ( attr0 & 0x100 ? true : false );      // Rotate/scale flag
        result.doubleSize = ( attr0 & 0x200 ? true : false );    // When rotate/scale bit is set 
        result.disabled = ( attr0 & 0x200 ? true : false );      // When rotate/scale bit is unset

        result.mode = function( ) {                          
            var mode = ( attr0 >> 10 ) & 0x03;
            var modeStrings = [
                "Normal",
                "Semi transparent",
                "OBJ window",
                "Prohibited"
            ];

            return modeStrings[ mode ];
        }( );

        result.mosaic = ( attr0 & 0x1000 ? true : false );   // OBJ Mosaic effect
        result.colors = ( attr0 & 0x2000 ? 256 : 16 );       // If set this sprite uses a single 256 color palette instead of 16 16 color ones
            
        result.shape = function( ) {
            var shape = ( attr0 >> 14 ) & 0x03;
            var shapeStrings = [
                "Square",
                "Wide",
                "Tall",
                "Prohibited"
            ];

            return shapeStrings[ shape ];
        }( );

        return result;
    }

    return {
        getAttributes: unpackAttribute
    }
} );
