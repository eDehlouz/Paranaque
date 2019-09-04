$(".navbar-toggler-icon").click(function(e) {
  $('html, body').css({
    overflow: 'hidden',
    height: '100%'
  });
});


$('.btn-nov').click(function() {
  $("html, body").animate({
    scrollTop: $('#nov').offset().top
  }, 1000);
});




$('.btn-santos').click(function() {
  $('.btn-nia').removeClass("active");
  $('.btn-santos').addClass("active");
  $('#carouselSantos').css('display', 'block');
  $('#carouselNIA').css('display', 'none');

});

$('.btn-nia').click(function() {
  $('.btn-santos').removeClass("active");
  $('.btn-nia').addClass("active");
  $('#carouselSantos').css('display', 'none');
  $('#carouselNIA').css('display', 'block');

});

$(document).ready(function() {
  $('body').append('<div id="toTop" class="btn btn-info btn-toTop"><img src="img/arrow-up.png" class="toTop-icon"></div>');
  $(window).scroll(function() {
    if ($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
  $('#toTop').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});

/* To be added for the result if captcha is vaidated*/
$('.btn-submit').click(function() {
  var resultDiv = $('.result').css('display');
  if (resultDiv == "none") {
    $('.result').toggle('slow');
    $('#nov-gallery').toggle('fast');
    window.location.href = '#result';
    resultDiv = $('.result').css('display');
  }
});
