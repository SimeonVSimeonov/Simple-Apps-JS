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

        //home screen all cars
        this.get('#/cars', handlers.getAllCars);

        //my cars
        this.get('#/myCars', handlers.getMyCars);

        //cars action
        this.get('#/create', handlers.createRenderCar);
        this.get('#/edit/:carId', handlers.editRenderCar);
        this.post('#/create', handlers.createCar);
        this.post('#/edit', handlers.editCar);
        this.get('#/delete/:carId', handlers.deleteCar);

        //get details
        this.get('/details/:carId', handlers.getCarDetails);

    });
    app.run();
});