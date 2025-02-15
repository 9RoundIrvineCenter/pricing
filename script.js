const url = 'https://drive.google.com/uc?export=download&id=1-zTDop-XTYLi57BJqS-VOo0Q5WFzD8KL';

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.js';

const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
  const container = document.getElementById('pdf-container');
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    pdf.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
      container.appendChild(canvas);
    });
  }
});