/**
 * Created by saurabh on 12/14/14.
 */
app.initBonsaiApp = function () {
    $('input:text, input:password, input[type=email]').button()
        .addClass('ui-textfield')
        .off('mouseenter').off('mousedown').off('keydown');

    $("button").button(
        {
            icons: {
                primary: "ui-icon-circle-triangle-e"
            },
            text: false
        }
    );
    $('#butgetsurl').click(function (event) {
       var orul = $('#originalurl').val();
        if(orul) {
            $.post('/encode', {orgurl: orul}, function (data) {
                if (data.length <= 0) {
                    console.log('Could not encode url');
                    return;
                }
                console.log(data);
                $('#surld').html(data.burl);
            });
        }
    });
    $('#getorgurl').click(function (event) {
        var surl = $('#surl').val();
        if(surl) {
            $.post('/decode', {surl: surl}, function (data) {
                if (data.length <= 0) {
                    console.log('Could not decode url');
                    return;
                }
                console.log(data);
                $('#orgurld').html(data.surl);
            });
        }
    });
}