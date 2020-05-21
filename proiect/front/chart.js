


    function noData() {

        document.getElementById("chartLegend").innerHTML = null;
        var reprezinta = document.getElementById("reprezinta");
        document.getElementById("chart").innerHTML = null;
        reprezinta.innerHTML = "Ne pare rau,nu au fost gasite rezultate conform cautarilor dumneavoastra."
    }

    function descriereChart(judet, marca, categorie, descriere) {
        var reprezinta = document.getElementById("reprezinta");
        var descrie = "Evoluția numărului de mașini";
        if (judet)
            descrie = descrie + " din județul " + judet;
        if (marca)
            descrie = descrie + " marca " + marca;
        if (categorie)
            descrie = descrie + " din categoria națională " + categorie;
        if (descriere)
            descrie = descrie + " cu descrierea comercială " + descriere;
        descrie = descrie + " din parcul auto din România în ultimii 5 ani."
        reprezinta.innerHTML = descrie;
        legenda = document.getElementById("chartLegend");
        legenda.setAttribute("display", "block")
    }

    function lineChartGet() {
        var tip = "line";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {

            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            //  data=xmlHttp.responseText;
            //  alert(xmlHttp.status+"cd"+xmlHttp.readyState)
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    info = this.responseText
                    console.log("inf" + info);
                    if (info == 0) {
                        noData();

                    } else {
                        //  info=JSON.parse(this.responseText)

                        lineChart(info)
                        descriereChart(judet, marca, categorie, descriere);
                    }

                }
            }
        }
    }


    function barChartGet() {
        var tip = "bar";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {

            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            //  data=xmlHttp.responseText;
            //  alert(xmlHttp.status+"cd"+xmlHttp.readyState)
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    info = this.responseText
                    console.log("inf" + info);
                    if (info == 0) {

                        noData();

                    } else {
                        //  info=JSON.parse(this.responseText)

                        barChart(info)
                        descriereChart(judet, marca, categorie, descriere);
                    }

                }
            }
        }
    }


    function pieChartGet() {
        var tip = "pie";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {

            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            //  data=xmlHttp.responseText;
            //  alert(xmlHttp.status+"cd"+xmlHttp.readyState)
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    info = this.responseText
                    console.log("inf" + info);
                    if (info == 0) {
                        noData();

                    } else {
                        //  info=JSON.parse(this.responseText)

                        pieChart(info)
                        descriereChart(judet, marca, categorie, descriere);


                    }


                }
            }
        }
    }



document.addEventListener('DOMContentLoaded',()=>{

        const themeStylesheet=document.getElementById('theme');
        const storedTheme=localStorage.getItem('theme');
        if(storedTheme){
        themeStylesheet.href=storedTheme;
        }
        const themeToggle=document.getElementById('theme-toggle');
        themeToggle.addEventListener('click',()=>{
        // if it's light -> go dark
        if(themeStylesheet.href.includes('exs')){
        themeStylesheet.href='dark.css';
        themeToggle.innerText='Switch to light mode';
        }else{
        // if it's dark -> go light
        themeStylesheet.href='exs.css';
        themeToggle.innerText='Switch to dark mode';

        }
        // save the preference to localStorage
        localStorage.setItem('theme',themeStylesheet.href)
        })
        })


//inspiratie:https://codeburst.io/creating-and-drawing-on-an-html5-canvas-using-javascript-93da75f001c1

        function createGrid(canvas,ctx){

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw a line every *step* pixels
        const step=50
        const stepX=100

        // our end points
        const width=canvas.width
        const height=canvas.height
        // console.log("alea",canvas.width,canvas.height);
        // console.log("alea",width,height);

        // set our styles
        ctx.save()
        ctx.strokeStyle='gray' // line colors
        ctx.fillStyle='black' // text color
        ctx.font='14px Monospace'
        ctx.lineWidth=0.35
        var an=2015
        // draw vertical from X to Height
        for(let x=0;x<height; x+=stepX){
        //   console.log(x);
        // draw vertical line
        ctx.beginPath()
        ctx.moveTo(x,0)
        ctx.lineTo(x,height)
        ctx.stroke()
        // draw text
        if(x>0)
        {ctx.fillText(an,x-30,height-3)
        an=an+1}

        }
        ctx.fillText(an,height-30,height-3)
        // draw horizontal from Y to Width
        for(let y=0;y<height; y+=step){
        //   console.log(y);
        // draw horizontal line
        ctx.beginPath()
        ctx.moveTo(0,y)
        ctx.lineTo(width,y)
        ctx.stroke()

        // draw text
        // ctx.fillText(y, 0, width-y)
        }

        // restore the styles from before this function was called
        ctx.restore()
        }

        function lineChart(coordonate){


        //    var coordonate=[{x: 100, y: 87 }, 
        // { x: 200, y: 81 }, 
        // { x: 300, y: 76 }, 
        // { x: 400, y: 70 },
        // { x: 500, y: 66 }]
        // set our config variables
        coordonate=JSON.parse(coordonate)
        var c15=coordonate.c2015;
        var c16=coordonate.c2016;
        var c17=coordonate.c2017;
        var c18=coordonate.c2018;
        var c19=coordonate.c2019;
        console.log(c15,c16,c17,c18,c19)
        coordonate="[{\"x\": 100, \"y\": "+c15+
        "}, { \"x\": 200, \"y\": "+c16+
        "}, { \"x\": 300, \"y\": "+c17+
        "}, { \"x\": 400, \"y\": "+c18+
        "}, { \"x\": 500, \"y\": "+c19+" }] "
        coordonate=JSON.parse(coordonate)


        console.log("coo",coordonate)
        canvas=document.getElementById("chart")
        ctx=canvas.getContext("2d")
        canvas.width=500;
        canvas.height=500;
        colors=[{color:"#F1C40F"},{color:"#a55ca5"},{color:"#bccd7a"},{color:"#eb9743"},{color:"#67b6c7"}]
        createGrid(canvas,ctx)
        for(var i=0;i<coordonate.length-1;i++){
        var obj=coordonate[i];
        //   console.log("col?",coordonate[i].x,coordonate[i+1].y,coordonate[i+1].x,coordonate[i].y,colors[i].color);
        drawLineL(ctx,coordonate[i].x,495-coordonate[i].y,coordonate[i+1].x,495-coordonate[i+1].y,colors[i].color,4)
        drawPoint(ctx,coordonate[i].x,495-coordonate[i].y,colors[i].color)
        // drawLine(ctx,400,90,500,87,"#F1C40F")
        }
        drawPoint(ctx,(coordonate[4].x)-4,495-coordonate[4].y,colors[4].color)

        ctx.save();
        ctx.font='bold 25px Roboto'
        ctx.textAlign='left'

        // ctx.translate(100, 100);
        ctx.rotate(-Math.PI/2);
        ctx.textAlign="center";
        ctx.fillText("Numarul de masini",-250,25);
        ctx.restore();
        drawLineL(ctx,0,0,0,canvas.height,"black",2)
        drawLineL(ctx,0,canvas.height,canvas.width,canvas.height,"black",2)
//   document.getElementById("reprezinta").innerText = "LineChart:Evoluția numărului de mașini în parcul auto din România în ultimii 5 ani";
        }
        function drawLineL(ctx,startX,startY,endX,endY,color,lineWidth){
        ctx.strokeStyle=color;
        if(lineWidth!=null)ctx.lineWidth=lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.closePath();
        }
        function drawPoint(ctx,startX,startY,color){

        //ctx.strokeStyle = 'black'
        ctx.fillStyle=color
        ctx.beginPath();

        ctx.arc(startX,startY,5,0,2*Math.PI,false) // full circle
        ctx.fill()
//ctx.stroke()

        ctx.closePath();
        }


//sursa:https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561

        function drawLine(ctx,startX,startY,endX,endY,color){
        ctx.save();
        ctx.strokeStyle=color;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
        }
        function drawBar(ctx,upperLeftCornerX,upperLeftCornerY,width,height,color){
        ctx.save();
        ctx.fillStyle=color;
        ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
        ctx.restore();
        }
        var Barchart=function(options){
        this.options=options;
        this.canvas=options.canvas;
        this.ctx=this.canvas.getContext("2d");
        this.colors=options.colors;

        this.draw=function(){
        var maxValue=0;
        for(var categ in this.options.data){
        maxValue=Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight=this.canvas.height-this.options.padding*2;
        var canvasActualWidth=this.canvas.width-this.options.padding*2;

        //drawing the grid lines
        var gridValue=0;
        while(gridValue<=maxValue){
        var gridY=canvasActualHeight*(1-gridValue/maxValue)+this.options.padding;
        drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
        );

        //writing grid markers
        this.ctx.save();
        this.ctx.fillStyle=this.options.gridColor;
        this.ctx.restore();

        gridValue+=this.options.gridScale;
        }

        //drawing the bars
        var barIndex=0;
        var numberOfBars=Object.keys(this.options.data).length;
        var barSize=(canvasActualWidth)/numberOfBars;

        for(categ in this.options.data){
        var val=this.options.data[categ];
        var barHeight=Math.round(canvasActualHeight*val/maxValue);
        drawBar(
        this.ctx,
        this.options.padding+barIndex*barSize,
        this.canvas.height-barHeight-this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex%this.colors.length]
        );

        barIndex++;
        }

        }
        }
        function barChart(date)
        {
        var myCanvas=document.getElementById("chart");
        date=JSON.parse(date)
        console.log("de"+date)
        myCanvas.width=500;
        myCanvas.height=500;

        var ctx=myCanvas.getContext("2d");

        // var masini = {
        //   "2015": 66,
        //   "2016": 70,
        //   "2017": 76,
        //   "2018": 81,
        //   "2019": 87
        // };


        var myBarchart=new Barchart(
        {
        canvas:chart,
        seriesName:"Evoluția numărului de mașini în parcul auto din România în ultimii 5 ani",
        padding:10,
        gridScale:5,
        gridColor:"#eeeeee",
        data:date,
        colors:["#F1C40F","#a55ca5","#bccd7a","#eb9743","#67b6c7"]
        }
        );
        myBarchart.draw();
//   document.getElementById("reprezinta").innerText = "BarChart:Evoluția numărului de mașini în parcul auto din România în ultimii 5 ani";
        }


        //sursa:https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197

        function drawLine(ctx,startX,startY,endX,endY){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        }
        function drawArc(ctx,centerX,centerY,radius,startAngle,endAngle){
        ctx.beginPath();

        ctx.arc(centerX,centerY,radius,startAngle,endAngle);
        ctx.stroke();
        }
        function drawPieSlice(ctx,centerX,centerY,radius,startAngle,endAngle,color){
        ctx.fillStyle=color;
        ctx.beginPath();

        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX,centerY,radius,startAngle,endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.stroke()
        }
        var Piechart=function(options){
        this.options=options;
        this.canvas=options.canvas;
        this.ctx=this.canvas.getContext("2d");
        this.colors=options.colors;

        this.draw=function(){
        var total_value=0;
        var color_index=0;
        for(var categ in this.options.data){
        var val=this.options.data[categ];
        total_value+=val;
        }

        var start_angle=0;
        for(categ in this.options.data){
        val=this.options.data[categ];
        var slice_angle=2*Math.PI*val/total_value;

        drawPieSlice(
        this.ctx,
        this.canvas.width/2,
        this.canvas.height/2,
        Math.min(this.canvas.width/2,this.canvas.height/2),
        start_angle,
        start_angle+slice_angle,
        this.colors[color_index%this.colors.length]
        );

        start_angle+=slice_angle;
        color_index++;
        }

        }
        this.ctx.save();

        }
        // var masini = {
        //   "2015": 66,
        //   "2016": 70,
        //   "2017": 76,
        //   "2018": 81,
        //   "2019": 87
        // };
        function removeElement(elementId){
        // Removes an element from the document
        var element=document.getElementById(elementId);
        element.parentNode.removeChild(element);
        }
        function pieChart(date){

        var myCanvas=document.getElementById("chart");
        date=JSON.parse(date)
        console.log("de"+date)
        myCanvas.width=500;
        myCanvas.height=500;

        var ctx=myCanvas.getContext("2d");

        var myPiechart=new Piechart(
        {
        canvas:myCanvas,
        data:date,
        colors:["#F1C40F","#a55ca5","#bccd7a","#eb9743","#67b6c7"],
        // seriesName:"Evoluția numărului de mașini în parcul auto din România în ultimii 5 ani",
        }
        );
        myPiechart.draw();
        // document.getElementById("reprezinta").innerText = "PieChart:Evoluția numărului de mașini în parcul auto din România în ultimii 5 ani";
        }
