let cropper = '';
let result = document.querySelector('.result');
let photoCropper = document.querySelector('.photo-cropper');

document.getElementById('file-image-upload').addEventListener('change', e => {
    if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = e => {
            
          if (e.target.result) {
            console.log('what?')
            // create new image
            let img = document.createElement('img');
            img.id = 'image';
            img.src = e.target.result;
            // clean result before
            result.innerHTML = '';
            // append new image
            result.appendChild(img);
            // show save btn and options
            // init cropper
            cropper = new Cropper(img);

            photoCropper.classList.add('show-cropper');
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
})

document.getElementById("save-crop").addEventListener("click", e => {
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({
      width: 1200// input value
    }).toDataURL();

    // show image cropped
    document.getElementById("user-image").style.backgroundImage=`url(${imgSrc})`
    photoCropper.classList.remove('show-cropper');
  });