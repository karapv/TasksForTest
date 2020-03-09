document.addEventListener('DOMContentLoaded',function () {
  const mainCanvas = document.getElementById('mainCanvas'),subCanvas = document.getElementById('subCanvas');
  /*Main settings*/
  mainCanvas.setAttribute('width','600px');
  mainCanvas.setAttribute('height','600px');
  subCanvas.setAttribute('width','600px');
  subCanvas.setAttribute('height','50px');
  /*Settings for Main Canvas*/
  const mainContext = mainCanvas.getContext('2d');
  //Function for draw stars
  function drawStars(cx, cy, spikes, outherRadius, innerRadius, colorFigure) {
     if(typeof cy !== "number" || typeof cx !== "number" || typeof spikes !== "number" || typeof outherRadius !== "number" || typeof innerRadius !== "number" || typeof colorFigure !== "string"){
         throw new Error('You entered the wrong data into the function!');
     }
     let rot = Math.PI / 2 * 3;
     let x = cx;
     let y = cy;
     let step = Math.PI / spikes;
     mainContext.beginPath();
     mainContext.moveTo(cx,cy - outherRadius);
     for(let i = 0;i<spikes;i++){
         x = cx+Math.cos(rot) * outherRadius;
         y = cy + Math.sin(rot) * outherRadius;
         mainContext.lineTo(x,y);
         rot += step;
         x = cx + Math.cos(rot) * innerRadius;
         y = cy + Math.sin(rot) * innerRadius;
         mainContext.lineTo(x,y);
         rot += step;
     }
      mainContext.lineTo(cx,cy - outherRadius);
      mainContext.closePath();
      mainContext.lineWidth = 5;
      mainContext.fillStyle = colorFigure;
      mainContext.fill();
  }
  /* Draw stars */
  let firstStar = '#ff0000', secondStar = '#0006ff',thirdStar = '#52ec74',fourthStar = '#faff00',fifthStar = '#000';
  drawStars(40, 40, 5, 30, 15,  firstStar);
  drawStars(110, 40, 5, 30, 15, secondStar);
  drawStars(180, 40, 5, 30, 15, thirdStar);
  drawStars(250, 40, 5, 30, 15, fourthStar);
  drawStars(145, 110, 5, 30, 15, fifthStar);
  /* Click events for stars */
  mainCanvas.addEventListener('click',(e)=> {
      const x = e.offsetX;
      const y = e.offsetY;
      const img_data = mainContext.getImageData(x, y, 1, 1);//ImageData
      const pix = img_data.data;
      console.log(pix);
      subCanvas.style.backgroundColor =  `rgba(${pix.join(',')})`;
  })
});