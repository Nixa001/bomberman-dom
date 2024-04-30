class Router {
  constructor() {
    this.routes = {};
    window.onpopstate = this.resolveCurrentRoute.bind(this);
  }

  addRoute(path, component) {
    this.routes[path] = component;
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.resolveCurrentRoute();
  }

  resolveCurrentRoute() {
    const path = window.location.pathname;
    const component = this.routes[path];
    if (component) {
      const app = document.getElementById("app");
      app.innerHTML = "";
      app.appendChild(component.render());
    }
  }
}
export { Router };
