function drawIt() {
  var x = 250;
  var y = 300;
  var dx = 0;
  var dy = 0;
  var r = 15;
  var ctx;
  var canvas
  var paddlex;
  var paddleh;
  var paddlew;
  var rightDown = false;
  var leftDown = false;
  var canvasMinX;
  var canvasMaxX;
  var bricks;
  var NCOLSWIDTH;
  var BRICKHEIGHT;
  var PADDING;
  var HEIGHT;
  var bric = new Image();
  bric.src = "../slike/log3.png";
  var bric2 = new Image();
  bric2.src = "../slike/bog2.png";
  var padle = new Image();
  padle.src = "../slike/log.png"
  var ball = new Image();
  ball.src = "../slike/blade.png";
  var start = false;
  var sekunde;
  var sekundeI;
  var minuteI;
  var intTimer;
  var izpisTimer;
  var tocke;
  var life = 3;
  var casInterval;
  var pause=false;
  var pauseInterval;
  var povecava = true;

  function init() {

    sekunde = 0;
    tocke = 0;
    //izpisTimer = "00:00";
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);
    $("#tocke").html(tocke);
	  $("#life").html(life);
    return setInterval(draw, 10);
  }

    function timer(){
		if(start)
		{
			sekunde++;
			sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
			minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
			izpisTimer = minuteI + ":" + sekundeI;
			$("#cas").html(izpisTimer);
		}
		else
		{
			sekunde=0;
			$("#cas").html(izpisTimer);
		}
	}

  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 20;
    paddlew = 75;
  }

  function circle(x, y, r) {
    ctx.drawImage(ball, x-r, y-r);
    /*
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  */
  }



  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    //ctx.drawImage(padle, x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }


	function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }



  function onKeyDown(evt) {
    if (evt.keyCode == 39)
      rightDown = true;
    else if (evt.keyCode == 37)
    leftDown = true;
    else if(evt.keyCode == 80){ //če pritisnemo P se igra vstavi
		pause_game();

		}
		else if(evt.keyCode == 32&&!start){
			dy=4;
			start=true;
		}
  }

  function pause_game(){ //pause
  if(!pause){
  pause=true;
  life=life;
  clearInterval(intervalId);
  clearInterval(intTimer);
  napis_pause();
  }

  else{
  pause=false;
  life=life;
    intervalId=setInterval(draw, 10);
    intTimer = setInterval(timer, 1000);
  }
}

  function onKeyUp(evt) {
    if (evt.keyCode == 39)
      rightDown = false;
    else if (evt.keyCode == 37)
    leftDown = false;
  }
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  function initbricks() { //inicializacija opek - polnjenje v tabelo
    NROWS = 4;
    NCOLS = 5;
    BRICKWIDTH = (WIDTH / NCOLS) - 1;
    BRICKHEIGHT = 25;
    PADDING = 1;
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j = 0; j < NCOLS; j++) {
        if(i==0)
        bricks[i][j] = 2;
        if(i==1)
        bricks[i][j] = 2;
        if(i==2)
        bricks[i][j] = 1;
      }
    }
  }
/*
  function timer() {
    if(start){

      sekunde++;
      sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
      minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
      izpisTimer = minuteI + ":" + sekundeI;
      $("#cas").html(izpisTimer);
    }

}
*/
  function napis_pause(){
    ctx.font = "60px Courier New";
    ctx.lineWidth=1;
    ctx.strokeStyle = "#0E4D2B";
    ctx.fillStyle = "black";
    ctx.fillText("PAVZA",200,290);

    ctx.font = "45px Courier New";
    ctx.lineWidth=1;
    ctx.fillText("Pritisni P ",170,350);
    ctx.fillText("za nadaljevanje",110,400);

	}

  function draw() {
    clear();
    circle(x, y, r);
    //premik ploščice levo in desno
    if (rightDown) {
      if ((paddlex + paddlew) < WIDTH) {
        paddlex += 4;
      } else {
        paddlex = WIDTH - paddlew;
      }
    } else if (leftDown) {
      if (paddlex > 0) {
        paddlex -= 4;
      } else {
        paddlex = 0;
      }
    }

      rect(paddlex, HEIGHT - paddleh+12, paddlew, paddleh);

    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          ctx.drawImage(bric, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        if (bricks[i][j] == 2) {
          ctx.drawImage(bric2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }
        if (bricks[i][j] == 3) {
          ctx.drawImage(bric2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
        }

      }
    }

	if(dy==0){

    ctx.font = "60px Courier New";
    ctx.lineWidth=1;
    ctx.strokeStyle = "#0E4D2B";
    ctx.fillStyle = "black";
    ctx.fillText("NIVO 2",200,260);
    //ctx.strokeText("PAUSE",240,250);
    ctx.font = "45px Courier New";
    ctx.lineWidth=1;
    ctx.fillText("Pritisni SPACE",120,350);

		}

    if(tocke>=10 && povecava){

  		dy=dy*1.4;
  		povecava=false;
  	}

    rowheight = BRICKHEIGHT + PADDING + r / 2; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING + r / 2;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
      dy = -dy;
      bricks[row][col] = 0;
      tocke += 1;
      $("#tocke").html(tocke);
    }

    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2) {
      dy = -dy;
      bricks[row][col] = 1;
      tocke += 2;
      $("#tocke").html(tocke);
    }

    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3) {
      dy = -dy;
      bricks[row][col] = 2;
      tocke += 2;
      $("#tocke").html(tocke);
    }
    if (x + dx > WIDTH - r || x + dx < 0 + r)
      dx = -dx;

    if (y + dy < 0 + r)
      dy = -dy;
    else if (y + dy > HEIGHT - r) {
      //start = false;
      life--;
      $("#life").html(life);
	  console.log(life);
      //Odboj kroglice, ki je odvisen od odboja od ploščka
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 4 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
        start = true;
        life++;
        $("#life").html(life);
      } else if (y + dy > HEIGHT - r)
        //clearInterval(intervalId);
        dy= -dy;


    }

    x += dx;
    y += dy;


	if (life <= 0) {
    KonecIgre();
    clearInterval(intervalId);
    clearInterval(intTimer);
  }

  if(tocke>=35){
    Zmaga();
    start=false;
    clearInterval(intervalId);
    clearInterval(intTimer);

  }


  }

  function KonecIgre() {

    Swal.fire({
    type: 'error',
    html:'<p style="font-family:Courier New;font-size:50px;color:black;">Konec Igre</p><br/>',
}).then(function(isConfirm) {
if (isConfirm) {
location.reload();
}
});
}

function Zmaga(){
  Swal.fire({
    title: 'Zmaga',
    text: "Ali želite nadaljevati",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'darkturquoise',
    confirmButtonText: 'Da',
    cancelButtonText: 'Ne'
  }).then((result) => {
    if (result.value) {
      window.location.href = 'Level3.html'
    }else{
      window.location.href = 'IzbiraLevela.html'
    }
  })


}










  intervalId=init();
  init_paddle();
  initbricks();





}
