import { parse } from 'url'

export default function arcano() {
    const middleware = []

    function send(content) {
        this.end(content)
    }

    function status(code) {
        this.statusCode = code;

        return this;
    }

    const app = function (req, res) {
        res.send = send;
        res.status = status;
        const { method, url } = req;
        const { pathname } = parse(url);

        let index = -1;

        for (let i = 0; i < middleware.length; i++) {

            if (middleware[i].route) {
                if (
                    middleware[i].route === pathname &&
                    middleware[i].method === method) {
                    index = i;
                    break;
                }
            } else {
                index = i;
                break;
            }
        }
        if (index === -1) {
            res.statusCode = 404;
            res.end('Route Not Found')
        } else {
            middleware[index].fun(req, res)
        }
    }

    app.get = function (route, fun) {
        middleware.push({
            route,
            fun,
            method: 'GET',
        });
    };

    app.use = function (fun) {
        middleware.push({
            fun,
        })
    }
    return app;
}