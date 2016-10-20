$(document).ready(function () {
  $("#text-area").keyup(function() {
    var maxLength = 140;
    var textLength = $( this ).val().length;
    var length = maxLength-textLength;
    if (length < 0) {
      $(".form .counter").addClass('negative-num');
    }
    if (length > 0) {
      $(".form .counter").removeClass('negative-num');
    }
    $(".counter").text(length);
  })
});
