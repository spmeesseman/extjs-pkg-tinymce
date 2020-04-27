# ExtJs Package Wrapper for TinyMCE

[![perry-johnson](https://img.shields.io/badge/perry%20johnson-pja-blue.svg)](https://www.perryjohnson.com)
[![app-type](https://img.shields.io/badge/category-extjs%20web-blue.svg)](https://www.perryjohnson.com)
[![app-lang](https://img.shields.io/badge/language-c%23%20javascript-blue.svg)](https://www.perryjohnson.com)
[![app-publisher](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-app--publisher-e10000.svg)](https://github.com/perryjohnsoninc/app-publisher)

[![authors](https://img.shields.io/badge/authors-scott%20meesseman-6F02B5.svg?logo=visual%20studio%20code)](https://www.perryjohnson.com)
[![MantisBT issues open](https://app1.development.pjats.com/projects/plugins/ApiExtend/api/issues/countbadge/extjs-pkg-tinymce/open)](https://app1.development.pjats.com/projects/set_project.php?project=extjs-pkg-tinymce&make_default=no&ref=bug_report_page.php)
[![MantisBT issues closed](https://app1.development.pjats.com/projects/plugins/ApiExtend/api/issues/countbadge/extjs-pkg-tinymce/closed)](https://app1.development.pjats.com/projects/set_project.php?project=app-publisher&make_default=no&ref=plugin.php?page=Releases/releases)
[![MantisBT version current](https://app1.development.pjats.com/projects/plugins/ApiExtend/api/versionbadge/extjs-pkg-tinymce/current)](https://app1.development.pjats.com/projects/set_project.php?project=extjs-pkg-tinymce&make_default=no&ref=plugin.php?page=Releases/releases)
[![MantisBT version next](https://app1.development.pjats.com/projects/plugins/ApiExtend/api/versionbadge/extjs-pkg-tinymce/next)](https://app1.development.pjats.com/projects/set_project.php?project=extjs-pkg-tinymce&make_default=no&ref=plugin.php?page=Releases/releases)

## Description

This package provides an ExtJS package wrapper for the TinyMCE wysiwyg editor.  Currently including v4.8.2.

## Install

To install this package, run the following command:

    npm install @spmeesseman/extjs-pkg-tinymce

## Usage

To include the package in an ExtJS application build, be sure to add the package name to the list of required packages in the app.json file:

    "requires": [
         "tinymce",
        ...
    ]

For an open tooling build, also add the node_modules path to the workspace.json packages path array:

     "packages": {
        "dir": "...${package.dir}/node_modules/@spmeesseman/extjs-pkg-tinymce"
    }

Simply include the control into any class file:

    require: [ 'Ext.tinymce.TinyMceEditor' ],
    items: [
    {
        xtype: 'tinymceeditor',
        defaultValue: 'resources/doc/faq.html',
        fileData: [
            [ 'resources/doc/faq.html', 'Frequently Asked Questions' ]
        ],
        saveCb: function(file, content, editor) {
            ....
        }
    }]
