/**
 * Created by saurabh on 11/30/14.
 */
function initialize() {
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    };
    try {
        app.map = new google.maps.Map($("#dmap").get(0), mapOptions);
    }
    catch(err) {
        console.log(err);
    }
}


app.updateMapLatLong = function (lat, long) {
    if (app.gmarker) {
        app.gmarker.setMap(null);
    }
    var nLatLng = new google.maps.LatLng(lat, long);
    app.map.panTo(nLatLng);
    var marker = new google.maps.Marker({
        position: nLatLng,
        title: "City"
    });
    marker.setMap(app.map);
    app.gmarker = marker;
}

app.initGmapApp = function() {
    $("#lmenu").menu({
        select: function (event, ui) {
            app.activateView(ui.item.text());
        }
    });
    $("#lmenu").css("fontSize", "13px");
    $("select#cstates").selectmenu({
        select: function (event, ui) {
            app.onStateSelect($(this).val());
        }
    });
    $("select").addClass('shadow');
    $("select#ccity").selectmenu({
        select: function (event, ui) {
            app.onCitySelect($(this).val(), $("#cstates option:selected").text());
        }
    });
    $("select#czip").selectmenu({
        select: function (event, ui) {
            var zipcode = $(this).val();
            var zmodel = app.zipList.find(function (model) {
                return model.get('zip') == zipcode;
            });
            if (zmodel) {
                app.updateMapLatLong(zmodel.get('latitude'), zmodel.get('longitude'));
            }
        }
    });

    $("option").css("font-size", "10px");
    $('#fileupload').fileupload({
        url: '/upload',
        dataType: 'json',
        done: function (e, data) {
            app.stateList.fetch();
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    initialize();
}