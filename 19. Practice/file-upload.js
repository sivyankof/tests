function FileUploadInput() {
    const self = this;
    const $fileUploadContainer = document.querySelector(
        '.form-group--file-upload'
    );
    const $fileUploadInputInput = $fileUploadContainer.querySelector(
        '.form-input--file-upload'
    );

    const dragEvents = [
        'drag',
        'dragstart',
        'dragend',
        'dragover',
        'dragenter',
        'dragleave',
        'drop',
    ];
    const dragOverEvents = ['dragover', 'dragenter'];
    const dragLeaveEvents = ['dragleave', 'dragend', 'drop'];
    const dragDropEvents = ['drop'];

    $fileUploadInputInput.addEventListener('change', onInputCahnge);

    addDragEventsListeners();

    this.droppedFiles = null;

    function addDragEventsListeners() {
        dragEvents.forEach((event) => {
            $fileUploadContainer.addEventListener(event, preventDefaultDrag);
        });
        dragOverEvents.forEach((event) => {
            $fileUploadContainer.addEventListener(event, onDragOver);
        });
        dragLeaveEvents.forEach((event) => {
            $fileUploadContainer.addEventListener(event, onDragLeave);
        });
        dragDropEvents.forEach((event) => {
            $fileUploadContainer.addEventListener(event, onDragDrop);
        });
    }

    function onDragOver(e) {
        $fileUploadContainer.classList.add('is-dragover');
    }

    function onDragLeave() {
        $fileUploadContainer.classList.remove('is-dragover');
    }

    function onDragDrop(e) {
        self.droppedFiles = e.dataTransfer.files;
        showFiles(self.droppedFiles);
    }

    function onInputCahnge(e) {
        self.droppedFiles = e.target.files;
        showFiles(self.droppedFiles);
    }

    function showFiles(files) {
        document.querySelector('.form-input--file-upload--label').innerText =
            files[0].name;
    }

    function preventDefaultDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}
