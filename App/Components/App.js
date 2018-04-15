(function()
{
    var App = function()
    {
        window.addEventListener('DOMContentLoaded', function()
        {
            this.App.init();
        });

        this.user = undefined;
        this.views = {};
    };

    App.prototype.init = function()
    {
        var that = this;
        $('.AppView > div').each(function()
        {
            var targetView = this;
            if(window[this.id].init)
            {
                window[this.id].init(function()
                {
                    that.views[targetView.id] = targetView;
                    targetView.parentElement.removeChild(this);
                });
            }
        });

        this.checkLogin(function()
        {
            $('#Login').remove();
            $('.App').show();
        });
    };

    App.prototype.openView = function(id)
    {
        $('.AppView').html('');
        $('.AppView').append(this.views[id]);
        window[id].open();
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

            Login.init();
        }
    };

    window.App = new App();
})();