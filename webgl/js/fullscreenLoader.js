// Find the right method, call on correct element

function openFullscreen(url) {
	if(document.body.requestFullscreen) {
		document.body.requestFullscreen();
	} else if(document.body.mozRequestFullScreen) {
		document.body.mozRequestFullScreen();
	} else if(document.body.webkitRequestFullscreen) {
		document.body.webkitRequestFullscreen();
	} else if(document.body.msRequestFullscreen) {
		document.body.msRequestFullscreen();
	}
	location = url;
}

function closeFullscreen() {
  if(document.body.exitFullscreen) {
    document.body.exitFullscreen();
  } else if(document.body.mozCancelFullScreen) {
    document.body.mozCancelFullScreen();
  } else if(document.body.webkitExitFullscreen) {
    document.body.webkitExitFullscreen();
  }
}