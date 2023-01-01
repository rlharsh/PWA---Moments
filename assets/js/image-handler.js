const fileInput = document.getElementById('file-image-upload');

fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];

    var reader = new FileReader();
    reader.onload = function() {
        document.getElementById('user-image').style.backgroundImage=`url(${this.result})`;
        //document.getElementById("user-iamge").style.backgroundImage = this.result;
    };
    reader.readAsDataURL(selectedFile);
}


