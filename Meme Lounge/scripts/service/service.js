let memes = (() => {

    function getAllMemes() {
        let endpoint = `memes?query={}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata',endpoint,'kinvey')
    }

    function createMeme(title, description, imageUrl,creator, isAuthor) {
        let data = {title, description, imageUrl,creator, isAuthor};
        let endpoint = 'memes';
        return remote.post('appdata', endpoint, 'kinvey', data);

    }

    function getMyProfile(username) {
        let endpoint = `memes?query={"creator":"${username}"}&sort={"_kmd.ect": -1}`;
        return remote.get('appdata', endpoint, 'kinvey')
    }

    function getMemeById(meme_id) {
        const endpoint = `memes/${meme_id}`;
        return remote.get('appdata', endpoint, 'kinvey')
    }
    
    function getUserById(user_id) {
        const endpoint = `userId`;
        return remote.get('appdata', endpoint,'kinvey')
    }



    function editMeme(meme_id, title, description, imageUrl,creator, isAuthor) {
        let data = {meme_id, title, description, imageUrl,creator, isAuthor};
        let endpoint = `memes/${meme_id}`;
        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deleteMeme(meme_id) {
        const endpoint = `memes/${meme_id}`;
        return remote.remove('appdata', endpoint,'kinvey');
    }

    // function post (module, endpoint, auth, data) {
    //     let obj = makeRequest('POST', module, endpoint, auth);
    //     if (data) {
    //         obj.data = data;
    //     }
    //     return $.ajax(obj);
    // }

    return{getAllMemes, createMeme, getMyProfile, getMemeById, editMeme, deleteMeme, getUserById}
})();