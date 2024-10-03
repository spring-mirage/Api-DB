import { USER_DDBB } from "../bbdd.js";

const authByEmailPwd = (email, password) => {

    const user = USER_DDBB.find((user) => user.email === email);

    if (!user) {
        throw new Error('Email not registered');
    }

    if (user.password !== password) {
        throw new Error('Wrong password');
    }
    return user;
}

export default authByEmailPwd;