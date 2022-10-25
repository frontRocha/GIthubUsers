"use strict";
let input = document.getElementById('input');
let button = document.getElementById('button');
let res = document.getElementById('res');
class User {
    githubImg;
    img;
    name;
    followers;
    following;
    repo;
    company;
    place;
    constructor(githubImg, img, name, followers, following, repo, company, place) {
        this.githubImg = githubImg;
        this.img = img;
        this.name = name;
        this.followers = followers;
        this.following = following;
        this.repo = repo;
        this.company = company;
        this.place = place;
    }
    data() {
        return `
        <div class="top">
            <img src='${this.githubImg}'/>
            <h3>${this.name}</h3>
        </div>
        <img src="${this.img}"/>
        <div class='bottom'>
            <p>seguidores: ${this.followers}<p>
            <p>seguindo: ${this.repo}</p>
            <p>empresa: ${this.company}</p>
            <p>localidade: ${this.place}</p>
        </div>`;
    }
}
const buscarRepos = async () => {
    res.innerHTML = '<span>carrengado, aguarde...<span>';
    const response = await fetch(`https://api.github.com/users/${input.value}`);
    const data = await response.json();
    const values = new User("a-removebg-preview.PNG", data.avatar_url, data.login, data.followers, data.following, data.public_repos, data.company, data.location);
    if (data.login == undefined) {
        res.innerHTML = '<span>!!Usuário não encontrado!!<span>';
        setTimeout(() => {
            res.innerHTML = '';
        }, 3000);
        return;
    }
    res.innerHTML = values.data();
};
button?.addEventListener('click', buscarRepos);
