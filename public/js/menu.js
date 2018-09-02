function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function doSwap() {
  $("#nav li").each(function() {
    if ($(this).hasClass("active")) {
      swap($(this));
      sleep(1000).then(() => {
        // Do something after the sleep!
        redirect($(this));
    })
      //redirect($(this));
    }
    else {
      swapBack($(this));
    }
  });
}
doSwap();
function clear(o) {
  $("#nav li").each(function() {
    $(this).removeClass("active");
  });
}
$("#nav li").click(function() {
  clear();
  $(this).addClass("active");
  doSwap();
  rotate('.dial',$(this));
                     
});

function rotate(m,o) {
  var id = "#" + $(o).attr("id");
  var menu = $(m);
  
  menu.removeClass('r0 lr1 lr2 rr1 rr2');
  
  if (id == "#email") {
    menu.addClass("lr2");
  }
  if (id == "#photo") {
    menu.addClass('lr1');
    
  }
  if (id == "#cloud") {
    menu.addClass('r0');
  }
  if (id == "#portfolio") {
    menu.addClass('rr1');
  }
  if (id == "#settings") {
    menu.addClass('rr2');
  }
      
  
}

function swap(o) {
  var id = "#" + $(o).attr("id");
  var cimg = new String;
  var burl = "http://grantcr.com/files/",
      ext = ".png"
  cimg = id + " img";
  console.log($(cimg).attr("src"));
  
  if (id == "#email") {
    var nimg = "settingsh.png";;
    $(cimg).attr("src",nimg);
  }
  if (id == "#photo") {
    var nimg = "cardh.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#cloud") {
    var nimg = "cloudh.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#portfolio") {
    var nimg = "searchh.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#settings") {
    var nimg = burl + "settingsh" + ext;
    $(cimg).attr("src",nimg);
  }
  
}

function swapBack(o) {
  var id = "#" + $(o).attr("id");
  var cimg = new String;
  var burl = "http://grantcr.com/files/",
      ext = ".png"
  cimg = id + " img";
  console.log($(cimg).attr("src"));
  
  if (id == "#email") {
    var nimg = "settings.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#photo") {
    var nimg = "card.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#cloud") {
    var nimg = "cloud.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#portfolio") {
    var nimg = "search.png";
    $(cimg).attr("src",nimg);
  }
  if (id == "#settings") {
    var nimg = "rubyicon.png";
    $(cimg).attr("src",nimg);
  }
  
}
function redirect(o) {
  var id = "#" + $(o).attr("id");
  var cimg = new String;
  var burl = "http://grantcr.com/files/",
      ext = ".png"
  cimg = id + " img";
  console.log($(cimg).attr("src"));
  
  if (id == "#email") {
    window.location.href = "../settings/index.html";
  }
  if (id == "#photo") {
    window.location.href = "../settings/createprofile.html";
  }
  if (id == "#portfolio") {
    window.location.href = "../contacts";
  }
}
 document.getElementById("cloud").onclick = function(){
    window.location.href = "../profile/index.html";
 }