(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
const state = {
  credentials: null
};
function View() {
  this.title = "default title";
  this.template = null;
  this.routeParams = null;
  this.params = null;
  this.loadData = async function() {
  };
  this.setView = async function() {
    await this.loadData();
    if (!this.template)
      throw new Error("View template is not set");
    document.body.append(this.template.getElement());
    document.title = this.title;
  };
  this.unsetView = async function() {
    await this.template.removeElement();
  };
  this.getState = function(state2) {
    return {};
  };
  this.setState = async function(state2) {
    return {};
  };
}
function stringToHTMLElement(string) {
  const frame = document.createElement("div");
  frame.insertAdjacentHTML("afterbegin", string);
  return frame.firstElementChild;
}
const slot = (name) => `<div data-slot="${name}" class="slot"></div>`;
function Component() {
  this.element = null;
  this.getHtml = function() {
    return `
        <div>
            <h1>default component content</h1>
        </div>
        `;
  };
  this.bindScript = function() {
  };
  this.getElement = function(forceInit = false) {
    console.log("getting element");
    if (!this.element || forceInit) {
      this.element = stringToHTMLElement(this.getHtml());
      this.bindScript();
    }
    return this.element;
  };
  this.removeElement = function() {
    if (this.element)
      this.element.remove();
  };
  this.getState = function(state2) {
    return null;
  };
  this.setState = function(state2) {
  };
  this.fillSlot = function(slotName, element) {
    if (!this.element)
      throw new Error("Cannot fill slot before the element is defined.");
    const slot2 = this.element.querySelector(`[data-slot="${slotName.toString()}"]`);
    if (!slot2)
      throw new Error(`Slot ${slotName} not found`);
    slot2.replaceWith(element);
  };
  this.fillSlots = function(slotMap) {
    for (let [slotName, element] of slotMap) {
      this.fillSlot(slotName, element);
    }
  };
}
function TextInputField(label, input) {
  Component.call(this);
  this.getHtml = function() {
    return `
        <div>
            <label>${label}</label>
            ${slot("input")}
        </div>
        `;
  };
  this.bindScript = function() {
    this.fillSlot("input", input.getElement());
  };
  this.getValue = function() {
    return input.getElement().value;
  };
}
function TextInput(type, placeholder) {
  Component.call(this);
  this.getHtml = function() {
    return `
        <input type="${type}" placeholder="${placeholder}">
        `;
  };
}
function Button(text, onClick) {
  Component.call(this);
  this.getHtml = function() {
    return `
        <button type="button"  class="btn btn-primary">${text}</button>`;
  };
  this.bindScript = function() {
    this.element.addEventListener("click", this.onClick);
  };
  this.onClick = onClick;
}
function LoginForm(onSubmit, idLabel, passwordLabel) {
  Component.call(this);
  this.onSubmit = onSubmit;
  this.getHtml = function() {
    return `
        <div>
            <h1>Login</h1>
            <div>
                ${slot("username")}
                ${slot("password")}
                ${slot("submitBtn")}
            </div>
        </div>`;
  };
  this.bindScript = function() {
    this.id = new TextInputField(
      idLabel,
      new TextInput(
        "text",
        "username"
      )
    );
    this.password = new TextInputField(
      passwordLabel,
      new TextInput(
        "password",
        "password"
      )
    );
    const submitBtn = new Button(
      "Login",
      (e) => this.onSubmit(e)
    );
    this.fillSlots(/* @__PURE__ */ new Map([
      ["username", this.id.getElement()],
      ["password", this.password.getElement()],
      ["submitBtn", submitBtn.getElement()]
    ]));
  };
  this.getValues = function() {
    return [this.id.getValue(), this.password.getValue()];
  };
}
function Default() {
  Component.call(this);
  this.components = [];
  this.getHtml = function() {
    let slots = "";
    for (let i in this.components) {
      slots += slot(i);
    }
    return `
            <div>
                ${slots}
            </div>
        `;
  };
  this.bindScript = function() {
    this.fillSlots(new Map(
      this.components.map((component, index) => [index, component.getElement()])
    ));
  };
}
async function login(username, password) {
  const resp = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const respBody = await resp.json();
  if (respBody.message === "success") {
    state.credentials = respBody.user;
  } else
    console.warn("Wrong credentials");
  return respBody;
}
async function getAllUsers() {
  const resp = await fetch("/api/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await resp.json();
}
function Login() {
  View.call(this);
  this.loginForm = new LoginForm(
    async () => {
      const [username, password] = this.loginForm.getValues();
      await login(username, password);
      if (state.credentials) {
        console.log("credentials: ", state.credentials);
        await router.goTo("checklists");
      } else
        alert("Wrong credentials");
    },
    "Username",
    "Password"
  );
  this.template = new Default();
  this.template.components.push(this.loginForm);
}
function Link(text, route2, router2) {
  Component.call(this);
  this.getHtml = function() {
    return `<a>${text}</a>`;
  };
  this.bindScript = function() {
    this.element.addEventListener("click", () => router2.goTo(route2));
  };
}
function NavBar(routesMap, router2) {
  Component.call(this);
  this.routesMap = routesMap;
  this.getHtml = function() {
    let links = "";
    for (let i of this.routesMap.keys()) {
      links += "<li>" + slot(i) + "</li>";
    }
    return `
        <nav>
            <ul>
                ${links}
            </ul>
        </nav>
        `;
  };
  this.bindScript = function() {
    for (let i of this.routesMap) {
      let link = new Link(i[0], i[1], router2);
      this.fillSlot(i[0], link.getElement());
    }
  };
}
function defaultNavBar() {
  let routes = /* @__PURE__ */ new Map([
    ["Vehicles", "vehicles"],
    ["Login", "login"],
    ["Dashboard", "dashboard"],
    ["Checklists", "checklists"]
  ]);
  return new NavBar(routes, router);
}
function extractUserData(user) {
  const name = user.title, age = user.relationships.find((rel) => rel.sourceNode.parentId === "co_c4e24d3c-42b1-49d9-b086-d816473c17a7").sourceNode.title, country = user.relationships.find((rel) => rel.sourceNode.parentId === "co_dea5c3ee-8a56-4e62-b391-a97844ec9b27").sourceNode.title, checklists = user.relationships.filter((rel) => rel.sourceNode.parentId === "co_cb04ef5f-27ae-43c7-a6de-29c5f8ee98e5").map((rel) => rel.sourceNode.title);
  return { name, age, country, checklists };
}
const getCellCoords = (event) => [event.target.cellIndex, event.target.parentElement.rowIndex];
async function usersTable(table) {
  const usersRaw = await getAllUsers();
  table.headers = ["name", "age", "country", "checklists"];
  table.rows = setRows$2(usersRaw, table);
  table.clickHandler = userTableClickHandler;
  table.data = usersRaw;
  table.sortPerHeader = sortPerHeader;
  return table;
}
async function userTableClickHandler(event) {
  const coords = getCellCoords(event);
  if (coords[1] === 0) {
    this.sortPerHeader(coords[0]);
  }
  this.rows = setRows$2(this.data, this);
  const oldTable = this.element;
  this.element = null;
  oldTable.replaceWith(this.getElement());
}
function sortPerHeader(x) {
  const clickedHeader = this.headers.splice(x, 1);
  this.headers.push(clickedHeader);
}
function setRows$2(data, table) {
  return data.map((user) => {
    const userData = extractUserData(user);
    const row = [];
    for (let i of table.headers) {
      if (Array.isArray(userData[i]))
        row.push(userData[i].join(",<br>"));
      else
        row.push(userData[i]);
    }
    return row;
  });
}
function Header(importance, text) {
  Component.call(this);
  this.getHtml = function() {
    return `<h${importance}>${text}</h${importance}>`;
  };
}
function Table(headersString = [], rowsString = [], clickHandler = () => {
}, data = null) {
  Component.call(this);
  this.headers = headersString;
  this.rows = rowsString;
  this.clickHandler = clickHandler;
  this.data = data;
  this.createHeaders = function(headers) {
    return headers.map((header) => `<td>${header}</td>`);
  };
  this.createRows = function(rows) {
    return rows.map((row, i) => {
      if (row.length > this.headers.length)
        throw new Error("Row has more columns than headers.");
      else if (row.length < this.headers.length)
        throw new Error("Row has less columns than headers.");
      return `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
    });
  };
  this.getHtml = function() {
    return `
        <table class="table">
            <thead>
                <tr>
                 ${this.createHeaders(this.headers)}
                </tr>
            </thead>
            <tbody>
                ${this.createRows(this.rows)}
            </tbody>
        </table>
        `;
  };
  this.bindScript = function() {
    this.element.addEventListener("click", (event) => this.clickHandler(event));
  };
}
function Dashboard() {
  View.call(this);
  this.title = "Dashboard";
  this.navBar = defaultNavBar();
  this.header = new Header(1, "Dashboard");
  this.usersTable = new Table();
  this.button = new Button("Go To User Page", async () => {
    await router.goTo("user");
  });
  this.loadData = async function() {
    await usersTable(this.usersTable);
  };
  this.template = new Default();
  this.template.components.push(this.navBar, this.header, this.usersTable, this.button);
}
async function getChecklistsRelatedToUser(username) {
  const resp = await fetch("/api/checklists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  });
  return await resp.json();
}
function extractChecklistData(checklistRaw) {
  return {
    checklist: checklistRaw.title,
    tasks: checklistRaw.relationships.map((relationship) => relationship.sourceNode.title)
  };
}
async function checklistTable(table, user) {
  const rawChecklists = await getChecklistsRelatedToUser(user), checklists = rawChecklists.map((checklist) => extractChecklistData(checklist));
  console.log(checklists);
  table.headers = ["checklist", "tasks"];
  table.rows = setRows$1(checklists, table);
  table.data = checklists;
  return table;
}
function setRows$1(data, table) {
  return data.map((checklist) => {
    const row = [];
    console.log(checklist);
    for (let i of table.headers) {
      if (Array.isArray(checklist[i]))
        row.push(checklist[i].join(",<br>"));
      else
        row.push(checklist[i]);
    }
    return row;
  });
}
function weekTable(table) {
  const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], tasks = ["task1", "task2", "task3", "task4", "task5", "task6", "task7"], note = ["red", void 0, "green", void 0, void 0, "purple", "pink"];
  const data = week.map((day, i) => {
    return {
      day,
      task: tasks[i],
      note: note[i]
    };
  });
  table.headers = ["week", "tasks", "note"];
  table.rows = setRows(table, data);
  table.data = data;
  table.bindScript = function() {
    this.element.querySelectorAll("[data-slot]").forEach((slot2) => {
      const slotName = slot2.dataset.slot;
      const inputField = new TextInput("text", slotName);
      slot2.replaceWith(inputField.getElement());
    });
  };
  return table;
}
function setRows(table, data) {
  return data.map((schedule, i) => {
    const row = [];
    const note = schedule.note ?? slot(i + 1 + "-note");
    row.push(schedule.day, schedule.task, note);
    return row;
  });
}
function Checklists() {
  View.call(this);
  const username = state.credentials;
  const capitName = username.charAt(0).toUpperCase() + username.slice(1);
  console.log("username: ", capitName);
  this.title = username + "'s Checklists";
  this.navBar = defaultNavBar();
  this.header = new Header(1, capitName + "'s Checklists");
  this.checklistHeader = new Header(2, "Checklists");
  this.checklistsTable = new Table();
  this.weekHeader = new Header(2, "Weeks");
  this.weekTable = new Table();
  this.button = new Button("Go To Dashboard Page", async () => {
    await router.goTo("dashboard");
  });
  this.loadData = async () => {
    await checklistTable(this.checklistsTable, username);
    await weekTable(this.weekTable);
  };
  this.template = new Default();
  this.template.components.push(this.navBar, this.header, this.checklistHeader, this.checklistsTable, this.weekHeader, this.weekTable, this.button);
}
function Guard() {
  this.answers = [
    "allow",
    "redirect",
    "stop"
  ];
  this.control = async function(route2, params) {
    return this.answers[0];
  };
  this.getFormattedDefenseResult = function(defenseResult) {
    if (defenseResult === true)
      return this.answers[0];
    else if (defenseResult === false)
      return this.answers[2];
    if (this.answers.includes(defenseResult))
      return defenseResult;
    else
      throw new Error(`answer must be a boolean or one of the following: ${this.answers.join(", ")}`);
  };
  this.awaitAnswer = async function(route2, params) {
    let defenseResult = await this.control(route2, params);
    return this.getFormattedDefenseResult(defenseResult);
  };
}
function loggedInGuard() {
  Guard.call(this);
  this.control = async (route2, params) => {
    const answer = state.credentials !== null;
    if (!answer) {
      await router.goTo("login");
    }
    return answer;
  };
}
function Router(routes) {
  this.routes = routes;
  this.viewStates = /* @__PURE__ */ new Map();
  this.currentView = null;
  this.setBrowserHistory();
}
function route(path2, view, guard = null) {
  return {
    path: path2,
    guard,
    view
  };
}
Router.prototype.setBrowserHistory = function() {
  window.addEventListener("popstate", async (event) => {
    if (event) {
      await this.goTo(window.location.pathname.slice(1), void 0, false, false);
    }
  });
};
Router.prototype.goTo = async function(fullRoute, params = [], forceNewView = false, pushState = true) {
  console.log("goTo", fullRoute, params);
  const splitRoute = fullRoute.split("/");
  const routeBase = splitRoute[0];
  const routeParams = splitRoute.slice(1).filter((e) => e !== "");
  let previousView = this.currentView;
  let foundState = this.viewStates.get(fullRoute);
  if (foundState && !forceNewView) {
    this.viewStates.delete(fullRoute);
  }
  this.routes.map((route3) => route3.route);
  console.log("routeBase", routeBase);
  let route2 = this.routes.find((r) => r.path === routeBase);
  if (!route2) {
    route2 = this.routes[0];
    fullRoute = this.routes[0].path;
    console.warn(`View ${routeBase} not found, using default view`);
  }
  const createView = async (viewConstructor, params2 = [], state2 = null) => {
    let view = await new viewConstructor(routeParams, ...params2);
    view.path = fullRoute;
    if (state2)
      await view.setState(state2);
    return view;
  };
  async function switchView(currentView, viewStates) {
    if (previousView) {
      viewStates.set(previousView.path, previousView.getState());
      await previousView.unsetView();
      console.log("removed view");
    }
    if (pushState)
      history.pushState({ path: routeBase }, null, "../" + fullRoute);
    await currentView.setView();
  }
  if (route2.guard) {
    let guard = new route2.guard();
    let answer = await guard.awaitAnswer(fullRoute, params);
    switch (answer) {
      case "allow":
        console.log("allow");
        this.currentView = await createView(route2.view, params, foundState);
        await switchView(this.currentView, this.viewStates);
        break;
      case "redirect":
        console.log("redirecting to " + route2.redirect);
        await this.goTo(this.currentView.redirect ?? this.routes[0].path, params, forceNewView, pushState);
        break;
      case "stop":
        console.log("guard stopped");
        break;
      default:
        console.error("guard answer not recognized: " + answer);
    }
  } else {
    this.currentView = await createView(route2.view, params, foundState);
    await switchView(this.currentView, this.viewStates);
  }
};
async function getAllVehicles() {
  const resp = await fetch("api/vehicles", {
    method: "GET"
  });
  return await resp.json();
}
function Vehicles() {
  View.call(this);
  this.title = "Vehicles";
  this.navBar = defaultNavBar();
  this.header = new Header(1, "Vehicles");
  this.vehicleTable = new Table();
  this.button = new Button("Go To Dashboard Page", async () => {
    await router.goTo("dashboard");
  });
  this.loadData = async function() {
    this.vehicles = await getAllVehicles();
    this.vehicleTable.headers = ["name", "email", "color", "year"];
    this.vehicleTable.rows = this.vehicles.map((vehicle) => [vehicle.id, vehicle.owner, vehicle.color, vehicle.year]);
    this.vehicleTable.data = this.vehicles;
  };
  this.template = new Default();
  this.template.components.push(this.navBar, this.header, this.vehicleTable, this.button);
}
const router = new Router([
  route("vehicles", Vehicles),
  route("login", Login),
  route("dashboard", Dashboard),
  route("checklists", Checklists, loggedInGuard)
]);
const path = window.location.pathname.slice(1);
console.log("path: ", path);
router.goTo(path).then();
