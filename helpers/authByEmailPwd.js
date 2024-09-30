import { USER_DDBB } from "../bbdd.js";

const authByEmailPwd = (email, password) => {

    const user = USER_DDBB.find((user) => user.email === email);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Invalid password');
    }
    return user;
}

export default authByEmailPwd;