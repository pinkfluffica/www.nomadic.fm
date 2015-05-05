$(window).on('load', function(){

	var android = navigator.userAgent.match(/android/i);
	var ipad = navigator.userAgent.match(/ipad/i);
	var safari = navigator.userAgent.match(/safari/i);


	var outer = $(".videoplayer");
	
	var video = $("<video/>");
//	video.attr("poster", "images/video-phoneguy-tall.jpg");
	video.attr("preload", "auto");

	outer.find(".video_box").prepend(video);

	if(android || safari){
		$("<source/>")
			.attr("src", "http://videocdn.nomadic.fm/mp4/nomadic-intro_360.mp4")
			.attr("type", "video/mp4")
			.appendTo(video);
	}
	else{
		$("<source/>")
			.attr("src", "http://videocdn.nomadic.fm/hls/nomadic-intro_hls.m3u8")
			.attr("type", "application/vnd.apple.mpegURL")
			.appendTo(video);
		$("<source/>")
			.attr("src", "http://videocdn.nomadic.fm/mp4/nomadic-intro_720.mp4")
			.attr("type", "video/mp4")
			.appendTo(video);
		$("<source/>")
			.attr("src", "http://videocdn.nomadic.fm/webm/nomadic-intro_720.webm")
			.attr("type", "video/webm")
			.appendTo(video);
	}
	
	MediaElement($("video").get(0), {
		mode:'auto',
		videoHeight:$(".video_box").height(),
		videoWidth:$(".video_box").width(),
		success:setupVideo,
	});

	function setupVideo(vid, domElement){
		$vid = $(vid);
		
//		function setupVideoLoadHandler(){
//			window.timestatus = 0;
//			$vid.on("timeupdate.videoload", function(){
//				if(timestatus == 0){
//					window.timestatus = 1;
//				}
//				else if(timestatus == 1){
//					outer.addClass("loaded");
//					outer.find(".video_box").css("background-image", "none");
//					$vid.off("timeupdate.videoload");
//					vid.pause();
//					setTimeout(function(){vid.play()}, 1000);
//				}
//			});
//		}
//		setupVideoLoadHandler();
	
		// resize video for flash fallback
		if($(".me-plugin").length){
			$(window).on('resize', function(){
				var m = $(".me-plugin");
				vid.setVideoSize(m.width(), m.height());
			});
		}
		
		$vid.on("play.video", function(){
			outer.addClass("playing");
			window.videoPlaying = true;
		});

		$vid.on("pause.video", function(){
			outer.removeClass("playing");
			window.videoPlaying = false;
		});

		$vid.on("ended.video", function(){
			outer.removeClass("playing").removeClass('initialized').removeClass('loaded').addClass('uninitialized');
			vid.setCurrentTime(0);
			outer.find(".video_box").css("background-image", "");
			window.videoPlaying = false;
			
//			setupVideoLoadHandler();
		});


		outer.find(".video_play").on("click.video", function(e){
			outer.addClass('initialized').removeClass('uninitialized');
			outer.addClass("loaded");
			outer.find(".video_box").css("background-image", "none");
			setTimeout(function(){vid.play()}, 200);
			return false;
		});
	
		outer.find(".bar_btn.play").on("click.video", function(e){
			vid.play();
			this.blur();
			return false;
		});

		outer.find(".bar_btn.pause").on("click.video", function(e){
			vid.pause();
			this.blur();
			return false;
		});

		outer.find(".bar_btn.fullscreen").on("click.video", function(e){
			e.preventDefault();
			this.blur();
			if (vid.webkitEnterFullscreen) {
				vid.webkitEnterFullscreen();
			}
			else{
				if(document.fullScreenElement || document.mozFullScreenElement){
					// cancel full screen
					if (document.cancelFullscreen) {
						document.cancelFullscreen();
					}
					else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen(); // Firefox
					}
				}
				else{
					if (vid.requestFullscreen) {
						vid.requestFullscreen();
					}
					else if (vid.mozRequestFullScreen) {
						vid.mozRequestFullScreen(); // Firefox
					}
				}
			}
		});

		outer.find(".video_progress").on("click.video", function(e){
			e.preventDefault();
			var xpos = e.pageX;
			var xoff = $(this).offset().left;
			var xmax = $(this).width();
			var pos = (xpos - xoff) / xmax;
			vid.setCurrentTime(vid.duration * pos);
		});

		$vid.on("timeupdate.video", function(){
			var pos = vid.currentTime / vid.duration;
			var handle = outer.find(".handle");
			var xrange = handle.parent().width() - handle.width();
			handle.css("left", xrange * pos + "px");
		})
	}
	
});
