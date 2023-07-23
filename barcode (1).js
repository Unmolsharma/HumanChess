
<script src="https://unpkg.com/quagga/dist/quagga.min.js"></script>

<video id="scanner" width="320" height="240"></video>

// Configure the scanner
Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#scanner")
    },
    decoder: {
      readers: ["ean_reader"] // Specify the types of barcodes to decode
    }
  });
  
  // Start the scanner
  Quagga.start();

  
  // Add an event listener to the scanner
Quagga.onDetected(function(result) {
    console.log(result.codeResult.code); // Print the barcode value to the console
  });

  // Assume each barcode scanner has a unique ID or marker

// Listen for barcode scanner events
document.addEventListener('barcodeScanned', function(event) {
    var scannerId = event.detail.scannerId; // Get the ID of the scanner that scanned the barcode
    var scannedData = event.detail.scannedData; // Get the scanned data from the barcode
    
    // Use the scanner ID to determine which square on the board the barcode corresponds to
    var squareId = getSquareIdFromScannerId(scannerId);
    
    // Update the position of the piece on the board
    var piece = getPieceFromSquareId(squareId);
    piece.move(scannedData); // Assume the scanned data represents a new position for the piece
  });

  
  function handleSquareClick(event) {
    var selectedSquare = event.target;
    var selectedCoords = selectedSquare.id.split(",");
    var selectedRow = parseInt(selectedCoords[0]);
    var selectedCol = parseInt(selectedCoords[1]);
  
    // Scan barcode and update player position
    barcodeScanner.scan(function(result) {
      var scannedValue = result.codeResult.code;
      var player = findPlayerByBarcode(scannedValue);
      if (player) {
        board[selectedRow][selectedCol] = player;
        drawPieces();
      }
    });
  }