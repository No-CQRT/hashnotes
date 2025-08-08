const editor = document.getElementById('editor');
const charCount = document.getElementById('char-count');
const copyIcon = document.getElementById('copy-icon');
const popup = document.getElementById('popup');

// Precompiled note
const defaultNote = "Benvenuto su Hash Notes! Condividi questa nota semplicemente copiando l'URL.";

// Decode hash on load
if (location.hash.length > 1) {
  try {
    const decoded = decodeURIComponent(atob(location.hash.slice(1)));
    editor.value = decoded;
  } catch (e) {
    console.error("Errore nella decodifica:", e);
    editor.value = defaultNote;
  }
} else {
  editor.value = defaultNote;
}

// Update hash and character count
editor.addEventListener('input', () => {
  const text = editor.value.slice(0, 2000);
  editor.value = text;
  const encoded = btoa(encodeURIComponent(text));
  location.hash = encoded;
  charCount.textContent = 2000 - text.length;
});

// Copy URL to clipboard
copyIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(location.href).then(() => {
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 2000);
  });
});
