(function()
{
    var Header = function()
    {

    };

    Header.prototype.init = function()
    {

    };

    Header.prototype.setTitle = function(title)
    {
        $('.AppTitle').text(title);
    };

    Header.prototype.setLeftButton = function(el)
    {
        if(!el)
        {
            $('<span></span>').insertBefore('.AppTitle').prev().remove();
        }
        else
        {
            $(el).insertBefore('.AppTitle').prev().remove();
        }
    };

    Header.prototype.setRightButton = function(el)
    {
        if(!el)
        {
            $('<span></span>').insertAfter('.AppTitle').next().remove();
        }
        else
        {
            $(el).insertAfter('.AppTitle').next().remove();
        }
    };

    window.Header = new Header();
})();