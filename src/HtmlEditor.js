Ext.define('Ext.ux.tinymce.HtmlEditor',
{
    extend: 'Ext.panel.Panel',
    xtype: 'tinymcehtmleditor',
   
    requires: [
        'Ext.ux.tinymce.TinyMceEditor'
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
            xtype: 'combo',
            displayField: 'dsc',
            valueField: 'file',
            editable: false,
            forceSelection: true,
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
                    var he = cmb.up('tinymcehtmleditor');
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
            text: 'Save',
            iconCls: 'far fa-save',
            handler: function(btn)
            {
				var he = btn.up('tinymcehtmleditor');
				var tmce = he.down('tinymceeditor');
                var cmb = btn.prev('combo');
                var fileName = cmb.getValue();

				var html = tmce.getValue();

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
                            Utils.toast('Successfully saved document');
                        },
                        failure: function(response, opts) 
                        {
                            ToolkitUtils.unmask(mask);
                            Utils.handleAjaxError(response, opts, 'Could not save document');
                        },
                        params:
                        {
                            file: btoa(html),
                            filename: fileName
                        }
                    });
                }
                        
                var msg = "Saving this document will overwrite the current version on the server.<br><br>" +
                        "The development team should be informed of changes so that the source " +
                        "repository can be updated.<br><br>Proceed?";
                Utils.promptYesNo(msg, function(mbtn) {
                    if (mbtn == "yes") { 
                        submit();
                    }
                }, this);
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
