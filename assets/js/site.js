/**
 * Create a statistic for pages which have GitHub MarkDown
 * 'contains-task-list' | 'task-list' in Jekill,
 * currently only the first task-list is handled.
 */
(function() {
   
    const list = document.body.querySelectorAll('.task-list li input').length;
    if (list) {
        const passed = document.body.querySelectorAll('.task-list li input[checked]').length;
        const output = `&nbsp;Tasks ${list}; Completed ${passed}, ${((passed / list) * 100).toFixed(0)}%&nbsp;`;
    
        const element = document.createElement('code');
        element.style.position = 'absolute';
        element.style.top = '-4rem';
        element.style.right = '0';
        element.style.border = '1px solid #ccc';
        element.innerHTML = output;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.appendChild(element);
        
        const firstH1 = document.body.querySelector('main#content > h1:first-child');
        firstH1.append(wrapper);
    }
})();