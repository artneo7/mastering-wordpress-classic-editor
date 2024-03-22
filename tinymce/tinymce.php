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

// add custom styles to the TinyMCE editor
function tinymce_add_editor_styles() {
  add_editor_style(plugins_url('css/tinymce.css', __FILE__ ));
}
add_action('admin_init', 'tinymce_add_editor_styles');
