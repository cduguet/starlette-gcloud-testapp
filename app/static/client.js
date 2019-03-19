var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = '';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze() {
    var input_text = el('input-text');
    if (input_text.length < 1) alert('Please input some text!');

    el('analyze-button').innerHTML = 'Creating...';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
    xhr.onerror = function() {alert (xhr.responseText);}
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            var response = JSON.parse(e.target.responseText);
            el('result-box').innerHTML = `Result = ${response['result']}`;
        }
        el('analyze-button').innerHTML = 'Complete text';
    }

    var data = new FormData();
    data.append('text', el('result-box').innerHTML);
    xhr.send(data);

    // var uploadFiles = el('file-input').files;
    // if (uploadFiles.length != 1) alert('Please select 1 file to analyze!');

    // el('analyze-button').innerHTML = 'Analyzing...';
    // var xhr = new XMLHttpRequest();
    // var loc = window.location
    // xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
    // xhr.onerror = function() {alert (xhr.responseText);}
    // xhr.onload = function(e) {
    //     if (this.readyState === 4) {
    //         var response = JSON.parse(e.target.responseText);
    //         el('result-label').innerHTML = `Result = ${response['result']}`;
    //     }
    //     el('analyze-button').innerHTML = 'Analyze';
    // }

    // var fileData = new FormData();
    // fileData.append('file', uploadFiles[0]);
    // xhr.send(fileData);
}
