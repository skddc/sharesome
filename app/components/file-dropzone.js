import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',
  classNames: ['file-dropzone content upload'],
  classNameBindings: ['hasFileToUpload'],

  dragEnter() {
    this.$().addClass('drag-active');
    return false;
  },

  dragOver() {
    return false;
  },

  dragLeave() {
    this.$().removeClass('drag-active');
    return false;
  },

  drop(e) {
    e.preventDefault();
    this.$().removeClass('drag-active');

    if (e.stopPropagation) { e.stopPropagation(); }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      this.readInputFile(e.dataTransfer.files[0]);
    }
  },

  actions: {

    readInputFile(file) {
      this.readInputFile(file);
    }

  }

});
