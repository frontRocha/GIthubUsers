"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let input = document.getElementById('input');
let button = document.getElementById('button');
let res = document.getElementById('res');
class User {
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
        <div class='bottom'> 
         <img src="${this.img}"/>
            <p>seguidores: ${this.followers}<p>
            <p>seguindo: ${this.repo}</p>
            <p>empresa: ${!this.company ? 'não informado' : this.company}</p>
            <p>localidade: ${!this.place ? 'não informado' : this.place}</p>
        </div>`;
    }
}
const buscarRepos = () => __awaiter(void 0, void 0, void 0, function* () {
    res.innerHTML = '<span>carrengado, aguarde...<span>';
    const response = yield fetch(`https://api.github.com/users/${input.value}`);
    const data = yield response.json();
    const values = new User("./githubImage.PNG", data.avatar_url, data.login, data.followers, data.following, data.public_repos, data.company, data.location);
    if (data.login == undefined) {
        res.innerHTML = '<span>!!Usuário não encontrado!!<span>';
        setTimeout(() => {
            res.innerHTML = '';
        }, 3000);
        return;
    }
    res.innerHTML = values.data();
});
button === null || button === void 0 ? void 0 : button.addEventListener('click', buscarRepos);
