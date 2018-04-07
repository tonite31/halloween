(function()
{
    var LoginView = function()
    {

    };

    LoginView.prototype.init = function()
    {
        $('.LoginView').show();
        this.bind();
    };

    LoginView.prototype.bind = function()
    {
        $('#LoginView #login').on('click', function()
        {
            $('#LoginView .LoginViewFrame').attr('src', '/login/provider').show();
        });
    };

    window.LoginView = new LoginView();
})();