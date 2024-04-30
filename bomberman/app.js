import {MyFrame} from '../framework/miniframe.js';
function Login (){
    const title = MyFrame.createDomElement("h1",
    {
        id: "login-title",
        innerHTML: "Login",
        class: "login-title",
    },
    "Username"
);
    const createLogin = MyFrame.createDomElement("input",
    {
        type: "text",
        placeholder: "Username",
        id: "username",
    }
);
     const createLabel = MyFrame.createDomElement("label",
    {
        for: "username",
        innerHTML: "Username",
    }
);
    const LoginButton = MyFrame.createDomElement("input",
    {
        type: "submit",
        value : "Login",
        id: "login",
    }
);
    const loginComponent = MyFrame.createDomElement("div",
    {
        id: "login-component",
        class: "login-component",
    },
    title,
    createLogin,
    createLabel,
    LoginButton,
);
    return loginComponent;
}
document.addEventListener("DOMContentLoaded", () => {
    MyFrame.appendComponentToNode(Login(), document.body);
});