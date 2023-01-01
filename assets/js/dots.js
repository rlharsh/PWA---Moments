document.addEventListener("DOMContentLoaded", function(event) {

    var dot = [];
    for(var i = 0 ; i < 20; i++ ){
      dot.push(new freshDot());
    }
    
  });
  
  
  function freshDot() {
      this.obj = document.createElement("div");
      this.obj.classList.add("box");
      this.obj.style.top = (200 * Math.random()) + 'px';
      this.obj.style.left = (window.innerWidth * Math.random()) + 'px';
      this.size = Math.floor(Math.random() * 17);
      this.obj.style.height =  this.size + 'px';
      this.obj.style.width = this.size + 'px';
      
      document.getElementById("header-container").appendChild(this.obj);
  }
  