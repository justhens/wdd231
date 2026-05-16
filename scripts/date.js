const yearSpan = document.getElementById('currentyear');
yearSpan.textContent = new Date().getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modified: ' + document.lastModified;