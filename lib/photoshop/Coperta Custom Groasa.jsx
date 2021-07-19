//Script for creating a A4 full size cover

function drawLine( startXY, endXY, width ) {  
// two element array of numbers for x,y start of line,   
// two element array of numbers for x,y endof line,  
//number;line width in pixels  
// uses foreground color 

     var desc = new ActionDescriptor();  
        var lineDesc = new ActionDescriptor();  
            var startDesc = new ActionDescriptor();  
            startDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), startXY[0] );  
            startDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), startXY[1] );  
        lineDesc.putObject( charIDToTypeID('Strt'), charIDToTypeID('Pnt '), startDesc );  
            var endDesc = new ActionDescriptor();  
            endDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), endXY[0] );  
            endDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), endXY[1] );  
        lineDesc.putObject( charIDToTypeID('End '), charIDToTypeID('Pnt '), endDesc );  
        lineDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), width );  
    desc.putObject( charIDToTypeID('Shp '), charIDToTypeID('Ln  '), lineDesc );  
    desc.putBoolean( charIDToTypeID('AntA'), true );  
    executeAction( charIDToTypeID('Draw'), desc, DialogModes.NO );  
};

var originalUnit = preferences.rulerUnits
app.preferences.rulerUnits = Units.MM;
app.preferences.typeUnits = TypeUnits.MM;

////////////////////////////////////////////////////////////////////// //////////////////////////////////
// Get the active document number - the number of opening order
function getActiveDocumentIndex(){
     var ref = new ActionReference();
     ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
     return desc = executeActionGet(ref).getInteger(stringIDToTypeID('itemIndex'))-1;
}

if ( app.documents.length != 0 )
{
	if(documents.length>0) {
	    var thisIndexImage = getActiveDocumentIndex();
	    doc = app.documents[thisIndexImage];
	} else {
	    alert ("You must have opened images to run this script.")
	}

	//Ask for the book binding width
	// =======================================================
	var grosimeCotor = Number ( prompt ( 'Grosime cotor - max 35 (mm): ' , 60 ) ) ;
    var grosimeMucava = Number ( prompt ( 'Grosime mucava: ' , 2 ) ) ;
    grosimeCotor = grosimeCotor + grosimeMucava * 2;
    var extraCotor = Number ( prompt ( 'Latime extra cotor:' , 13 ) ) ;;
    var lungime_cop = Number ( prompt ( 'Lungime coperta (latura mica): ' , 200 ) ) ;
    var latime_cop = Number ( prompt ( 'Latime coperta (latura mare): ' , 303 ) ) ;
    var margine_sus_jos = 13;
    var margine_stanga_dreapta = 30;
    var lungime_ghid = 7;
    var distTaiereColt = Number ( prompt ( 'Distanta taiere colt: ' , 5 ) ) ;
	// =======================================================

	//Change canvas size
    var CANVASX = (lungime_cop+margine_stanga_dreapta + extraCotor) * 2 + grosimeCotor;
    var CANVASY = latime_cop + 2 * margine_sus_jos;

	// =======================================================
	doc.resizeImage(CANVASX, CANVASY, 250, ResampleMethod.BICUBIC);
	// =======================================================
    
    //Fit image on screen
	// =======================================================
	var id57 = charIDToTypeID( "slct" );
	var desc15 = new ActionDescriptor();
	var id58 = charIDToTypeID( "null" );
	var ref6 = new ActionReference();
        var id59 = charIDToTypeID( "Mn  " );
        var id60 = charIDToTypeID( "MnIt" );
        var id61 = charIDToTypeID( "FtOn" );
        ref6.putEnumerated( id59, id60, id61 );
	desc15.putReference( id58, ref6 );
	executeAction( id57, desc15, DialogModes.NO );
	// =======================================================

	//Add rullers
	// =======================================================
     doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta );
	doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta + lungime_cop );
    doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta + lungime_cop + extraCotor);
    doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta + lungime_cop + extraCotor + grosimeCotor);
	doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta + lungime_cop + grosimeCotor + (extraCotor * 2) );
     doc.guides.add ( Direction.VERTICAL , margine_stanga_dreapta + lungime_cop + grosimeCotor + (extraCotor * 2) + lungime_cop );
	doc.guides.add ( Direction.HORIZONTAL , (CANVASY-latime_cop)/2);
     doc.guides.add ( Direction.HORIZONTAL , latime_cop + (CANVASY-latime_cop)/2);
	// =======================================================

	var cotorEnd = margine_sus_jos + lungime_cop + grosimeCotor;

	//Add mark
	var artLayerRefBlack = doc.artLayers.add();

	app.preferences.rulerUnits = Units.MM;
	docWidthPIX = doc.width.value;
    
    var lineWidth = 4;
    
    var x = CANVASX / 2 - (grosimeCotor / 2 + extraCotor + lungime_cop);
    var y = (CANVASY - latime_cop) / 2;
    var xpn = y - distTaiereColt * Math.sqrt(2) + x;
    var CanvasXxpnS = (CANVASX - xpn) * doc.resolution/25.4;
    var CanvasYxpnS = (CANVASY - xpn) * doc.resolution/25.4;
    var xpnS = xpn * doc.resolution/25.4;
    
    var CANVASXS = CANVASX * doc.resolution/25.4;
    var CANVASYS = CANVASY * doc.resolution/25.4;
    
    var defaultForegroundColor = app.foregroundColor;
    
    //BLACK
    var fillColor = new SolidColor();
	fillColor.rgb.red = 0;
	fillColor.rgb.green = 0;
	fillColor.rgb.blue = 0;
    app.foregroundColor  = fillColor;
    
    //GHID 45 STANGA SUS
    var startPoint = [xpnS, 0];
    var endPoint = [0, xpnS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 DREAPTA SUS
    var startPoint = [CanvasXxpnS, 0];
    var endPoint = [CANVASXS, xpnS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 STANGA JOS
    var startPoint = [0, CanvasYxpnS];
    var endPoint = [xpnS, CANVASYS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 DREAPTA JOS
    var startPoint = [CANVASXS, CanvasYxpnS];
    var endPoint = [CanvasXxpnS, CANVASYS]; 
    drawLine( startPoint, endPoint, lineWidth );  

    //STANGA SUS
	var posPixX1= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixX2= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;   
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA SUS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA SUS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + (margine_stanga_dreapta-lungime_ghid))*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL DREAPTA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + (margine_stanga_dreapta-lungime_ghid))*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //STANGA JOS
	var posPixX1= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA JOS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA JOS (cotor subtire)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA JOS 
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //DREAPTA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL STANGA SUS
	var posPixX1= 0*doc.resolution/25.4;
	var posPixX2= lungime_ghid*doc.resolution/25.4;
	var posPixY1= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL STANGA JOS
	var posPixX1= 0*doc.resolution/25.4;
	var posPixX2= lungime_ghid*doc.resolution/25.4;
	var posPixY1= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    
    
    //WHITE
    
    var artLayerRefWhite = doc.artLayers.add();
    
    var fillColor = new SolidColor();
	fillColor.rgb.red = 255;
	fillColor.rgb.green = 255;
	fillColor.rgb.blue = 255;
    app.foregroundColor  = fillColor;
    
    
    //GHID 45 STANGA SUS
    var startPoint = [xpnS, 0];
    var endPoint = [0, xpnS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 DREAPTA SUS
    var startPoint = [CanvasXxpnS, 0];
    var endPoint = [CANVASXS, xpnS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 STANGA JOS
    var startPoint = [0, CanvasYxpnS];
    var endPoint = [xpnS, CANVASYS]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //GHID 45 DREAPTA JOS
    var startPoint = [CANVASXS, CanvasYxpnS];
    var endPoint = [CanvasXxpnS, CANVASYS]; 
    drawLine( startPoint, endPoint, lineWidth );  

    //STANGA SUS
	var posPixX1= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixX2= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;   
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA SUS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA SUS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixY1= 0*doc.resolution/25.4;
	var posPixY2= lungime_ghid*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL DREAPTA SUS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + (margine_stanga_dreapta-lungime_ghid))*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL DREAPTA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + (margine_stanga_dreapta-lungime_ghid))*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop + margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //STANGA JOS
	var posPixX1= margine_stanga_dreapta*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU STANGA JOS (cotor)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+extraCotor)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA JOS (cotor subtire)
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //CENTRU DREAPTA JOS 
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //DREAPTA JOS
	var posPixX1= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixX2= (margine_stanga_dreapta + lungime_cop+grosimeCotor + extraCotor * 2 + lungime_cop)*doc.resolution/25.4;
	var posPixY1= (CANVASY - lungime_ghid)*doc.resolution/25.4;
	var posPixY2= CANVASY*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL STANGA SUS
	var posPixX1= 0*doc.resolution/25.4;
	var posPixX2= lungime_ghid*doc.resolution/25.4;
	var posPixY1= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= ((CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
    
    //LATERAL STANGA JOS
	var posPixX1= 0*doc.resolution/25.4;
	var posPixX2= lungime_ghid*doc.resolution/25.4;
	var posPixY1= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
	var posPixY2= (latime_cop + (CANVASY-latime_cop)/2)*doc.resolution/25.4;
    
    var startPoint = [posPixX1,posPixY1];
    var endPoint = [posPixX2, posPixY2]; 
    drawLine( startPoint, endPoint, lineWidth );  
   
   
   
    
    // Now create a text layer at the front
	var myLayerRef = doc.artLayers.add();
	myLayerRef.kind = LayerKind.TEXT;
	myLayerRef.name = "";

	var myTextRef = myLayerRef.textItem;

	myTextRef.contents = grosimeCotor;

	myTextRef.position = new Array( 1,  (lungime_ghid + 5));
	myTextRef.size = 10;
          
    app.preferences.rulerUnits = Units.MM;
    app.preferences.typeUnits = TypeUnits.MM;
    
    app.foregroundColor = defaultForegroundColor
} else {
	alert("Mai intai creaza un document de orice dimensiuni si orice profil de culoare!");
}