(function()
{
    var Footer = function()
    {
        window.addEventListener('DOMContentLoaded', function()
        {
            this.Footer.init();
        });
    };

    Footer.prototype.init = function()
    {
        $('.Footer > span').on('touchstart', function()
        {
            var viewName = $(this).attr('data-view');
            App.openView(viewName);
        });
    };

    window.Footer = new Footer();
})();