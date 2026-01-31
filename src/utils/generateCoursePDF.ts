import { pdf } from '@react-pdf/renderer';
import CoursePDFDocument from '@/components/pdf/CoursePDFDocument';
import React from 'react';

/**
 * Generates the course PDF and opens it in a new browser tab.
 * Also triggers an automatic download if the browser allows it.
 */
export const generateAndDownloadCoursePDF = async (): Promise<void> => {
  try {
    // Generate the PDF blob
    const blob = await pdf(React.createElement(CoursePDFDocument)).toBlob();
    
    // Create a URL for the blob
    const pdfUrl = URL.createObjectURL(blob);
    
    // Open in new tab
    const newTab = window.open(pdfUrl, '_blank');
    
    // Also trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Project-Beet-2.0-Training-Course-${new Date().toISOString().split('T')[0]}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL after a delay (to allow the new tab to load)
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 10000);
    
    // If new tab was blocked by popup blocker, the download should still work
    if (!newTab || newTab.closed) {
      console.log('Popup blocked, but download should proceed.');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
