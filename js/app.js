document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#login');
    const registrationForm = document.querySelector('#registration');

    UI.linkToLogin(loginForm, registrationForm);

    UI.linkToRegistration(loginForm, registrationForm);

    document.querySelector('#registration').addEventListener('submit', e => {
        Store.createUser();

        loginForm.classList.remove('form--hidden');
        registrationForm.classList.add('form--hidden');

    });

    document.querySelector("#login").addEventListener("submit", e => {
        e.preventDefault();

        const username = document.querySelector("input[name='login_username']").value;
        const password = document.querySelector("input[name='login_password']").value;

        const users = Store.getUsers();

        return compareUserData(users, username, password) ? alert("Login is succesfully!") : alert("Please sign up!!!");
    });

    function compareUserData(users, username, password) {
        return users.some(user => (user.email === username || user.username === username) && user.password === password);
    }
});


class UI {

    static linkToRegistration(loginForm, registrationForm) {
        document.querySelector('#linkCreateAccount').addEventListener('click', e => {
            e.preventDefault();
            loginForm.classList.add('form--hidden');
            registrationForm.classList.remove('form--hidden');

        });
    }

    static linkToLogin(loginForm, registrationForm) {
        document.querySelector('#linkLogin').addEventListener('click', e => {
            e.preventDefault();
            loginForm.classList.remove('form--hidden');
            registrationForm.classList.add('form--hidden');
        });
    }

}

class User {
    constructor(id, email, username, user_tel, password) {
        this.email = email;
        this.username = username;
        this.user_tel = user_tel;
        this.password = password;
    }
}

class Store {
    static createUser() {
        const email = document.querySelector('#email_input').value;
        const username = document.querySelector('input[name="uname"]').value;
        const user_tel = document.querySelector('input[name="user_tel"]').value;
        const password = document.querySelector('input[name="user_password"]').value;

        const id = this.userCounts() + 1;
        const user = new User(id, email, username, user_tel, password);

        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static userCounts() {
        if (localStorage.length === 0) return 0;
        return JSON.parse(localStorage.getItem('users')).length;
    }

    static getUsers() {
        let users;
        if (localStorage.getItem("users") !== null) {
            users = JSON.parse(localStorage.getItem('users'));
        } else {
            users = [];
        }

        return users;
    }
}

