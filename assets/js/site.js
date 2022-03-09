/**
 * Add Sticky Class to div#vav
 * 
 *  References:
 *  - https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
 *  - http://www.html5rocks.com/en/tutorials/speed/animations/
 *  - https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 */
(function() {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const node = document.getElementById('nav');
    const stickyClass = 'sticky';

    function doSomething(scrollPos, nodeTopPos) {
        const isNodeSticky = node.className.split(' ').indexOf(stickyClass) !== -1;

        if (scrollPos > nodeTopPos && !isNodeSticky) {
            node.classList.add(stickyClass);
        }

        if (scrollPos <= nodeTopPos && isNodeSticky) {
            node.classList.remove(stickyClass);
        }
    }

    document.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                let nodeTopPosition = window.getComputedStyle(node).top;

                doSomething(lastKnownScrollPosition, nodeTopPosition);
                ticking = false;
            });

            ticking = true;
        }
    });
})();