handlers.getWelcomePage = function (ctx) {
    ctx.isAuth = sessionStorage.getItem('authtoken');
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/home.hbs');
    });
};

handlers.getAllMemes = function (ctx) {
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    ctx.username = sessionStorage.getItem('username');

    memes.getAllMemes()
        .then((memes) => {
            ctx.isAuth = auth.isAuth();
            ctx.memes = memes;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/memes/render/allMemes.hbs')
            })
        })
};

handlers.createRenderMeme = function (ctx) {
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return
    }

    ctx.username = sessionStorage.getItem('username');
    ctx.isAuth = auth.isAuth();

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/memes/create.hbs')
    })
};

handlers.createMeme = function (ctx) {

    ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageUrl = ctx.params.imageUrl;
    let isAuthor = true;
    let creator = sessionStorage.getItem('username');

    if (title.length > 33) {
        notify.showError('Title must be below 33 characters long!');
    } else if (description.length > 450) {
        notify.showError('Description must not be longer than 450 symbols!');
    } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    } else {
        memes.createMeme(title, description, imageUrl,creator, isAuthor)
            .then(() => {
                ctx.isAuth = auth.isAuth();
                notify.showInfo('List created');
                ctx.redirect('#/memes')
            }).catch(notify.handleError);
    }
};

handlers.getMyProfile = function (ctx) {

    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }

    ctx.username = sessionStorage.getItem('username');
    let username = ctx.username;

    memes.getMyProfile(username)
        .then((user) => {
            ctx.isAuth = auth.isAuth();
            ctx.user = user;
            console.log(user);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/memes/render/myMemes.hbs')
            })
        }).catch(notify.handleError);
};

handlers.getUserById = function (ctx) {
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    ctx.username = sessionStorage.getItem('username');
    let user_id = ctx.params._id;
    console.log(user_id);
    memes.getUserById(user_id)

};

handlers.editRenderMeme = function (ctx) {
    let meme_id = ctx.params.memeId;
    ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/memes/edit.hbs')
    });

    memes.getMemeById(meme_id)
        .then((meme) => {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.meme = meme;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/memes/edit.hbs')
            });
        }).catch(notify.handleError)
};

handlers.editMeme = function (ctx) {

    let meme_id = ctx.params.memeId;
    ctx.username = sessionStorage.getItem('username');

    ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let title = ctx.params.title;
    let description = ctx.params.description;
    let imageUrl = ctx.params.imageUrl;
    let isAuthor = true;
    let creator = sessionStorage.getItem('username');


    if (title.length > 33) {
        notify.showError('Title must be below 33 characters long!');
    } else if (description.length > 450) {
        notify.showError('Description must not be longer than 450 symbols!');
    } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    } else {
        memes.editMeme(meme_id, title, description, imageUrl,creator, isAuthor)
            .then(() => {
                ctx.isAuth = auth.isAuth();
                notify.showInfo(`List ${title} edited`);
                ctx.redirect('#/memes')
            }).catch(notify.handleError);
    }

};

handlers.getMemeDetails = function (ctx) {
    let meme_id = ctx.params.memeId;
    ctx.username = sessionStorage.getItem('username');

    memes.getMemeById(meme_id)
        .then((meme) => {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.meme = meme;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/memes/details.hbs')
            })
        }).catch(notify.handleError);
};

handlers.deleteMeme = function (ctx) {
    if(!auth.isAuth()){
        ctx.redirect('#/home');
        return;
    }

    let meme_id = ctx.params.memeId;

    memes.deleteMeme(meme_id)
        .then(()=>{
            notify.showInfo('Listing deleted');
            ctx.redirect('#/memes')
        })
        .catch(notify.handleError);
};
