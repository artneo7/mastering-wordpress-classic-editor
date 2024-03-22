(function () {
  tinymce.create('tinymce.plugins.Artneo', {
    init: function (editor, url) {
      // register custom formats
      editor.on('init', function () {
        editor.formatter.register('test', {
          inline: 'span',
          classes: 'blue'
        });
        editor.formatter.register('highlighter', {
          inline: 'mark',
        });
        editor.formatter.register('featured', {
          block: 'div',
          classes: 'featured',
          wrapper: true
        });
        editor.formatter.register('custom-class', {
          block: 'div',
          classes: '%class',
          wrapper: true
        });
      });

      // add buttons
      editor.addButton('test', {
        title: 'Test (Alt+T)',
        image: url + '/icons/test.svg',
        onclick: function () {
          editor.formatter.toggle('test');
        }
      });
      editor.addButton('highlighter', {
        title: 'Highlighter (Alt+H)',
        image: url + '/icons/highlighter.svg',
        onclick: function () {
          editor.formatter.toggle('highlighter');
        }
      });
      editor.addButton('featured', {
        title: 'Featured (Alt+F)',
        image: url + '/icons/featured.svg',
        onclick: function () {
          editor.formatter.toggle('featured');
        }
      });
      editor.addButton('custom-class', {
        title: 'Custom Class (Alt+C)',
        image: url + '/icons/custom-class.svg',
        onclick: function () {
          promptForClass(editor);
        }
      });

      // add shortcuts
      editor.addShortcut('alt+t', 'Test shortcut', function () {
        editor.formatter.toggle('test');
      });
      editor.addShortcut('alt+h', 'Highlighter shortcut', function () {
        editor.formatter.toggle('highlighter');
      });
      editor.addShortcut('alt+f', 'Featured shortcut', function () {
        editor.formatter.toggle('featured');
      });

    }
  });

  function promptForClass(editor) {
    editor.windowManager.open({
      title: 'Enter Custom Class',
      body: {
        type: 'textbox',
        name: 'className',
        label: 'Class'
      },
      onsubmit: function (e) {
        if (e.data.className) {
          editor.formatter.apply('custom-class', { class: e.data.className });
        }
      }
    });
  }
  
  tinymce.PluginManager.add('custom', tinymce.plugins.Artneo);
})();
