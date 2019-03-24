# ExtJs Package (Open Tooling) - TinyMCE

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/spmeesseman/extjs-pkg-tinymce.svg)](https://greenkeeper.io/)
[![Build Status](https://dev.azure.com/spmeesseman/extjs-pkg-tinymce/_apis/build/status/spmeesseman.extjs-pkg-tinymce?branchName=master)](https://dev.azure.com/spmeesseman/extjs-pkg-tinymce/_build/latest?definitionId=2&branchName=master)

[![Known Vulnerabilities](https://snyk.io/test/github/spmeesseman/extjs-pkg-tinymce/badge.svg)](https://snyk.io/test/github/spmeesseman/extjs-pkg-tinymce)
[![codecov](https://codecov.io/gh/spmeesseman/extjs-pkg-tinymce/branch/master/graph/badge.svg)](https://codecov.io/gh/spmeesseman/extjs-pkg-tinymce)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/spmeesseman/extjs-pkg-tinymce.svg)](https://isitmaintained.com/project/spmeesseman/extjs-pkg-tinymce "Average time to resolve an issue")
[![Percentage of issues still open](https://isitmaintained.com/badge/open/spmeesseman/extjs-pkg-tinymce.svg)](https://isitmaintained.com/project/spmeesseman/extjs-pkg-tinymce "Percentage of issues still open")
[![Dependencies Status](https://david-dm.org/spmeesseman/extjs-pkg-tinymce/status.svg)](https://david-dm.org/spmeesseman/extjs-pkg-tinymce)
[![DevDependencies Status](https://david-dm.org/spmeesseman/extjs-pkg-tinymce/dev-status.svg)](https://david-dm.org/spmeesseman/extjs-pkg-tinymce?type=dev)

## Description

> This package provides an ExtJS wrapper for the TinyMCE wysiwyg editor.

## Install

To install this package, run the following command:

> npm install extjs-pkg-tinymce

## Usage

The TinyMCE editor is included at:

    mce-release\version

To include the package in an ExtJS application build, be sure to add the package name to the list of required packages in the app.json file:

    "requires": [
         "extjs-pkg-tinymce",
        ...
    ]

For an open tooling build, also add the node_modules path to the workspace.json packages path array:

     "packages": {
        "dir": "...${package.dir}/node_modules/extjs-pkg-tinymce"
    }

## Other ExtJs packages and builds by spmeesseman

extjs-server-net
extjs-pkg-fontawesome
extjs-pkg-theme-graphite-small
extjs-pkg-theme-amethyst

