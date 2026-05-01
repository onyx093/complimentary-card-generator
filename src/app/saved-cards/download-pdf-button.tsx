"use client";

import React from "react";
import { jsPDF } from "jspdf";

type Props = {
  svg: string;
  filenameBase: string;
  className?: string;
  label?: React.ReactNode;
  widthPx?: number;
  heightPx?: number;
};

export default function DownloadPdfButton({
  svg,
  filenameBase,
  className = "",
  label = "Download",
  widthPx = 1050,
  heightPx = 600,
}: Props) {
  const getPngDataUrl = async (): Promise<string> => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load SVG"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = widthPx;
    canvas.height = heightPx;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  };

  const handleDownload = async () => {
    try {
      const pngDataUrl = await getPngDataUrl();

      // 3.5in x 2in business card PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [3.5, 2],
      });

      pdf.addImage(pngDataUrl, "PNG", 0, 0, 3.5, 2, undefined, "FAST");
      pdf.save(`${filenameBase}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <button type="button" onClick={handleDownload} className={className}>
      {label}
    </button>
  );
}
