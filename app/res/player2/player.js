
var SWFPlayer = function(_parent_id,_player_id,_width,_height, _src_url){
    var parent_id = _parent_id;
    var player_id = _player_id;
    var width = _width;
    var height = _height;
    var src_url = _src_url;

    function createPlayer(src, autoPlay){

        var parameters = {
            src: src,
            autoPlay: "false",
            verbose: "true",
            controlBarAutoHide: "true",
            controlBarPosition: "bottom",
            poster: "/res/player/poster.png",
            plugin_hls: "/res/player/plugin/HLSDynamicPlugin.swf"
        };

        if (autoPlay) parameters.autoPlay = "true";
        
        var wmodeValue = "transparent";
        var wmodeOptions = ["direct", "opaque", "transparent", "window"];

        //alert(swfobject.getFlashPlayerVersion);
        // Embed the player SWF:
        swfobject.embedSWF(
            "/res/player/plugin/StrobeMediaPlayback.swf"
            , player_id
            , width
            , height
            , "11"
            , "/res/player/plugin/expressInstall.swf"
            , parameters
            , {
                allowFullScreen: "true",
                wmode: wmodeValue
            }
            , {
                name: player_id
            }
        );
    };

    createPlayer(src_url);

    this.reload = function(src, autoPlay){
        $("#parent_id").html("");
        createPlayer(src, autoPlay);
    };

};

function flashChecker() {
    var hasFlash = 0;
    var flashVersion = 0;
    if(document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if(swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if(navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if(swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for(var i = 0; i < words.length; ++i) {
                    if(isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {
        f: hasFlash,
        v: flashVersion
    };
}