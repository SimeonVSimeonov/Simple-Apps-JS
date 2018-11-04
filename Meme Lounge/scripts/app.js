const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        //welcome
        this.get('index.html',handlers.getWelcomePage);
        this.get('#/home',handlers.getWelcomePage);

        //login register logout
        this.get('#/logout', handlers.logoutUser);
        this.get('#/login', handlers.renderLoginPage);
        this.get('#/register', handlers.renderRegisterPage);
        this.post('#/login', handlers.loginUser);
        this.post('#/register', handlers.registerUser);

        //home screen all memes
        this.get('#/memes', handlers.getAllMemes);
        
        //my memes
        this.get('#/myProfile', handlers.getMyProfile);

        //memes action
        this.get('#/create', handlers.createRenderMeme);
        this.get('#/edit/:memeId', handlers.editRenderMeme);
        this.post('#/create', handlers.createMeme);
        this.post('#/edit', handlers.editMeme);
        this.get('#/delete/:memeId', handlers.deleteMeme);

        //get details
        this.get('#/check/:memeId', handlers.getMemeDetails);
        this.get('#/user/:userId', handlers.getUserById);

    });
    app.run();
});