const thContainer = document.querySelector('.gallery');
const modalContainer = document.querySelector('.lightbox .lightbox-content');

// fetch data
const url = '/data/photos.json';
fetch(url)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  window.onload = gallery(data); //initialize gallery on page load
});

//gallery function
function gallery(data) {
  var keys = Object.keys(data);

  keys.forEach(function(key) {
    const item = data[key];

    //create thumbnail image container div
    const div = document.createElement('div');
    div.setAttribute('class','item');
    div.setAttribute('data-id',item.id);
    div.setAttribute('data-full-image',item.urls.full);

    //create thumbnail image
    const img = document.createElement('img');
    img.setAttribute('src',item.urls.small);
    if (item.description != null) {
      img.setAttribute('alt',item.description);
    } else {
      img.setAttribute('alt','gallery image');
    }

    div.appendChild(img);
    thContainer.appendChild(div);
    
    div.addEventListener('click',modal);
  });
}

//close lightbox on escape keypress
document.onkeydown = function(e) {
  e = e || window.event;
  if (e.keyCode == 27) {
    if ( document.querySelector('.lightbox').classList.contains('active') ) {
      closeLightbox(e);
    }
  }
};

//lightbox function
function modal() {
  modalContainer.innerHTML = '';
  const lgImg = this.getAttribute('data-full-image');

  const modalImg = document.createElement('img');
  modalImg.setAttribute('src',lgImg);

  modalContainer.appendChild(modalImg);
  document.querySelector('.lightbox').classList.add('active');

  const close = document.querySelector('.lightbox .close-button');
  close.addEventListener('click', closeLightbox);

  if ( document.querySelector('.lightbox').classList.contains('active') ) {
    setTimeout(function(){ 
      document.body.addEventListener('click',closeLightbox);
    }, 100);
  }
}

//lightbox close function
function closeLightbox(e) {
  e.preventDefault();
  document.body.removeEventListener('click',closeLightbox);
  document.querySelector('.lightbox').classList.remove('active');
  modalContainer.innerHTML = '';
}