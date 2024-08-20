
export default function downloadFile({ data, fileName, fileType }) {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    a.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }));
    a.remove();
};
