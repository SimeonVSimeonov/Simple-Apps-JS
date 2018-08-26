$(document).ready(function () {

    // function convertDate(dateStr){
    //     let date = new Date(dateStr);
    //     const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //     return date.getDay() + ' ' + months[date.getMonth()];
    // }

    let app = Sammy('#container', function () {
        // include a plugin
        this.use('Handlebars', 'hbs');

        this.get('#/', function (ctx) {
            if (Auth.authToken()) {
                ctx.redirect('#/home');
            }
            else {
                ctx.redirect('#/login');
            }
        });

        this.get('#/login', function (ctx) {
            this.loadPartials({
                header: './templates/header.hbs'
            }).then(function () {
                ctx.auth = Auth.isAuth();
                ctx.username = Auth.username();
                this.partial('./templates/loginView.hbs');
            })
        });

        this.post('#/login', function (ctx) {
            const username = ctx.params.username;
            const password = ctx.params.pass;

            if (!username) {
                Notify.showError('Username cannot be empty!');
            }
            else if (!password) {
                Notify.showError('Password cannot be empty!');
            }
            else {
                RequestManager.login(username, password).then(function (res) {
                    Notify.showMessage(res);
                    ctx.redirect('#/home');
                }).catch(function (err) {
                    Notify.handleAjaxError(err);
                });
            }
        });
    });
    app.run('#/');
});

