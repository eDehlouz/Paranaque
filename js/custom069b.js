var loader = '<div class="margin-tb-3-6"><div class="cssload-container"><div class="cssload-whirlpool"></div></div></div>';
var CaptchaCallback = function() {
    var widgetId1;
    var widgetId2;
    widgetId1 = grecaptcha.render('RecaptchaNov', {'sitekey' : '6LfA7k0UAAAAAAeXsobgnHP0jy7D7jSZqayWMRVB', 'callback' : correctCaptcha_nov});
    // widgetId2 = grecaptcha.render('RecaptchaPlate', {'sitekey' : '6LfA7k0UAAAAAAeXsobgnHP0jy7D7jSZqayWMRVB', 'callback' : correctCaptcha_plate});
};
var correctCaptcha_nov = function(response) {
    $("#nov_hiddenRecaptcha").val(response);
};
var correctCaptcha_plate = function(response) {
    $("#plate_hiddenRecaptcha").val(response);
};

function NovExpired()
{
	$("#nov_hiddenRecaptcha").val('');
}

function PlateExpired()
{
	$("#plate_hiddenRecaptcha").val('');
}

$(document).ready(function(){
	// CaptchaCallback();



	$(".nov-form").on('submit', function(e){
		e.preventDefault();
		var target = $(this).attr('target');
		var captcha = $(target).val();
		if(captcha == "")
		{
			alert('Please check the captcha first.');
		}
		else{
			submit($(this));
      // $('.btn-submit').click(function(){
      //   var resultDiv = $('.result').css('display');
      //   if (resultDiv == "none"){
      //     $('.result').toggle('slow');
      //     window.location.href = '#result';
      //     resultDiv = $('.result').css('display');
      //   }
      // });

		}

	});


	$(".plate-form").on('submit', function(e){
		e.preventDefault();
		if(grecaptcha.getResponse() == "")
		{
			alert('Please check the captcha first.');
		}
		else{
			submit($(this));
		}
	});

	function submit(element)
	{
		var action = element.attr('action');
		var method = element.attr('method');
		var formdata = element.serialize();
		var target = element.attr('data-target');
		var no_record = '<div class="alert alert-warning">No matching record found.</div>';
		$.ajax({
			url 	: 	action,
			type 	: 	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				console.log(result);

				try
				{
					result = JSON.parse(result);
				}
				catch(err)
				{}

				var html = '';
				$(target).html(loader);
				$(target).css('display','block');
				if(result.status == 'error')
				{
					$(target).html(result.message);

				}
				else
				{

					if(result.active == 'active')
					{
						$(target).css('display','none');
						$(result.return).each(function(index, data){

							if(data.type == 'jpg')
							{
								html += _image(data.url);
							}
							else if(data.type == 'mp4')
							{
								html += _mp4(data.url);
							}
						});
						$(target).html(html);
						$(target).unitegallery();
					}
					else
					{
						console.log(result.inactive_message);
						$(target).css('display','block');
						$(target).html(result.inactive_message);
					}

				}

				var reminder = '';
				if(result.reminder != '')
				{
					reminder = '<div class="panel-body">' + result.reminder + '</div>';
				}

				$(".reminder-div").html(reminder);


			},
			error 	: 	function(err)
			{
				console.log(err);

			}
		});
	}

	function _image(url)
	{
		return '<img alt="Preview Image 1" src="'+url+'" alt="img30" >';
	}

	function _mp4(url)
	{
		return '<img alt="Html5 Video"' +
                       'src="libraries/unitegallery-master/source/unitegallery/images/play-button-round.png"' +
                       'data-type="html5video"' +
                       'src="libraries/unitegallery-master/source/unitegallery/images/play-button-round.png"' +
                       'data-videomp4="'+url+'"' +
                       'data-description="">';
	}
});
