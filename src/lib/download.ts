/**
 * Utility for direct, instant image downloading without opening new tabs.
 * Uses client-side Blob conversion and falls back to server attachment endpoints.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function downloadPosterImage(
  imageUrl: string,
  suggestedFilename?: string,
  posterId?: string
): Promise<void> {
  const baseName = (suggestedFilename || 'poster').trim().replace(/[\s/\\?%*:|"<>]+/g, '_');
  const filename = baseName.toLowerCase().endsWith('.png') ? baseName : `${baseName}.png`;

  // 1. Primary Strategy: Fetch image as Blob and trigger instant native download
  // Blob URLs (blob:http...) are recognized as same-origin by the browser,
  // guaranteeing that the HTML5 `download` attribute is strictly respected and NO new tab is opened.
  try {
    const response = await fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    });

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);
      return;
    }
  } catch (blobErr) {
    console.warn('Direct blob fetch failed, trying alternative download strategies:', blobErr);
  }

  // 2. Secondary Strategy: Backend Download Route with Content-Disposition: attachment
  if (posterId) {
    try {
      const backendDownloadUrl = `${API_BASE_URL}/posters/${posterId}/download`;
      const link = document.createElement('a');
      link.href = backendDownloadUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    } catch (backendErr) {
      console.warn('Backend download route failed:', backendErr);
    }
  }

  // 3. Tertiary Strategy: Cloudinary Transformation with fl_attachment
  if (imageUrl.includes('res.cloudinary.com') && imageUrl.includes('/upload/')) {
    try {
      const cleanName = encodeURIComponent(filename.replace(/\.png$/i, ''));
      const attachmentUrl = imageUrl.replace(
        '/upload/',
        `/upload/fl_attachment:poster-${cleanName}/`
      );
      const link = document.createElement('a');
      link.href = attachmentUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    } catch (cErr) {
      console.warn('Cloudinary attachment fallback failed:', cErr);
    }
  }

  // 4. HTML5 Canvas Fallback
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
      img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  } catch (canvasErr) {
    console.warn('Canvas export fallback failed:', canvasErr);
  }

  // 5. Final fallback: trigger standard download anchor without target="_blank"
  const fallbackLink = document.createElement('a');
  fallbackLink.href = imageUrl;
  fallbackLink.download = filename;
  fallbackLink.style.display = 'none';
  document.body.appendChild(fallbackLink);
  fallbackLink.click();
  document.body.removeChild(fallbackLink);
}
