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
        input.attr('placeholder', RT.I18N.Catalog.module_or_dist);
        input.addClass('form-control'); // RT 5.0.1 lacks this class
        var opts = {
            minLength: 2,
            delay: 100
        };
        var rt_source = RT.Config.WebPath + "/Helpers/Autocomplete/Queues?max=20";

        if (input.attr("data-autocomplete-params") != null)
            rt_source += "&" + input.attr("data-autocomplete-params");

        // Auto-submit once a queue is chosen
        if (input.attr("data-autocomplete-autosubmit")) {
            opts.select = function( event, ui ) {
                jQuery(event.target).val(ui.item.value);
                var form = jQuery(event.target).closest("form");
                form.find('input[name=QueueChanged]').val(1);
                form.submit();
            };
        }

        var current_request;
        opts.source = function( request, response ) {
            var this_request;

            if (current_request)
                current_request.abort();

            if (/:/.test(request.term)) {
                // Adaptive autocomplete!  If the term contains a colon, look
                // for modules and map to distributions via metacpan.
                this_request = current_request = jQuery.ajax({
                    url: "https://fastapi.metacpan.org/v1/search/autocomplete",
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function( data ) {
                        if (!data || data.timed_out || !data.hits || this_request !== current_request)
                            return;

                        // cancelled requests when switching to the other
                        // source make .ui-autocomplete-loading live forever
                        input.removeClass('ui-autocomplete-loading');
                        response( jQuery.map( data.hits.hits, function( item ) {
                            return {
                                label: item.fields.documentation,
                                value: item.fields.distribution,
                                module: true
                            }
                        }));
                    }
                });
            } else {
                // Otherwise, look for distributions (queues) on rt.cpan.org.
                this_request = current_request = jQuery.ajax({
                    url: rt_source,
                    dataType: "json",
                    data: {
                        term: request.term
                    },
                    success: function( data ) {
                        if (data && this_request === current_request) {
                            // cancelled requests when switching to the other
                            // source make .ui-autocomplete-loading live forever
                            input.removeClass('ui-autocomplete-loading');
                            response(data);
                        }
                    }
                });
            }
        };

        input.autocomplete(opts).data("autocomplete")._renderItem = function(ul, item) {
            var rendered = jQuery("<a/>");

            if (item.module) {
                rendered.html(
                      rendered.text(item.label).html()
                    + "<small> in "
                    + rendered.text(item.value).html()
                    + "</small>"
                );
            } else {
                rendered.text( item.label );
            }

            return jQuery("<li/>")
                .data( "item.autocomplete", item )
                .append( rendered )
                .appendTo( ul );
        };
    });

    // XXX TODO: Support users as well
});
