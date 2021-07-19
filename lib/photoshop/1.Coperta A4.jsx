//Script for creating a A4 full size cover

var originalUnit = preferences.rulerUnits
app.preferences.rulerUnits = Units.MM;
app.preferences.typeUnits = TypeUnits.PIXELS;

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

	//Resize the document
	// =======================================================
	//doc.resizeImage(213, 320, 250, ResampleMethod.BICUBIC);
	// =======================================================

	//Ask for the book binding width
	// =======================================================
	var grosimeCotor = Number ( prompt ( 'Grosime cotor (mm):' , 60 ) ) ;
	// =======================================================

	//Change canvas size
	// =======================================================
	doc.resizeImage(426+grosimeCotor, 320, 250, ResampleMethod.BICUBIC);
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
	//doc.guides.add ( Direction.VERTICAL , 0 );
	doc.guides.add ( Direction.VERTICAL , 213 );
	doc.guides.add ( Direction.VERTICAL , 213 + grosimeCotor );
	//doc.guides.add ( Direction.VERTICAL , 426 + grosimeCotor );
	doc.guides.add ( Direction.HORIZONTAL , 297);
	// =======================================================

	var cotorEnd = 213+grosimeCotor;

	//Add mark
	var artLayerRef = doc.artLayers.add();

	app.preferences.rulerUnits = Units.PIXELS;
	docWidthPIX = doc.width.value;

	var posPixY1= 213*doc.resolution/25.4;
	var posPixY2= cotorEnd*doc.resolution/25.4;
	var posPixX1= 297*doc.resolution/25.4;
	var posPixX2= 300*doc.resolution/25.4;

	var shapeRef = [ [posPixY1,posPixX1], [posPixY1,posPixX2], [posPixY2,posPixX2], [posPixY2,posPixX1] ];
	//var shapeRef = [[0,0],[0,100],[100,100],[120,10]];
	doc.selection.select(shapeRef);
	
	var fillColor = new SolidColor();
	fillColor.rgb.red = 0;
	fillColor.rgb.green = 0;
	fillColor.rgb.blue = 0;
	app.activeDocument.selection.fill( fillColor, ColorBlendMode.NORMAL, 100, false);

	doc.selection.deselect();

	// Now create a text layer at the front
	var myLayerRef = doc.artLayers.add();
	myLayerRef.kind = LayerKind.TEXT;
	myLayerRef.name = "Big position: ";

	var myTextRef = myLayerRef.textItem;

	myTextRef.contents = 250-grosimeCotor/2 - 3 + " mm";

	myTextRef.position = new Array( 300*doc.resolution/25.4, 299*doc.resolution/25.4);
	myTextRef.size = 5;
	
	app.preferences.rulerUnits = Units.MM;
	app.preferences.typeUnits = TypeUnits.MM;
    
    //doc.resizeCanvas(new UnitValue(487,'mm'),new UnitValue(330,'mm'), AnchorPosition.MIDDLECENTER);
} else {
	alert("Mai intai creaza un document de orice dimensiuni si orice profil de culoare!");
}