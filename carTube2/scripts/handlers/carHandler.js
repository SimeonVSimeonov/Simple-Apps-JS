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

handlers.getAllCars = function (ctx) {
    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }
    ctx.username = sessionStorage.getItem('username');

    cars.getAllCars()
        .then((cars) => {
            ctx.isAuth = auth.isAuth();
            ctx.cars = cars;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/cars/render/allCars.hbs')
            })
        })
};

handlers.createRenderCar = function (ctx) {
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
        this.partial('./templates/cars/create.hbs')
    })
};

handlers.createCar = function (ctx) {

    ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let title = ctx.params.title;
    let description = ctx.params.description;
    let model = ctx.params.model;
    let brand = ctx.params.brand;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let price = Number(ctx.params.price);
    let fuelType = ctx.params.fuelType;
    let isAuthor = true;
    let seller = sessionStorage.getItem('username');

    if (title.length > 33) {
        notify.showError('Title must be below 33 characters long!');
    } else if (description.length < 30) {
        notify.showError('Description must be at least 30 characters long!');
    } else if (description.length > 450) {
        notify.showError('Description must not be longer than 450 symbols!');
    } else if (brand.length > 11) {
        notify.showError('Brand must be below 11 characters long!');
    } else if (model.length > 11) {
        notify.showError('Model must be below 11 characters long!');
    } else if (model.length < 4) {
        notify.showError('Model must be bat least 4 characters long!');
    } else if (fuelType.length > 11) {
        notify.showError('Fuel type must be below 11 characters long!');
    } else if (year.length < 4 || year.length > 4) {
        notify.showError('Year must be 4 characters long!');
    } else if (price > 1000000) {
        notify.showError('Price must be below 1 000 000 $!');
    } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    } else {
        cars.createCar(title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller)
            .then(() => {
                ctx.isAuth = auth.isAuth();
                notify.showInfo('List created');
                ctx.redirect('#/cars')
            }).catch(notify.handleError);
    }
};

handlers.getMyCars = function (ctx) {

    if (!auth.isAuth()) {
        ctx.redirect('#/home');
        return;
    }

    // ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let username = ctx.username;

    cars.getMyCars(username)
        .then((cars) => {
            ctx.isAuth = auth.isAuth();
            ctx.cars = cars;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/cars/render/myCars.hbs')
            })
        }).catch(notify.handleError);
};

handlers.editRenderCar = function (ctx) {
    let car_id = ctx.params.carId;
    //console.log(car_id);
    ctx.isAuth = auth.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/cars/edit.hbs')
    });

    cars.getCarById(car_id)
        .then((car) => {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.car = car;
            //console.log(car);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/cars/edit.hbs')
            });
        }).catch(notify.handleError)
};

handlers.editCar = function (ctx) {

    let car_id = ctx.params.carId;
    ctx.username = sessionStorage.getItem('username');

    let title = ctx.params.title;
    let description = ctx.params.description;
    let model = ctx.params.model;
    let brand = ctx.params.brand;
    let year = ctx.params.year;
    let imageUrl = ctx.params.imageUrl;
    let price = Number(ctx.params.price);
    let fuelType = ctx.params.fuelType;
    let isAuthor = true;
    let seller = sessionStorage.getItem('username');

    if (title.length > 33) {
        notify.showError('Title must be below 33 characters long!');
    } else if (description.length < 30) {
        notify.showError('Description must be at least 30 characters long!');
    } else if (description.length > 450) {
        notify.showError('Description must not be longer than 450 symbols!');
    } else if (brand.length > 11) {
        notify.showError('Brand must be below 11 characters long!');
    } else if (model.length > 11) {
        notify.showError('Model must be below 11 characters long!');
    } else if (model.length < 4) {
        notify.showError('Model must be bat least 4 characters long!');
    } else if (fuelType.length > 11) {
        notify.showError('Fuel type must be below 11 characters long!');
    } else if (year.length < 4 || year.length > 4) {
        notify.showError('Year must be 4 characters long!');
    } else if (price > 1000000) {
        notify.showError('Price must be below 1 000 000 $!');
    } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        notify.showError('Image url should be valid (starting with either http, or https)!');
    } else {
        cars.editCar(car_id, title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller)
            .then(() => {
                ctx.isAuth = auth.isAuth();
                notify.showInfo(`List ${title} edited`);
                ctx.redirect('#/cars')
            }).catch(notify.handleError);
    }

};

handlers.getCarDetails = function (ctx) {
    let car_id = ctx.params.carId;
    ctx.username = sessionStorage.getItem('username');

    cars.getCarById(car_id)
        .then((car) => {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.car = car;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/cars/details.hbs')
            })
        }).catch(notify.handleError);
};

handlers.deleteCar = function (ctx) {
    if(!auth.isAuth()){
        ctx.redirect('#/home');
        return;
    }

    let car_id = ctx.params.carId;

    cars.deleteCar(car_id)
        .then(()=>{
            notify.showInfo('Listing deleted');
            ctx.redirect('#/cars')
        })
        .catch(notify.handleError);
};
