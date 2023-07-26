// Import the modules
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const { randomUUID } = require("crypto");

// Create a function to generate a PDF document
async function generatePDF() {
  // Create a new document
  const document = await PDFDocument.create();

  // Add a page
  const page = document.addPage();

  // Get the Helvetica font
  const font = await document.embedFont(StandardFonts.Helvetica);

  // Set the font size and color
  const fontSize = 24;
  const color = rgb(0, 0, 0);

  // Write the text on the page
  const text = "Hello World!";
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  const textHeight = font.heightAtSize(fontSize);
  const { width, height } = page.getSize();
  const x = (width - textWidth) / 2;
  const y = (height - textHeight) / 2;
  page.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
    color,
  });

  // Generate a UUID and set it as the document title
  const uuid = randomUUID();
  document.setTitle(uuid);

  // Save the document as a buffer
  const buffer = await document.save();

  // Write the buffer to a file
  fs.writeFileSync("hello.pdf", buffer);
}

// Call the function
generatePDF();
