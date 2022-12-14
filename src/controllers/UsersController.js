const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const UserRepository = require("../repositories/UserRepository");

//funções controllers
class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();

        const checkUserExists = await userRepository.findByEmail(email);//function dentro de UserRepository

        if(checkUserExists){
            throw new AppError("User already exists");
        }

        const hashedPassword = await hash(password, 8)

        await userRepository.create({ name, email, password: hashedPassword })

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;//estamos puxando de dentro dde ensureAuthenticated o user, que dentro do request.user tem o id

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);
        
        
        if(!user){
            throw new AppError("User does not exist!");
        } 
        
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Email already exists!");
        }

        user.name = name ?? user.name; //se existir conteudo no nome, ele substitui, se não for passado nada no conteudo de name, continua o que estava
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("You need inform old password for a new password!");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("Old password is not correct!");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        );

        return response.status(200).json();
    }
}

module.exports = UsersController;
