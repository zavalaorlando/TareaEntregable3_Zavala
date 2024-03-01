const fs = require('fs')

const filename = `${__dirname}/../assets/Usuarios.json`

class UserManager {
    #users

    async initialize() {
        this.#users = await this.readUsersFromFile()
    }

    async createUser(title, description, price, thumbnail, code, stock) {
        const user = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.#users.push(user)

        await this.#updateFile()    
    }

    async updateUser(updatedUser) {
        const existingUserIdx = this.#users.findIndex(u => u.username === updatedUser.username)

        if (existingUserIdx < 0) {
            throw 'Invalid username!'
        }

        // actualizar los datos de ese user en el array!
        const userData = { ...this.#users[existingUserIdx], ...updatedUser }
        this.#users[ existingUserIdx ] = userData

        await this.#updateFile()
    }

    async #updateFile() {
        await fs.promises.writeFile(filename, JSON.stringify(this.#users, null, '\t'))
    }

    async readUsersFromFile() {
        try {
            const usersFileContent = await fs.promises.readFile(filename, 'utf-8')
            return JSON.parse(usersFileContent)
        }
        catch (err) {
            return []
        }
    }
}


// testing
const main = async () => {
    const manager = new UserManager()
    await manager.initialize() // load users from file into manager
    console.log(await manager.readUsersFromFile())

    await manager.createUser('Manzana', 'Manzana Roja dulce' ,150, 'Sin imagen' , 'mz1345')
    await manager.createUser('Pera', 'Pera jugosa' ,175, 'Sin imagen' , 'pa1456')
    await manager.createUser('Banana', 'Banana por madurar' ,250, 'Sin imagen' , 'ba1902')
    await manager.createUser('Tomate', 'Tomate perita' ,350, 'Sin imagen' , 'te5504')
    await manager.createUser('Lechuga', 'Lechuga criolla' ,600, 'Sin imagen' , 'la4435')
    await manager.createUser('Cebolla', 'Cebolla morada' ,300, 'Sin imagen' , 'ca3453')
    await manager.createUser('Anana', 'Anana dulce' ,900, 'Sin imagen' , 'aa1254')
    await manager.createUser('Kiwi', 'Kiwi chicos' ,125, 'Sin imagen' , 'ki9922')
    await manager.createUser('Naranja', 'Naranja dulce' ,200, 'Sin imagen' , 'na2211')
    await manager.createUser('Mandarina', 'Mandarina sin semillas' ,399, 'Sin imagen' , 'ma9991')


    console.log(await manager.readUsersFromFile())
}

main()