let input = document.getElementById('input') as HTMLInputElement
let button = document.getElementById('button')
let res = document.getElementById('res') as HTMLDivElement

class User {
    githubImg: string
    img: HTMLImageElement
    name: string
    followers: number
    following: number
    repo: number
    company: string
    place: string
    constructor(githubImg: string, img: HTMLImageElement, name: string, followers: number, following: number, repo: number, company: string, place: string) {
        this.githubImg = githubImg
        this.img = img
        this.name = name
        this.followers = followers
        this.following = following
        this.place = place
        this.repo = repo
        this.company = company
        this.place = place
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
        </div>`
    }
}

const buscarRepos = async () => {
    res.innerHTML = '<span>carrengado, aguarde...<span>'
    const response = await fetch(`https://api.github.com/users/${input.value}`)
    const data = await response.json()
    const values = new User("https://raw.githubusercontent.com/estudantedehtml/GIthubUsers/master/dist/githubImage.png", data.avatar_url, data.login, data.followers, data.following, data.public_repos, data.company, data.location)

    if (data.login == undefined) {
        res.innerHTML = '<span>!!Usuário não encontrado!!<span>'
        setTimeout(() => {
            res.innerHTML = 'carregando, aguarde...'
        }, 3000)
        return
    }

    res.innerHTML = values.data()
}

button?.addEventListener('click', buscarRepos)

