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

    jQuery("input[data-autocomplete=Queues]").each(function() {
        var input = jQuery(this);
        var opts  = {
            source: <% RT->Config->Get('WebPath') |n,j%>
                    + "/Helpers/Autocomplete/Queues?max=20"
        };

        if (input.attr("data-autocomplete-params") != null)
            opts.source = opts.source + "&" + input.attr("data-autocomplete-params");

        // Auto-submit once a queue is chosen
        if (input.attr("data-autocomplete-autosubmit")) {
            opts.select = function( event, ui ) {
                jQuery(event.target).val(ui.item.value);
                jQuery(event.target).closest("form").submit();
            };
        }

        input.autocomplete(opts);
    });

    // XXX TODO: Support users as well
});
