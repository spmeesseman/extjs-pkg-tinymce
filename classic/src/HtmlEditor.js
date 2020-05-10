Ext.define('Ext.ux.tinymce.HtmlEditor',
{
    extend: 'Ext.panel.Panel',
    xtype: 'tinymcehtmleditor',
   
    requires: [
        'Ext.data.ArrayStore',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.ux.tinymce.TinyMceEditor'
    ],
              
	border: false,
    reference: 'htmleditorRef',
    referenceHolder: true,

    saved: true,
    
	config:
    {
        saveCb: Ext.emptyFn,
        fileData: undefined,
        defaultValue: undefined,
        rawFileApiUrl: undefined,
        rawFileApiParams: {}
    },

    publishes:
    {
        fileData: true,
        defaultValue: true
    },

    layout: 
    {
        type: 'vbox',
        align: 'stretch',
        pack : 'start'
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
                change: function(cmb, newvalue)
                {
                    var he = cmb.up('tinymcehtmleditor');
                    var retries = 0;

                    if (!he || !newvalue || cmb.ignoreChangeEvent === true) {
                        return;
                    }

                    function setEditorValue(value)
                    {
                        var tmce = he.down('tinymceeditor');
                        if (tmce) // && tmce.isEditorLoaded())
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

                    Ext.Ajax.request(Ext.apply({
                        url: he.rawFileApiUrl || newvalue + '?rnd=' + Utils.getRandomNumber(),
                        method: 'GET',
                        success: function(response) {
                            setEditorValue(response.responseText);
                        }
                    }, he.rawFileApiUrl ? { params: he.rawFileApiParams } : {}));
                }
            }
        },
        '->',
        {
            text: 'Save',
            iconCls: 'far fa-save',
            handler: function(btn)
            {
                var edr = btn.up('tinymcehtmleditor');
                if (edr.saveCb && edr.saveCb instanceof Function)
                {
                    var tmce = edr.down('tinymceeditor'),
                        cmb = btn.prev('combo'),
                        path = cmb.getValue(),
                        content = tmce.getValue();
                    edr.saveCb(path, content, edr);
                    edr.saved = true;
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
    }],
    
    listeners:
    {
        beforeclose: function(panel, eOpts)
        {
            if (panel.saved === false)
            {
                Ext.Msg.confirm('Save', 'Save changes?', function(button)
                {
                    panel.saved = true;
                    var btn = panel.down('button[text=Save]');
                    btn.disable();
                    if (button == 'yes') {
                        btn.fireEvent('click', btn);
                    }
                    panel.close();
                });
                return false;
            } 
            return true;
        }
    }
	
});
