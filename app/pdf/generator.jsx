import React from 'react';
import { jsPDF } from 'jspdf';

const MessagePDFGenerator = ({ messages }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Discussion Between Two BPMN Experts', 20, 20);

    let yOffset = 30; // Initial offset for the text

    messages.forEach((message, index) => {
      // Determine if the message is odd or even
      const isOdd = index % 2 === 0;
      const sectionTitle = isOdd ? 'First Expert (Odd Messages)' : 'Second Expert (Even Messages)';

      // Add section title
      doc.setFontSize(14);
      doc.text(sectionTitle, 20, yOffset);
      yOffset += 10;

      // Add message
      doc.setFontSize(12);
      doc.text(`${index + 1}: ${message}`, 20, yOffset);
      yOffset += 10;

      // Add some space between entries
      yOffset += 5;
    });

    // Save the PDF
    doc.save('messages.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default MessagePDFGenerator;