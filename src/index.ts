let input = document.getElementById('input') as HTMLInputElement
let button = document.getElementById('button')
let res = document.getElementById('res') as HTMLDivElement

interface inital {
    img: HTMLImageElement
    name: string
    followers: number
    repo: number
    company: string
    place: string
}

class User implements inital {
    constructor(public githubImg: string, public img: HTMLImageElement, public name: string, public followers: number, public following: number, public repo: number, public company: string, public place: string) {}

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
    const values = new User("./githubImage.PNG", data.avatar_url, data.login, data.followers, data.following, data.public_repos, data.company, data.location)

    if (data.login == undefined) {
        res.innerHTML = '<span>!!Usuário não encontrado!!<span>'
        setTimeout(() => {
            res.innerHTML = ''
        }, 3000)
        return
    }

    res.innerHTML = values.data()
}

button?.addEventListener('click', buscarRepos)

