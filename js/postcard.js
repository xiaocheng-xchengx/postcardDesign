let content = localStorage.getItem("localStorageOne");
let sender = localStorage.getItem("localStorageTwo");
let receiver = localStorage.getItem("localStorageThree");
let stored_answers = JSON.parse(localStorage.getItem("localStorageQuestions"));

// Create Base64 Object
// Source: https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// Read query parameters
const urlParams = new URLSearchParams(window.location.search);

const senderVal = urlParams.get('s');
//console.log("sender: " + senderVal);
if (senderVal != null && senderVal != '') {
	sender = Base64.decode(senderVal);
}

const receiverVal = urlParams.get('r');
if (receiverVal != null && receiverVal != '') {
	receiver = Base64.decode(receiverVal);
}

const contentVal = urlParams.get('c');
if (contentVal != null && contentVal != '') {
	content = Base64.decode(contentVal);
}

const answersVal = urlParams.get('a');
if (answersVal != null && answersVal != '') {
	stored_answers = JSON.parse(Base64.decode(answersVal));
}

//set the content as the ones that user inputted.
window.addEventListener('load', (event) => {
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[0].innerHTML = `Hi, ${receiver},`;
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[1].innerHTML = content;
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[2].innerHTML = `Best, ${sender}.`;
})

//change email button representation when hovered.
document.getElementsByTagName("i")[0].addEventListener("mouseover", (event) => {
  document.getElementsByTagName("i")[0].removeAttribute("class", "far fa-envelope");
  document.getElementsByTagName("i")[0].setAttribute("class", "fas fa-envelope-open");
})

document.getElementsByTagName("i")[0].addEventListener("mouseout", (event) => {
  document.getElementsByTagName("i")[0].removeAttribute("class", "fas fa-envelope-open");
  document.getElementsByTagName("i")[0].setAttribute("class", "far fa-envelope");
})

//change save button representation when hovered.
document.getElementsByTagName("i")[1].addEventListener("mouseover", (event) => {
  document.getElementsByTagName("i")[1].removeAttribute("class", "far fa-save");
  document.getElementsByTagName("i")[1].setAttribute("class", "fas fa-save");
})

document.getElementsByTagName("i")[1].addEventListener("mouseout", (event) => {
  document.getElementsByTagName("i")[1].removeAttribute("class", "fas fa-save");
  document.getElementsByTagName("i")[1].setAttribute("class", "far fa-save");
})

//change twitter button representation when hovered.
document.getElementsByTagName("i")[2].addEventListener("mouseover", (event) => {
  document.getElementsByTagName("i")[2].style.color = "rgb(121, 75, 196)";
})

document.getElementsByTagName("i")[2].addEventListener("mouseout", (event) => {
  document.getElementsByTagName("i")[2].style.color = "white";
})




function saveAs(uri, filename) {
  var link = document.createElement('a');
  console.log("save");
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

// Snapshot
function takeShot() {
  html2canvas(document.getElementById("card"), {allowTaint: true}).then(function(canvas)
	{
	  document.getElementById("output").appendChild(canvas);
	  saveAs(canvas.toDataURL(), 'postcard.png');
	});
}

// Snapshot
function sendEmail() {
  senderV = Base64.encode(sender);
  receiverV = Base64.encode(receiver);
  contentV = Base64.encode(content);
  answersV = Base64.encode(JSON.stringify(stored_answers));
  queryParams = `?s=${senderV}%26r=${receiverV}%26c=${contentV}%26a=${answersV}`;
  fullLink = "https://xiaocheng-xchengx.github.io/postcardDesign/postcard.html" + queryParams
  console.log("queryParams:"+fullLink);

  subject = `Postcard from ${sender}`
  body = `Check out the postcard: ${fullLink}`
  console.log("body:"+body);

  window.open(`mailto:?subject=${subject}&body=${body}`);
}



//Postcard theme starts here
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function putRandomShape(x, y, color) {
  var num = getRandomIntInclusive(1, 4);

  if (num == 1) {
    var shape = two.makeCircle(x, y, 12);
    shape.fill = color;
    shape.rotation = getRandomIntInclusive(-0.3, 0.3);
		shape.noStroke()
  }

  if (num == 2) {
    var shape = two.makeRoundedRectangle(x, y, 20*1.2, 10*1.2, 6);
    shape.fill = color;
    shape.rotation = getRandomIntInclusive(-0.3, 0.3);
		shape.noStroke()
  }

  if (num == 3) {
    var shape = two.makePolygon(x, y, 12, 3);
    shape.fill = color;
    shape.rotation = getRandomIntInclusive(-0.3, 0.3);
		shape.noStroke()
  }

  if (num == 4) {
    var shape = two.makeStar(x, y, 20*1.2, 10*1.2, 7);
    shape.fill = color;
    shape.rotation = getRandomIntInclusive(-0.3, 0.3);
		shape.noStroke()
  }
}

// Set background image
var elem = document.getElementsByClassName('themeImg')[0];
if (stored_answers[2] == 0) {
    // Family
    elem.style.backgroundImage = "url('./img/family.png')";
}
if (stored_answers[2] == 1) {
    // Friend
    elem.style.backgroundImage = "url('./img/friend.png')";
}
if (stored_answers[2] == 2) {
    // Partner
    elem.style.backgroundImage = "url('./img/partner.png')";
}
if (stored_answers[2] == 3) {
    // Secret-Crush
    elem.style.backgroundImage = "url('./img/secretCrush.png')";
}




// Two.js
var two = new Two({ fullscreen: false }).appendTo(elem);

// //x,y,object width,object height
// var linewidth = '2px';
//
//
// // Shape 1
// if (stored_answers[0] == 0) {
//     var hsl1 = 47
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#ffc800';
// }
// if (stored_answers[0] == 1) {
//     var hsl1 = 108
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(35, 100)+"%"
//     var stroke = '#24b300';
// }
// if (stored_answers[0] == 2) {
//     var hsl1 = 265
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#6a00ff';
// }
// var color = `hsl(${hsl1},${hsl2},${hsl3})`
// var rectA = two.makeRoundedRectangle(150, 100, 50, 30);
// rectA.stroke = stroke;
// rectA.linewidth = linewidth;
// rectA.fill = color;
//
// // Shape 2
// if (stored_answers[0] == 0) {
//     var hsl1 = 47
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#ffc800';
// }
// if (stored_answers[0] == 1) {
//     var hsl1 = 108
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(35, 100)+"%"
//     var stroke = '#24b300';
// }
// if (stored_answers[0] == 2) {
//     var hsl1 = 265
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#6a00ff';
// }
// var circle = two.makeCircle(100, 20, 10);
// circle.stroke = stroke;
// circle.linewidth = linewidth;
// circle.fill = color;
//
// // Shape 3
// if (stored_answers[0] == 0) {
//     var hsl1 = 47
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#ffc800';
// }
// if (stored_answers[0] == 1) {
//     var hsl1 = 108
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(35, 100)+"%"
//     var stroke = '#24b300';
// }
// if (stored_answers[0] == 2) {
//     var hsl1 = 265
//     var hsl2 = "100%"
//     var hsl3 = getRandomIntInclusive(50, 100)+"%"
//     var stroke = '#6a00ff';
// }
// var color = `hsl(${hsl1},${hsl2},${hsl3})`
// if (stored_answers[1] == 0) {
//     // sunny
//     var weather_related_image = two.makeArcSegment(40, 80, 30, 60, Math.PI, 2 * Math.PI);
// } else if (stored_answers[1] == 2) {
//     // cloudy
//     var weather_related_image = two.makeEllipse(40, 50, 20, 30);
// } else if (stored_answers[1] == 3) {
//     // foggy
//     var weather_related_image = two.makeCurve(40, 80, 60, 120, 50, 20, true);
// } else {
//     var weather_related_image = two.makeStar(40, 80, 30, 60, 5);
// }
// weather_related_image.stroke = stroke;
// weather_related_image.linewidth = linewidth;
// weather_related_image.fill = color;
// weather_related_image.rotation = 0.8

let qOneAnswer = stored_answers[0];
let stroke = "";

function getMainColor(qOneAnswer) {
  if(qOneAnswer == 0){
    stroke = ["47", "100%", "50%"];
  }else if (qOneAnswer == 1){
    stroke = ["108", "100%", "35%"]
  }else if (qOneAnswer == 2){
    stroke = ["265", "100%", "50%"];
  }
  return stroke;
}

if (stored_answers[1] == 0) {
  //sunny
  colorArray = getMainColor(qOneAnswer);
  var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

  putRandomShape(getRandomIntInclusive(20, 90), getRandomIntInclusive(20, 50), color);
  putRandomShape(getRandomIntInclusive(110, 190), getRandomIntInclusive(20, 50), color);
  putRandomShape(getRandomIntInclusive(210, 260), getRandomIntInclusive(20, 50), color);

  putRandomShape(getRandomIntInclusive(20, 70), getRandomIntInclusive(80, 150), color);
  putRandomShape(getRandomIntInclusive(90, 160), getRandomIntInclusive(80, 150), color);
  putRandomShape(getRandomIntInclusive(180, 220), getRandomIntInclusive(80, 150), color);
  putRandomShape(getRandomIntInclusive(235, 260), getRandomIntInclusive(80, 150), color);

  putRandomShape(getRandomIntInclusive(20, 90), getRandomIntInclusive(175, 260), color);
  putRandomShape(getRandomIntInclusive(110, 190), getRandomIntInclusive(175, 260), color);
  putRandomShape(getRandomIntInclusive(210, 260), getRandomIntInclusive(175, 260), color);

} else if (stored_answers[1] == 1) {
  //rainy
  for (let x = 0; x <= 270; x+=90){
    var rainy1 = two.makeCurve(40+x, 30, 20+x, 70, 40+x, 110, 20+x, 150, 40+x, 190, 20+x, 230, 40+x, 270, true);
    var rainy2 = two.makeCurve(70+x, 70, 90+x, 110, 70+x, 150, 90+x, 190, 70+x, 230, true);
		colorArray = getMainColor(qOneAnswer);
		var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
    rainy1.stroke = color;
    rainy1.linewidth = "5px";
    rainy1.noFill();
    rainy2.stroke = color;
    rainy2.linewidth = "5px";
    rainy2.noFill();
  }
} else if (stored_answers[1] == 2) {
  //cloudy
  for (let x1 = 20; x1 <= 260; x1+= 60){
    for (let y1 = 50; y1 <= 280; y1+=100) {
      var cloudy1 = two.makePolygon(x1, y1, 15, 3);
			colorArray = getMainColor(qOneAnswer);
      var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
      cloudy1.fill = color;
			cloudy1.noStroke()
      cloudy1.rotation = 0.3;
    }
  }
  for (let x2 = 50; x2 <= 260; x2+= 60){
    for (let y2 = 100; y2 <= 280; y2+=100) {
      var cloudy2 = two.makePolygon(x2, y2, 15, 3);
			colorArray = getMainColor(qOneAnswer);
      var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
      cloudy2.fill = color;
			cloudy2.noStroke()
      cloudy2.rotation = -0.3;
    }
  }
} else if (stored_answers[1] == 3) {
  //foggy
  for (let x = -250; x <= 250; x+=50) {
    var foggy = two.makeLine(x, 0, 299+x, 299);
    stroke = getMainColor(qOneAnswer);
    var colors = [
      'white',
      `hsl(${stroke[0]}, ${stroke[1]}, ${stroke[2]})`
    ];
    var linearGradient = two.makeLinearGradient(
      0, x,
      299, 299 + x,
      new Two.Stop(0, colors[1]),
      new Two.Stop(1, colors[0])
    );

    foggy.stroke = linearGradient;
    foggy.linewidth = "3px";
  }
} else if (stored_answers[1] == 4) {
  //snowy
  for (let x1 = 20; x1 <= 260; x1+= 120){
    for (let y1 = 50; y1 <= 280; y1+=100) {
      colorArray = getMainColor(qOneAnswer);
      var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

      // var colors = [
      //   'red',
      //   'black',
      //   'yellow'
      // ];
      // var linearGradient = two.makeLinearGradient(
      //   x1 - 10, y1 - 10,
      //   x1 + 30, y1 + 30,
      //   new Two.Stop(0, colors[0]),
      //   new Two.Stop(1, colors[1]),
      //   new Two.Stop(2, colors[2])
      // );
      //
      // var radialGradient = two.makeRadialGradient(
      //   x1, y1, 2,
      //   new Two.Stop(0, colors[0]),
      //   new Two.Stop(1, colors[1]),
      //   new Two.Stop(2, colors[2])
      // );
      //
      // snowy1.fill = radialGradient;

      var snowy1 = two.makeStar(x1, y1, 10, 20, 6);
      snowy1.fill = color;
      snowy1.noStroke()
    }
  }
  for (let x2 = 75; x2 <= 260; x2+= 120){
    for (let y2 = 100; y2 <= 280; y2+=100) {
      colorArray = getMainColor(qOneAnswer);
      var color = `hsl(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

      var snowy2 = two.makeStar(x2, y2, 20, 10, 6);
      snowy2.fill = color;
      snowy2.noStroke()
    }
  }
}

two.update();
