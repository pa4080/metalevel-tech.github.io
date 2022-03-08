// https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area

(function() {
    const rgb = [255, 0, 0];

    const node = document.querySelector('header.page-header');

    // Randomly change to showcase updates
    setInterval(setContrast, 1000);
    
    function setContrast() {
      // Randomly update colours
      rgb[0] = Math.round(Math.random() * 255);
      rgb[1] = Math.round(Math.random() * 255);
      rgb[2] = Math.round(Math.random() * 255);
    
      // http://www.w3.org/TR/AERT#color-contrast
      const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                          (parseInt(rgb[1]) * 587) +
                          (parseInt(rgb[2]) * 114)) / 1000);
      const textColour = (brightness > 125) ? 'black' : 'white';
      const backgroundColour = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
      $(node).css('color', textColour); 
      $(node).css('background-color', backgroundColour);
    }
})();