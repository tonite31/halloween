(function()
{
    var App = function()
    {
        window.addEventListener('DOMContentLoaded', function()
        {
            window.App.init();
        });

        this.data = {};
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
        var that = this;
        $.ajax('/api/profile/me').done(function(result)
        {
            that.data.user = result;

            callback();

        }).fail(function(err)
        {
            if(err.status == 401)
            {
                window.login = function()
                {
                    this.init();
                };

                LoginView.init();
            }
            else
            {
                console.error(err);
            }
        });
    };

    window.App = new App();
})();