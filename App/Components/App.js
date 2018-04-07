(function()
{
    var App = function()
    {
        window.addEventListener('DOMContentLoaded', function()
        {
            window.App.init();
        });
    };

    App.prototype.init = function()
    {
        this.checkLogin(function()
        {
            $('#LoginView').remove();
            $('.App').show();
        });
    };

    App.prototype.checkLogin = function(callback)
    {
        var isLogin = true;
        if(isLogin)
        {
            callback();
        }
        else
        {
            window.login = function()
            {
                this.init();
            }.bind(this);

            LoginView.init();
        }
    };

    window.App = new App();
})();