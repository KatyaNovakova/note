var elementCreateNote = document.querySelector('.js-btn-create');


elementCreateNote.addEventListener('click', function() {
    var note = document.createElement('div');

    note.onmousedown = mouseDown;

    var btnClose = document.createElement('button');
    note.appendChild(btnClose);
    btnClose.classList.add('btn');

    btnClose.addEventListener('click', function() {
        element.removeChild(note);
    })

    var iconCloseI = document.createElement('i');
    btnClose.appendChild(iconCloseI);
    iconCloseI.classList.add('fas');
    iconCloseI.classList.add('fa-window-close');

    var message = document.createElement('textarea');
    note.appendChild(message);

    // insert note in body
    var element = document.querySelector('.main-content');
    note.classList.add('notes');
    

    element.appendChild(note);

});


function mouseDown(event) { 
    if (!event.target.className.includes('notes')) return;

    var  eventNote = event.target;

    var coords = getCoords(event);
    var shiftX = event.pageX - coords.left;
    var shiftY = event.pageY - coords.top;
    
    eventNote.style.position = 'absolute';
    eventNote.style.zIndex = 1000;

    moveAt(event);

    function moveAt(event) {
        if (!event.target.className.includes('notes')) return;
        eventNote.style.left = (event.pageX - shiftX) + 'px';
        eventNote.style.top = (event.pageY - shiftY) + 'px';
    }

    document.addEventListener('mousemove', moveAt, false);

    eventNote.onmouseup = function() {
        document.removeEventListener('mousemove', moveAt, false);
        eventNote.onmouseup = null;
    };


    eventNote.ondragstart = function() {
        return false;
    };
}

function getCoords(event) {
    var rect = event.target.getBoundingClientRect();
    var coords = {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };  
    return coords;
}

