const baseUrl = process.env.REACT_APP_API_URL;

export const API_URL = {
    base: baseUrl,
    planner: {
        get: "planner",
        list: "planner/list",
        update: "planner/update",
        create: "planner/create",
        delete: "planner/delete",
    },
    event: {
        get: "event",
        list: "event/list",
        update: "event/insert",
        create: "event/insert",
        delete: "event/delete",
    },
    user: {
        get: "user",
        login: "user/login",
        create: "user/create",
    },

};
