(function()
{
    var App = function()
    {
        window.addEventListener('DOMContentLoaded', function()
        {
            $('.AppView > div').each(function()
            {
                if(window[this.id].init)
                {
                    window[this.id].init();
                }
            });

            this.App.init();
        });

        this.user = undefined;
        this.views = {};
        this.previousView = undefined;
    };

    App.prototype.init = function()
    {
        var that = this;
        this.checkLogin(function()
        {
            var url = that.user.profile.photo;
            $('.Footer .ProfilePhoto img').attr('src', url);

            $('.App').show();
            $('#Login').remove();
            that.openView('MessageView');
        });
    };

    App.prototype.openView = function(id, data)
    {
        if(window[id])
        {
            $('.View').hide();
            $('#' + id).show();
            window[id].open(data);

            this.previousView = id;
        }
    };

    App.prototype.openPreviousView = function()
    {
        var id = this.previousView;
        if(this.previousView && window[this.previousView])
        {
            $('.View').hide();
            $('#' + id).show();
            window[id].open();
        }
    };

    App.prototype.checkLogin = function(callback)
    {
        if(this.user)
        {
            callback();
        }
        else
        {
            var that = this;
            $.ajax('/api/users/me').done(function(user)
            {
                that.user = user;
                callback();
            }).fail(function(err)
            {
                if(err.status == 401)
                {
                    Login.open();
                }
                else
                {
                    console.error(err);
                }
            });
        }
    };

    window.App = new App();
})();