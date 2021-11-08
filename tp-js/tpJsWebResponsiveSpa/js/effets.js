
function startEffets() {
  	
  $(window).scroll(function () {
	//NB: :visible n'est géré que par jquery
	$('div:visible').addClass('visibleAfterScroll');
  });
  
}

