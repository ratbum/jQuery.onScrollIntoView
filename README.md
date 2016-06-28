# onScrollIntoView

A pseudo-event handler for detecting which element of a set of elements is the most in view. This was designed to detect when a user had read a section, so there is a callback which will trigger after a second, to indicate that they've stopped to read the section.

## Usage

	$('section').onScrollIntoView(sectionHasAppeared, sectionHasBeenRead, {readingTime: 800})


## What it's doing

Every time the user scrolls, the plugin will check to see which of the set of elements is the most in view. It does this by treating the window as a rectangle and each of the set of other elements as rectangles and does a bit of geometry to see which of the target elements is intersecting with the window's rectangle the most.