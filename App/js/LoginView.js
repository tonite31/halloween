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
            $(this).html('<span class="glyphicon glyphicon-repeat rotation"></span>');
            $('#LoginView .LoginViewFrame').attr('src', '/login/kakao').show();
        });
    };

    window.LoginView = new LoginView();
})();