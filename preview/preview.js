function LiveHTMLPreview(editor, preview) {
    this.editor = editor;
    this.preview = preview;
    this.prev_scroll = {};

    this.preview.setAttribute("srcdoc", editor.getValue());
    this.editor.session.on('change', function(delta) {
        // Maintain scroll position in iframe
        prev_scroll = {
            left: preview.contentWindow.scrollX,
            top: preview.contentWindow.scrollY,
            behavior: "instant"
        };

        // Update contents
        preview.setAttribute("srcdoc", editor.getValue());
    });

    this.preview.onload = function(event) {
        // Reset original scroll position
        preview.contentWindow.scroll(prev_scroll);
    }
}