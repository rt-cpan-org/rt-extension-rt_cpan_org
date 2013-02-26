jQuery(function(){
    jQuery("select[name=UpdateType] option[value=private]").remove();
    jQuery("#ticket-history a.comment-link").each(function(){
        var parent = this.parentNode;
        parent.removeChild(this);
        parent.innerHTML = parent.innerHTML.replace(/\[\]/,"");
    });
});
