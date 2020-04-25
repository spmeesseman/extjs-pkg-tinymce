
Ext.define('Ext.ux.tinymce.InputWinOne', 
{
    extend: 'Ext.window.Window',
    xtype: 'tinymceinputwinone',
    
    require: [
        
    ],
    
    resizable:false,
    modal:true,
    stateful:false,
    plain:true,
    border:false,
    title:'Add New',
    iconCls: 'far fa-edit',
    reference: 'inputWin',
    deferred: null,

    style:
    {
    	padding: '5px 5px 5px 5px'
    },
    width: 450,
    
    config:
    {
    	ctl: null,
    	fieldlabel: 'Field 1',
    	maskinput: false,
    	customparam: null,
    	onSaveClick: Ext.emptyFn,
        onCloseClick: Ext.emptyFn,
        textArea: false
    },
    
    publishes:
    {
        textArea: true
    },

    layout: 
    {
        type: 'form',
        align : 'stretch',
        pack  : 'start'
    },
    
    buttons: [
    {
        xtype: 'button',
        iconCls: 'far fa-times',
        text: 'Cancel',
        handler: function(btn, eopts)
        {
            var win = btn.up('inputwinone'); 
            win.hide();
            if (win.onCloseClick) {
                Ext.Function.pass(win.onCloseClick, [], win.ctl)();
            }
            if (win.deferred) {
                win.deferred.resolve(false);
                win.deferred.destroy();
            }
            win.close();
            win.destroy();
        }
    },
    {
        xtype: 'button',
        iconCls: 'far fa-check',
        text: 'Submit',
        handler: function(btn, eopts)
        {
            var win = btn.up('inputwinone');
            var value = null;
            if (!win.getTextArea()) {
                value = win.down('textfield').getValue();
            }
            else {
                value = win.down('textarea').getValue();
            }
            win.hide();
            if (win.onSaveClick) {
                Ext.Function.pass(win.onSaveClick, [value], win.ctl)();
            }
            if (win.deferred) {
                win.deferred.resolve(value);
                win.deferred.destroy();
            }
            win.close();
            win.destroy();
        }
    }],
    
    defaults:
    {
        labelWidth: 60,
        anchor: '97%'
    },

    items: [
    {
        xtype: 'textfield',
        bind: {
            hidden: '{inputWin.textArea}'
        },
        listeners:
        {
        	beforerender: function(txt)
        	{
        		var win = txt.up('inputwinone'); 
        		txt.fieldLabel = win.fieldlabel;
        		if (win.maskinput == true)
        		{
                    txt.inputType = 'password';
        		}
        	},
        	
            afterrender: function(txt, eopts)
            {
                txt.focus(true);
            },
            
            specialkey: function(txt, e)
            {
                if (e.getKey() == e.ENTER) 
                {
                    var win = txt.up('inputwinone');
                    if (win.onSaveClick)
                    {
                        Ext.Function.pass(win.onSaveClick, [win, txt.getValue()], win.ctl)();
                    }
                    win.close();
                }
            }
        }
    },
    {
        xtype: 'textarea',
        grow: true,
        minHeight: 75,
        bind: {
            hidden: '{!inputWin.textArea}'
        },
        enableKeyEvents: true,
        listeners:
        {
        	beforerender: function(txt)
        	{
        		var win = txt.up('inputwinone'); 
        		txt.fieldLabel = win.fieldlabel;
        	},
        	
            afterrender: function(txt, eopts)
            {
                txt.focus(true);
            },
            
            specialkey: function(txt, e)
            {
                if (e.getKey() == e.ENTER) 
                {
                    var win = txt.up('inputwinone');
                    if (win.onSaveClick)
                    {
                        Ext.Function.pass(win.onSaveClick, [win, txt.getValue()], win.ctl)();
                    }
                    win.close();
                }
            }
        }
    }],

    getUserInput: async function()
    {
        var me = this;
        me.deferred = new Ext.Deferred();
        me.show();
        return me.deferred;
    },

    statics:
    {
        getInput: function(tfpRec)
        {
            var instance = Ext.create(
            {
                xtype: "inputwinone"
            });
            instance.deferred = new Ext.Deferred();
            instance.show();
            return instance.deferred;
        }
    }

    
});
