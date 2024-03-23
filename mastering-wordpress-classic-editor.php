<?php
/*
Plugin Name: Mastering WordPress Classic Editor
Description: Add custom buttons to the WordPress Classic editor
Version: 0.3
Author: Andre Esteves Perrone
*/

// disable Gutenberg
add_filter( 'use_block_editor_for_post', '__return_false' );

// remove backup notice
function disable_autosave_notification() {
  if (is_admin()) {
    add_action('admin_head', function() { ?>
    <style>
      #local-storage-notice, #notice {
        display: none !important;
      }
    </style>
    <?php });
  }
}
add_action('init', 'disable_autosave_notification');

// customize toolbar buttons
add_filter('tiny_mce_before_init', 'customize_tinymce_toolbar');
function customize_tinymce_toolbar($init) {
  $init['toolbar1'] = 'formatselect, bold, italic, bullist,numlist, blockquote, removeformat, link';
  $init['toolbar2'] = 'test, highlighter, featured, custom-class';

  $init['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;';
  print_r($init);
  return $init;
}

// TinyMCE customization
include_once(plugin_dir_path(__FILE__) . '/tinymce/tinymce.php');

// add custom CSS
function artneo_plugin_enqueue_styles() {
  wp_enqueue_style('main-style', plugins_url('tinymce/css/tinymce.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'artneo_plugin_enqueue_styles');
