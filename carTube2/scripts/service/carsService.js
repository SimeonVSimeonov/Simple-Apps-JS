let cars = (() => {

    function getAllCars() {
        let endpoint = `cars?query={}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata',endpoint,'kinvey')
    }

    function createCar(title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller) {
        let data = {title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller};
        let endpoint = 'cars';
        return remote.post('appdata', endpoint, 'kinvey', data);

    }

    function getMyCars(username) {
        let endpoint = `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function getCarById(car_id) {
        const endpoint = `cars/${car_id}`;
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function editCar(car_id, title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller) {
        let data = {title, description, model, brand, year, imageUrl, price, fuelType, isAuthor, seller};
        let endpoint = `cars/${car_id}`;
        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deleteCar(car_id) {
        const endpoint = `cars/${car_id}`;
        return remote.remove('appdata', endpoint,'kinvey');
    }

    // function post (module, endpoint, auth, data) {
    //     let obj = makeRequest('POST', module, endpoint, auth);
    //     if (data) {
    //         obj.data = data;
    //     }
    //     return $.ajax(obj);
    // }




    return{getAllCars, createCar, getMyCars, getCarById, editCar, deleteCar}
})();