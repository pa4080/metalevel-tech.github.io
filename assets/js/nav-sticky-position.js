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
    let stickyRemove = false;

    let nodeTopPosition = Number(window.getComputedStyle(node).top.replace('px', ''));
    let nodeHeight = Number(window.getComputedStyle(node).height.replace('px', ''));
    
    window.addEventListener('resize', function(e) {
        nodeTopPosition = Number(window.getComputedStyle(node).top.replace('px', ''));
        nodeHeight = Number(window.getComputedStyle(node).height.replace('px', ''));
    });

    function doSomething(scrollPos, nodeTopPos) {
        const isNodeSticky = node.className.split(' ').indexOf(stickyClass) !== -1;

        // console.log(scrollPos, nodeTopPos, isNodeSticky);
        
        if (scrollPos > nodeTopPos && !isNodeSticky) {
            node.classList.add(stickyClass);
            stickyRemove = false;
        } else if (scrollPos > (nodeTopPos + nodeHeight + 6) && !stickyRemove) {
            stickyRemove = true;
        } else if (scrollPos <= (nodeTopPos + nodeHeight) && isNodeSticky && stickyRemove) {
            node.classList.remove(stickyClass);
        }
    }

    document.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(lastKnownScrollPosition, nodeTopPosition);
                ticking = false;
            });

            ticking = true;
        }
    });
})();