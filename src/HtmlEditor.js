Ext.define('Ext.ux.tinymce.HtmlEditor',
{
    extend: 'Ext.panel.Panel',
    xtype: 'filebrowserhtmleditor',
   
    requires: [
        'Ext.ux.tinymce.TinyMceEditor',
        'Ext.ux.tinymce.InputWinOne'
    ],
              
	border: false,
    reference: 'htmleditorRef',
    
    userDoc: false,

	config:
    {
        saveCb: Ext.emptyFn,
        minmaxCb: Ext.emptyFn,
        fileData: undefined,
        defaultValue: undefined
    },

    publishes:
    {
        fileData: true,
        defaultValue: true
    },

    layout: 
    {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },

    dockedItems: [
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
            xtype: 'displayfield',
            value: 'New Document',
            fieldCls: 'filebrowser-base-color',
            hidden: true,
            fieldStyle: {
                'font-size': '16px'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Document',
            displayField: 'dsc',
            valueField: 'file',
            editable: false,
            forceSelection: true,
            labelWidth: 65,
            margin: '0 15 0 0',
			queryMode: 'local',
            width: 340,
            bind:
            {
                store: '{fileStore}',
                value: '{htmleditorRef.defaultValue}'
            },
            viewModel:
            {
                stores:
                {
                    fileStore:
                    {
                        type: 'array',
                        fields: [ 'file', 'dsc' ],
                        data: '{htmleditorRef.fileData}'
                    }
                }
            },
            listeners:
            {
                //change: function(cmb, newvalue)
                //{
                //    Ext.Ajax.request({
                //        url: 'resources/doc/' + newvalue + '?raw=true',
                //        method: 'GET',
                //        success: function(response) {
                //            cmb.up('htmleditor').down('tinymceeditor').setValue(response.responseText);
                //        }
                //    });
                //},
                change: function(cmb, newvalue)
                {
                    var he = cmb.up('helpedithtmlfile');
                    var retries = 0;

                    if (cmb.ignoreChangeEvent === true) {
                        return;
                    }

                    Utils.log('Help desk doc editor2 selection', 1);
                    Utils.logValue('   New value', newvalue, 2);

                    //
                    // unhide add button
                    //
                    cmb.next('button').setHidden(false);

                    function setEditorValue(value)
                    {
                        var tmce = he.down('tinymceeditor');
                        delete he.addMode;
                        if (he && tmce) // && tmce.isEditorLoaded())
                        {
                            Utils.log('   Setting editor value', 2);
                            tmce.setValue(value);
                        }
                        else if (retries < 5)
                        {
                            Utils.log('   Editor not found, retry...', 3);
                            Ext.create('Ext.util.DelayedTask', function()
                            {
                                retries++;
                                setEditorValue(value);
                            }).delay(500);
                        }
                    }

                    he.userDoc = newvalue.indexOf('/user/') !== -1;

                    Ext.Ajax.request({
                        url: newvalue + '?rnd=' + Utils.getRandomNumber(),
                        method: 'GET',
                        success: function(response) {
                            setEditorValue(response.responseText);
                        }
                    });
                }
            }
        },
        '->',
        {
            text: 'Add',
            iconCls: 'far fa-plus',
            handler: function(btn)
            {
				var he = btn.up('helpedithtmlfile');
                var tmce = he.down('tinymceeditor');
                var cmb = he.down('combo');
                he.addMode = true;
                tmce.setValue('');
                cmb.setHidden(true);
                cmb.prev().setHidden(false); // 'New Document' label
                btn.setHidden(true);
                btn.next().setHidden(true);
            }
        },
        {
            text: 'Cancel',
            iconCls: 'far fa-times',
            hidden: true,
            handler: function(btn)
            {
				var he = btn.up('helpedithtmlfile');
                var cmb = he.down('combo');
                delete he.addMode;
                cmb.setHidden(false);
                cmb.prev().setHidden(true); // 'New Document' label
                btn.setHidden(true);
                cmb.fireEvent('change', cmb, cmb.getValue());
            }
		},
        {
            text: 'Save',
            iconCls: 'far fa-save',
            handler: function(btn)
            {
				var he = btn.up('helpedithtmlfile');
				var tmce = he.down('tinymceeditor');
                var cmb = btn.prev('combo');
                var fileName = cmb.getValue();
                var fileTitle = cmb.getSelection().get('dsc');

				var html = tmce.getValue();
                        
				function addToTree(tree)
                {
                    var childCfg = {
                        text: cmb.getSelection().get('dsc'),
                        file: fileName,
                        title: fileTitle,
                        leaf: true
                    };
                    var found = false;
                    //var docNode = tree.getStore().getRoot().getChildAt(7);
                    var userFolder = 'Docs by ';

                    tree.getStore().getRoot().eachChild(function(c) {
                        if (c.data.leaf !== true && c.data.text == docNode) {
                            found = true;
                            c.appendChild(Ext.create("Ext.data.TreeModel", childCfg));
                        }
                    });

                    if (!found) {
                        tree.getStore().getRoot().appendChild(Ext.create("Ext.data.TreeModel", {
                            text: userFolder,
                            leaf: false,
                            children: [ childCfg ]
                        }));
                    }
                }

                function submit()
                {
                    if (!html || !fileName)
                    {
                        Utils.alert('Invalid file saving parameters');
                        return;
                    }
                
                    var mask = ToolkitUtils.mask(he, 'Saving document');
                    Ext.Ajax.request(
                    {
                        url: 'System/UploadFile',
                        method: 'POST',
                        success: function(response) 
                        {
                            ToolkitUtils.unmask(mask);
                            if (he.addMode === true)
                            {
                                var tree = he.up('help').down('treepanel');
                                var store = cmb.getStore();
                                var rec = Ext.create('Ext.data.Model', {
                                    file: fileName,
                                    dsc: fileTitle
                                });
                                store.add(rec);
                                cmb.ignoreChangeEvent = true;
                                cmb.setSelection(rec);
                                delete cmb.ignoreChangeEvent;
                                cmb.setHidden(false);
                                cmb.prev().setHidden(true);
                                //
                                // Add to doc tree
                                //
                                addToTree(tree);
                            }
                            delete he.addMode;
                            Utils.toast('Successfully saved document');
                        },
                        failure: function(response, opts) 
                        {
                            ToolkitUtils.unmask(mask);
                            delete he.addMode;
                            Utils.handleAjaxError(response, opts, 'Could not save document');
                        },
                        params:
                        {
                            file: btoa(html),
                            filename: fileName
                        }
                    });
                }
                        
                if (!he.addMode)
                {
                    if (!he.userDoc) {
                        var msg = "Saving this document will overwrite the current version on the server.<br><br>" +
                                "The development team should be informed of changes so that the source " +
                                "repository can be updated.<br><br>Proceed?";
                        Utils.promptYesNo(msg, function(mbtn) {
                            if (mbtn == "yes") { 
                                submit();
                            }
                        }, this);
                    }
                    else {
                        submit();
                    }
                }
                else
                {
                    Ext.create('Ext.ux.tinymce.InputWinOne',
                    {
                        title:'Enter the title for this document',
                        ctl: he,
                        fieldlabel: 'Document Title',
                        fieldValue: '',
                        onSaveClick: function(v) // scope editor panel
                        {
                            var userFolder = 'Docs_by_';
                            fileTitle = v;
                            fileName = 'resources/doc/user/' + userFolder + '/' + v.replace(/ /g, '_') + '.html';
                            submit();
                        }
                    }).show();
                }
            }
		}]
	}],
    
	items: [
	{
		xtype: 'tinymceeditor',
		flex: 1,
		tinyMceCfg:
		{
			convert_urls: false,
			allow_script_urls: true
		}
	}]
	
});
