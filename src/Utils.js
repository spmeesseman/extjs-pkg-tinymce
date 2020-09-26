/**
 * @class Ext.ux.tinymce.Utils
 *
 * TinyMCE Utility Singleton
 * 
 */
Ext.define('Ext.ux.tinymce.Utils',
{
    alias: 'TinyMceUtils', 
    alternateClassName: 'TinyMceUtils',
    singleton: true,

    privates:
    {
        current_mask: null,
        current_masks: []
    },

    /**
     * @property {Function} logCustom
     */
    logCustom: null,
    /**
     * @property {Function} logValueCustom
     */
    logValueCustom: null,
    /**
     * @property {String} logTag
     */
    logTag: '[TinyMce]',
    /**
     * @property {String} logTagColor
     */
    logTagColor: '#6203FC',
    
    
    /**
     * @private
     * @param {String} msg 
     * @param {Number} lvl 
     */
    log: function(msg, lvl)
    {
        if (TinyMceUtils.logCustom) {
            TinyMceUtils.logCustom(msg, lvl, false, false, null, TinyMceUtils.logTag, TinyMceUtils.logTagColor);
        }
        else {
            console.log('%c' + TinyMceUtils.logTag, 'color: ' + TinyMceUtils.logTagColor, '', msg);
        }
    },
    

    /**
     * @private
     * @param {String} msg 
     * @param {Object|String|Array} value 
     * @param {Number} lvl 
     */
    logValue: function(msg, value, lvl)
    {
        if (TinyMceUtils.logValueCustom) {
            TinyMceUtils.logValueCustom(msg, value, lvl, false, false, TinyMceUtils.logTag, TinyMceUtils.logTagColor);
        }
        else {
            console.log('%c' + TinyMceUtils.logTag, 'color: ' + TinyMceUtils.logTagColor, '', msg, value);
        }
    },


    /**
     * @private
     * @param {Object} cmp 
     * @param {String} msg 
     * @param {Object} store 
     */
    mask: function(cmp, msg, store)
    {
        var me = this;
        var mask = null;
        
        if (!cmp) {
            return mask;
        }

        if (!msg) {
            msg = 'Loading...';
        }
        
        mask = new Ext.LoadMask(
        {
            target: cmp ? cmp : Ext.ComponentQuery.query('app-main')[0],
            msg: msg
        });
        
        if (mask)
        {
            mask.show();
            me.current_mask = mask;
        }

        return mask;
    },


    /**
     * @private
     * @param {Object} mask The return value from {@link #mask}
     */
    unmask: function(mask)
    {
        var me = this;
        //
        // Add try/catch - 
        // Reference ticket #1273:  Client Error - Cannot read property 'removeCls' of null
        // When calling hide(), this exception is randomly triggered.  Probably on windows that
        // are masked and closed around same time race condition??
        //
        try
        {
            if (mask && mask.target)
            {
                mask.hide();
                mask.destroy();
            }
            else if (me.current_mask && me.current_mask.target)
            {
                me.current_mask.hide();
                me.current_mask.destroy();
            }
        }
        catch(e) {}

        me.current_mask = null;
    }

});
