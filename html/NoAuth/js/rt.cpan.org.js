jQuery(function(){
    jQuery("select[name=UpdateType] option[value=private]").remove();

    /* This is redundant, thanks to the
     * /Ticket/Elements/ShowTransaction/ModifyDisplay callback.  It doesn't
     * hurt to leave it in place, however, and will catch if the callback stops
     * working. */
    jQuery("#ticket-history a.comment-link").each(function(){
        var parent = this.parentNode;
        parent.removeChild(this);
        parent.innerHTML = parent.innerHTML.replace(/\[\]/,"");
    });
});
