// QRCodeGenerator.js

import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QRCodeGenerator.css';

function QRCodeGenerator() {
  const [productLink, setProductLink] = useState('');
  const [generatedQRCode, setGeneratedQRCode] = useState('');
  const [error, setError] = useState('');

  const handleProductLinkChange = (e) => {
    setProductLink(e.target.value);
    setError('');
  };

  const generateQRCode = () => {
    // Prefix the product link with 'https://' if it's missing
    const formattedLink = productLink.startsWith('http') ? productLink : `https://${productLink}`;

    // Validate the URL
    if (!isValidURL(formattedLink)) {
      setError('Please enter a valid URL');
      return;
    }

    // Generate the QR code
    setGeneratedQRCode(formattedLink);
  };

  const isValidURL = (url) => {
    // Regular expression for URL validation
    const pattern = /^(https?):\/\/[^\s$.?#].[^\s]*$/i;
    return pattern.test(url);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-container">
      <h1 className="qr-title"> QR Code Generator</h1>
      <div className="input-container">
        <label className="input-label"> Link: </label>
        <input
          type="text"
          value={productLink}
          onChange={handleProductLinkChange}
          placeholder="Enter link"
          className="input-field"
        /><br/>
        <button onClick={generateQRCode} className="generate-btn">Generate QR Code</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="qr-code-container">
        {generatedQRCode && (
          <>
            <h2 className="qr-code-title">QR Code</h2>
            <QRCode value={generatedQRCode} id="qr-code" size={200} className="qr-code" />
            <p className="scan-text">Scan the QR code to view the page</p>
            <button onClick={downloadQRCode} className="download-btn">Download QR Code</button>
          </>
        )}
      </div>
    </div>
  );
}

export default QRCodeGenerator;
