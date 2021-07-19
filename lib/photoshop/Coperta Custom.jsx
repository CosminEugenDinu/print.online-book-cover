#target photoshop


//Script for creating a A4 full size cover

var originalUnit = preferences.rulerUnits
app.preferences.rulerUnits = Units.MM;
app.preferences.typeUnits = TypeUnits.PIXELS;
// Create a new document 
// 50cm X 50cm at 72 dpi
// Title: helloPhotoshop
var document = app.documents.add(50, 50, 72, "helloPhotoshop");
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
    var numPag = Number(prompt('Introdu numarul de pagini!'));
    var tickness = Number(prompt('Grosime foaie per pagina', 0.05));
    var grosimeCotor = numPag * tickness;
	//var grosimeCotor = Number ( prompt ( 'Grosime cotor (mm):' , 60 ) );
	// =======================================================

    
    //Ask for the cover width
	// =======================================================
	var coverWidth = Number ( prompt ( 'Width (mm):' , 176 ) ) ;
	// =======================================================
    
    //Ask for the cover height
	// =======================================================
	var coverHeight = Number ( prompt ( 'Height (mm):' , 250 ) ) ;
	// =======================================================

	//Change canvas size
	// =======================================================
	doc.resizeImage((coverWidth * 2) + 6 + grosimeCotor, 320, 250, ResampleMethod.BICUBIC);
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
	doc.guides.add ( Direction.VERTICAL , coverWidth + 3 );
	doc.guides.add ( Direction.VERTICAL , coverWidth + 3 + grosimeCotor );
	doc.guides.add ( Direction.HORIZONTAL , coverHeight);
	// =======================================================

	var cotorEnd = coverWidth + 3 + grosimeCotor;

	//Add mark
	var artLayerRef = doc.artLayers.add();

	app.preferences.rulerUnits = Units.PIXELS;
	docWidthPIX = doc.width.value;

	var posPixY1= (coverWidth + 3)*doc.resolution/25.4;
	var posPixY2= cotorEnd*doc.resolution/25.4;
	var posPixX1= coverHeight*doc.resolution/25.4;
	var posPixX2= (coverHeight + 3)*doc.resolution/25.4;

	var shapeRef = [ [posPixY1,posPixX1], [posPixY1,posPixX2], [posPixY2,posPixX2], [posPixY2,posPixX1] ];
	//var shapeRef = [[0,0],[0,100],[100,100],[120,10]];
	doc.selection.select(shapeRef);
	
	var fillColor = new SolidColor();
	fillColor.rgb.red = 0;
	fillColor.rgb.green = 0;
	fillColor.rgb.blue = 0;
	app.activeDocument.selection.fill( fillColor, ColorBlendMode.NORMAL, 100, false);

	doc.selection.deselect();

    /*
	// Now create a text layer at the front
	var myLayerRef = doc.artLayers.add();
	myLayerRef.kind = LayerKind.TEXT;
	myLayerRef.name = "Big position: ";

	var myTextRef = myLayerRef.textItem;

	myTextRef.contents = 250-grosimeCotor/2 - 3 + " mm";

	myTextRef.position = new Array( 300*doc.resolution/25.4, 299*doc.resolution/25.4);
	myTextRef.size = 5;
      */
	
	app.preferences.rulerUnits = Units.MM;
	app.preferences.typeUnits = TypeUnits.MM;
} else {
	alert("Mai intai creaza un document de orice dimensiuni si orice profil de culoare!");
}