$.fn.onScrollIntoView = function(everyScroll, sectionRead, options) {

	var $sections = this,
		onScroll, 
		trackTimer, 
		lastSection, 
		opts;

	opts = $.extend({}, {
		readingTime: 1000
	}, options);


	onScroll = function () {
		var currentSection = null,
			sectionIndex = 0,
			currentSectionIndex = 0,
			offsetBottom,
			offsetTop,
			greatestOverlap = 0;


		$sections.each(function () {
			var $this = $(this),
				$window = $(window);

			offsetTop = $this.offset().top;
			offsetBottom = $this.offset().top + $this.outerHeight(true);

			var windowBoxLeft = $window.scrollLeft(),
				windowBoxTop = $window.scrollTop(),
				windowBoxRight = windowBoxLeft + $window.width(),
				windowBoxBottom = windowBoxTop + $window.height();

			var sectionBoxLeft = $this.offset().left,
				sectionBoxTop = $this.offset().top,
				sectionBoxRight = sectionBoxLeft + $this.outerWidth(true),
				sectionBoxBottom = sectionBoxTop + $this.outerHeight(true);

			var xOverlap, yOverlap, overlap;
			xOverlap = Math.max(0, Math.min(windowBoxRight, sectionBoxRight) - Math.max(windowBoxLeft, sectionBoxLeft));
			yOverlap = Math.max(0, Math.min(windowBoxBottom, sectionBoxBottom) - Math.max(windowBoxTop, sectionBoxTop));

			overlap = yOverlap * xOverlap;

			if (overlap > 0 && overlap > greatestOverlap) {
				greatestOverlap = overlap;
				currentSection = $this;
				currentSectionIndex = sectionIndex;
			}
			sectionIndex++;
		});

		if (currentSection) {
			
			if (typeof everyScroll === 'function') {
				everyScroll(currentSection, currentSectionIndex);
			} 

			if (trackTimer) {
				clearTimeout(trackTimer);
			}

			trackTimer = setTimeout(function () {
				if (!lastSection || lastSection[0] !== currentSection[0]) {
					lastSection = currentSection;
					if (typeof sectionRead === 'function') {
						sectionRead(currentSection, currentSectionIndex);
					}
				}
			}, opts.readingTime);
		}
		
	
	};


	$(window).scroll(onScroll);
	
	onScroll();

};