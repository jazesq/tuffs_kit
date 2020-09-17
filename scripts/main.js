var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var lrButtons='[data-image-button="button"]';


function setDetails(imageUrl, titleText) {  'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}
function imageFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}
function titleFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}
function setDetailsFromThumb(thumbnail) {  
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}
function addThumbClickHandler(thumb) {  
    'use strict';
    thumb.addEventListener('click', function(event) { 
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}
function getThumbnailsArray() {  
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
      event.preventDefault();
      console.log(event.keyCode);

      if (event.keyCode === ESC_KEY) {
        hideDetails();
      }

    });
}

//---------------------button stuff---------------

function addButtonHandler() {
    "use strict";
    var getCurrTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    var buttons = document.querySelectorAll(lrButtons);
    var bArr = [].slice.call(buttons);
    var lButton = bArr[0];
    var rButton = bArr[1];
    var thumbsArr = getThumbnailsArray();
    var currImage;
    var currTitle;
  
    //left button
    lButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      for (var i = 0; i < thumbsArr.length; i++) {
        if (thumbsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
          if (i == 0) {
            currImage = imageFromThumb(thumbsArr[thumbsArr.length - 1]);
            currTitle = titleFromThumb(thumbsArr[thumbsArr.length - 1]);
            setDetails(currImage, currTitle);
            break;
          } else if (i != 0) {
            currImage = imageFromThumb(thumbsArr[i - 1]);
            currTitle = titleFromThumb(thumbsArr[i - 1]);
            setDetails(currImage, currTitle);
          }
        }
      }
      showDetails();
  
    });
  
    //right button
    rButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      for (var i = 0; i < thumbsArr.length; i++) {
        if (thumbsArr[i].getAttribute("data-image-title") == getCurrTitle.textContent) {
          if (i == thumbsArr.length - 1) {
            currImage = imageFromThumb(thumbsArr[0]);
            currTitle = titleFromThumb(thumbsArr[0]);
            setDetails(currImage, currTitle);
          } else {
            currImage = imageFromThumb(thumbsArr[i + 1]);
            currTitle = titleFromThumb(thumbsArr[i + 1]);
            setDetails(currImage, currTitle);
            break;
          }
        }
      }
      showDetails();
    });
  }


//---------------end of button stuff--------------

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addButtonHandler();

}

initializeEvents();