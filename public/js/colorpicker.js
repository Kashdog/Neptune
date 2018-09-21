$('#text').val($('#colorinput').val());

$('#text').change(function() {
  $('#colorinput').val($('#text').val());
  $('.color-picker').attr('data-value', $('#text').val());
  $('.paper-button').css('background-color', $('#text').val());
});

$('#colorinput').change(function() {
  $('#text').val($(this).val().toUpperCase());
  $('.color-picker').attr('data-value', $(this).val().toUpperCase());
});

$('.paper-button').click(function(e) {
  let cx = e.clientX;
  console.log(cx);
  let transform = cx - 155;
  console.log(transform);
  $('.translate').css("transform", 'translate(' + transform + 'px)');
  $('.color-picker').css("transform", "scale(1,1)");
  // $(this).addClass('opened');
});

$('#close').click(function() {
  $('.color-picker').css('transform', 'scale(0,0)');
});

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

$('.color-picker > div:not(#close)').click(function() {
  let bg = $(this).css('background-color');
  $('.paper-button').css('background-color', bg);
  $('#colorinput').val(rgb2hex($(this).css('background-color')));
  $('#colorinput').change();
});