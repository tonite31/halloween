(function()
{
    var Login = function()
    {

    };

    Login.prototype.init = function()
    {
        $('.Login').show();
        this.bind();
    };

    Login.prototype.bind = function()
    {
        $('#Login #login').on('click', function()
        {
            $('#Login .LoginFrame').attr('src', '/login/provider').show();
        });
    };

    window.Login = new Login();
})();