function genQR() {
  const baseURL = "https://quickchart.io/qr";
  const myimg = document.getElementById('img');
  const mytext = document.getElementById("qrtext").value.trim();
  const mysize = document.getElementById("size").value;

  const validSizes = ["100", "150", "200", "250", "300"];

  if (mytext && validSizes.includes(mysize)) {
    myimg.src = `${baseURL}?text=${encodeURIComponent(mytext)}&size=${mysize}`;
  } else {
    alert("Please enter text and select a valid size.");
  }
}

// Download QR Code as image
document.getElementById("downloadBtn").addEventListener("click", function () {
  const qrImage = document.getElementById("img");

  if (!qrImage.src || qrImage.src.includes("placeholder")) {
    alert("Please generate a QR code first.");
    return;
  }

  // Create a canvas to draw the image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();

  // Enable cross-origin access
  img.crossOrigin = "anonymous";
  img.src = qrImage.src;

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    // Convert canvas to blob and trigger download
    canvas.toBlob(function (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "image/png");
  };

  img.onerror = function () {
    alert("Failed to load QR image for download. Try regenerating.");
  };
});

//clear button
document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("img").src = "placeholderqr.png";
  document.getElementById("qrtext").value = "";
});