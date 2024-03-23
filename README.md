
# Mini course: Mastering WordPress Classic Editor - Create Custom Buttons with TinyMCE
> Video: https://youtu.be/sVYeEwgn7Uk

## What we'll learn
https://www.tiny.cloud

## Create custom plugin
https://localwp.com  
https://code.visualstudio.com

## Debug TinyMCE toolbar
https://developer.wordpress.org/reference/hooks/tiny_mce_before_init

```php
// customize toolbar buttons
add_filter('tiny_mce_before_init', 'customize_tinymce_toolbar');
function customize_tinymce_toolbar($init) {
  print_r($init);
  return $init;
}
```

## Customize TinyMCE toolbar
```php
// remove backup notice
function disable_autosave_notification() {
  if (is_admin()) {
    add_action('admin_head', function() { ?>
    <style>
      #local-storage-notice, #notice {
        display: none !important;
      }
    </style>;
    <?php })
  }
}
add_action('init', 'disable_autosave_notification');
```

```php
$init['toolbar1'] = 'formatselect';
$init['toolbar2'] = 'bold,italic';
$init['toolbar3'] = 'bullist,numlist';
$init['toolbar4'] = 'blockquote';
```

```php
$init['toolbar1'] = 'formatselect, bold, italic, bullist,numlist, blockquote, removeformat, link';
$init['toolbar2'] = '';
```

## Customize formatselect options
https://www.calliaweb.co.uk/modify-tinymce-editor

```php
$init['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Address=address;Pre=pre';
```

## Custom buttons
```php
$init['toolbar2'] = 'highlighter, featured, custom-class';
```

## Boilerplate
https://code.tutsplus.com/guide-to-creating-your-own-wordpress-editor-buttons--wp-30182t

```php
<?php
// add custom blocks to the TinyMCE editor
add_action('admin_head', 'custom_tinymce_buttons');
function custom_tinymce_buttons() {
  add_filter('mce_external_plugins', 'custom_tinymce_plugin');
}
function custom_tinymce_plugin($plugin_array) {
  $plugin_array['custom'] = plugins_url( 'custom.js', __FILE__ );
  return $plugin_array;
}
```

```php
// TinyMCE customization
include_once(plugin_dir_path(__FILE__) . '/tinymce/tinymce.php');
```

```javascript
(function () {
  tinymce.create('tinymce.plugins.Artneo', {
    init: function (editor, url) {
// add buttons
      editor.addButton('test', {
        title: 'Test',
        onclick: function () {
          var content= 'Test';
          editor.selection.setContent(content);
        }
      });
    }
  });


  tinymce.PluginManager.add('custom', tinymce.plugins.Artneo);
})();
```

## Add SVG icon to custom button
https://lucide.dev

```javascript
image: url + '/icons/test.svg',
```

## Add HTML tags between content
https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#getcontent

```javascript
var selection = editor.selection.getContent({format: 'text'});
```

```javascript
var content = '<strong>' + selection + '</strong>';
```

## The correct way to replicate the bold button
https://www.tiny.cloud/docs/api/tinymce/tinymce.formatter/#match

```javascript
console.log(editor.formatter.match('bold'));
```

```javascript
// check if the current selection is already bold
if (editor.formatter.match('bold')) {
  editor.formatter.remove('bold');
} else {
  editor.formatter.apply('bold');
}
```

## Create custom format
https://www.tiny.cloud/docs/tinymce/latest/content-formatting

```javascript
// register custom formats
editor.on('init', function () {
  editor.formatter.register('test', {
    inline: 'span',
    classes: 'blue'
  });
});
```

## Style for the editor (back-end)
https://developer.wordpress.org/reference/functions/add_editor_style

```css
.blue {
  color: blue;
}
```

## Style for the site (front-end)
https://developer.wordpress.org/reference/functions/wp_enqueue_style

```css
.blue {
  color: blue;
}
```

```php
// add custom CSS
function artneo_plugin_enqueue_styles() {
  wp_enqueue_style('main-style', plugins_url('css/main.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'artneo_plugin_enqueue_styles');
```

## Create custom shortcut
```javascript
// add shortcuts
editor.addShortcut('alt+t', 'Test shortcut', function () {
  toggleTest(editor);
});
```

## Highlighter
\-

## Featured
```javascript
editor.formatter.register('featured', {
  block: 'div',
  classes: 'featured'
});
```

```javascript
editor.addButton('featured', {
  title: 'Featured (Alt+F)',
  image: url + '/icons/featured.svg',
  onclick: function () {
    toggleFormat(editor, 'featured');
  }
});
```

```javascript
editor.addShortcut('alt+f', 'Featured shortcut', function () {
  toggleFormat(editor, 'featured');
});
```

```css
.featured {
  color: #797979;
  font-size: 1.25rem;
  border-radius: 6px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .1);
  background-color: #fff;
  display: grid;
  gap: 1rem;
}

.featured p {
  margin: 0;
}
```

## Refactoring code
https://www.tiny.cloud/docs-4x/api/tinymce/tinymce.formatter


## Custom Class
https://codex.wordpress.org/TinyMCE

```javascript
editor.formatter.register('custom-class', {
  block: 'div',
  classes: '%class',
  wrapper: true
});
```

```javascript
editor.addButton('custom-class', {
  title: 'Custom Class (Alt+C)',
  image: url + '/icons/custom-class.svg',
  onclick: function () {
    editor.formatter.apply('custom-class', { class: 'featured' });
  }
});
```

```javascript
editor.addShortcut('alt+c', 'Custom Class shortcut', function () {
  promptForClass(editor);
});
```

```javascript
function promptForClass(editor) {
  editor.windowManager.open({
    title: 'Enter Custom Class',
    body: {
      type: 'textbox',
      name: 'className',
      label: 'Class'
    },
    onsubmit: function (e) {
      editor.formatter.apply('custom-class', { class: e.data.className });
    }
  });
}
```

```javascript
promptForClass(editor);
```

```javascript
if (e.data.className) {
  editor.formatter.apply('custom-class', { class: e.data.className });
}
```