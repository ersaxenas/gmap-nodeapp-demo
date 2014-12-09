/**
 * Created by saurabh on 11/30/14.
 */
$( document ).ready(function() {
  $("select").selectmenu();
  $("option").css("font-size", "10px");
  $('#fileupload').fileupload({
    url: '/upload',
    dataType: 'json',
    done: function (e, data) {
      $.each(data.result.files, function (index, file) {
        $('<p/>').text(file.name).appendTo('#files');
      });
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

});
