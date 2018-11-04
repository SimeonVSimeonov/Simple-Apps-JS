$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function () {
            this.redirect('#/home');
            return;
        });

        this.get('#/home', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }
            ctx.username = sessionStorage.getItem('username');
            commonPartials(ctx).then(function () {
                ctx.partials = this.partials;
                service.getChirps().then(data => {
                    ctx.chirps = data;
                    ctx.partial('./templates/home.hbs')
                });
            });
        });

        this.get('#/feed', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/login');
                return;
            }
            commonPartials(ctx).then(function () {
                ctx.partials = this.partials;
                service.getChirpsByUser(sessionStorage.getItem("username")).then(data => {
                    ctx.chirps = data;
                    ctx.partial('./templates/home.hbs')
                });
            });
        });

        this.get('#/discover', function (ctx) {
           if(!auth.isAuth()){
               ctx.redirect('#/login');
               return;
           }
           commonPartials(ctx).then(function () {
                ctx.partials = this.partials;
                service.getAllUsers().then(users => {
                    ctx.users = users;

                    ctx.partial('./templates/discover.hbs')
                });
           });
        });

        this.get('#/')

        this.get('#/login', function () {
            commonPartials(this)
                .then(function () {
                    this.partial('./templates/login.hbs')
                })
        });

        this.post('#/login', function (ctx) {
            service.login(ctx.params.username, ctx.params.password)
                .then(res => {
                    ctx.redirect('#/home');
                    notify.showInfo('Login Successful');
                }).catch(notify.handleError);
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
            .then(() => {
                sessionStorage.clear();
                notify.showInfo('Logged out successfully');
                ctx.redirect('#/login')
            }).catch(notify.handleError);

        });

        this.get('#/register', function () {
            commonPartials(this)
                .then(function () {
                    this.partial('./templates/register.hbs')
                })
        });

        this.post('#/register', function (ctx) {
            service.register(ctx.params.username, ctx.params.password, ctx.params.repeatPass)
                .then(res => {
                    ctx.redirect('#/home');
                    notify.showInfo('Registration Successful');
                }).catch(notify.handleError);
        })
    }).run();

    function commonPartials(ctx) {
        return ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            menu: './templates/common/menu.hbs',
        });
    }
});