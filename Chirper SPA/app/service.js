let service = (() => {

    //localStorage.setItem('subscriptions', JSON.stringify(['vako', 'Tacito']));

    async function login(username, password) {
        const data = await auth.login(username, password);
        auth.saveSession(data);
    }

    async function register(username, password, repeatPass) {
        if(password !== repeatPass){
            throw new Error("Password don't match!")
        }
        const data = await auth.register(username, password, repeatPass);
        auth.saveSession(data);
    }

    function getChirps() {

        let subs = sessionStorage.getItem('subscriptions');
        return remote.get('appdata', `chirps?query={"author":{"$in": ${subs}}}&sort={"_kmd.ect": 1}`)
    }

    function getChirpsByUser(username) {
        return remote.get('appdata', `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`)
    }

    async function countChirps(username) {
        return (await getChirpsByUser(username)).length;
    }

    function getAllUsers() {
        return remote.get('user', '')
    }

    async function countFollowing() {
        const username = sessionStorage.getItem('username');
        return (await remote.get('user', `?query={"username":"${username}"}`))[0].subscriptions.length;
    }

    async function countFollowers() {
        const username = sessionStorage.getItem('username');
        return (await remote.get('user', `?query={"subscriptions":"${username}"}`)).length;
    }
    
    function createChirp(text) {
        let chirp = {
            author: sessionStorage.getItem('username'),
            text
        };
        return remote.post('appdata', 'chirps','', chirp)
    }
    
    function deleteChirp(id) {
        return remote.remove('appdata', 'chirps/' + id);
    }

    async function follow(targetUser) {
        const id = sessionStorage.getItem('id');
        const subscriptions = (await remote.get('user', id)).subscriptions || [];
        subscriptions.push(targetUser);
        try{
            const res = await remote.update('user', id, '', {subscriptions});
            sessionStorage.setItem('subscriptions', JSON.stringify(res.subscriptions));
        }catch (e) {
            alert(e.message);
        }

    }

    async function unFollow(targetUser) {
        const id = sessionStorage.getItem('id');
        let subscriptions = (await remote.get('user', id)).subscriptions || [];
        subscriptions = subscriptions.filter(u => u !== targetUser);
        try{
            const res = await remote.update('user', id, '', {subscriptions});
            sessionStorage.setItem('subscriptions', JSON.stringify(res.subscriptions));
        }catch (e) {
            alert(e.message);
        }

    }



    return{

        getChirps,
        login,
        createChirp,
        deleteChirp,
        getChirpsByUser,
        countChirps,
        getAllUsers,
        countFollowing,
        countFollowers,
        follow,
        unFollow,
        register

    }

})();

// $(() => {
//    $("#btnLogin").click((e) => {
//        e.preventDefault();
//       const username = $("#formLogin").find("input[name=username]").val();
//       const password = $("#formLogin").find("input[name=password]").val();
//
//       auth.login(username,password).then(res => {
//           console.log(res);
//       })
//    })
// });