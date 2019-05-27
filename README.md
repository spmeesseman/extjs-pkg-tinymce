# ExtJs Package Wrapper for TinyMCE

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/spmeesseman/extjs-pkg-tinymce.svg)](https://greenkeeper.io/)
[![Build Status](https://dev.azure.com/spmeesseman/extjs-pkg-tinymce/_apis/build/status/spmeesseman.extjs-pkg-tinymce?branchName=master)](https://dev.azure.com/spmeesseman/extjs-pkg-tinymce/_build/latest?definitionId=2&branchName=master)

## Description

> This package provides an ExtJS package wrapper for the TinyMCE wysiwyg editor.  Currently including v4.8.2.

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
        xtype: 'tinymceeditor'
    }]
