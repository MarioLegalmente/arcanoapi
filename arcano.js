import { parse } from 'url'

function extarctQuery(qs){
    const query = {}

    qs
    .split('&')
    .map((item) => item.split('='))
    .forEach(item => {
      const [ name, value ] = item;

      Object.defineProperty(query, name, {
        value,
        enumerable: true
      })
    });
    return query;
}

export default function arcano() {
    const middleware = []

    function send(content) {
        this.end(content)
    }

    function status(code) {
        this.statusCode = code;

        return this;
    }

    function json(content) {
        this.setHeader('Content-Type','application/json')
        this.end(
            JSON.stringify(content))
    }

    const app =  function next( req, res, initial = 0 ) {
        res.send = send;
        res.status = status;
        res.json = json;

        const { method, url } = req;
        const { pathname, query } = parse(url);

        let index = -1;

        for (let i = initial; i < middleware.length; i ++) {

            if (middleware[i].route) {
                if (
                    middleware[i].route === pathname &&
                    middleware[i].method === method
                    ) {
                    req.query = extarctQuery( query || '')
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
            middleware[index].fun(req, res, () => {
                next( req, res, index + 1 )
            })
        }
    }

    app.get = function (route, ...funs) {
        for (let index = 0; index < funs.length; index++) {
            const fun = funs[index];
            
            middleware.push({
                route,
                fun,
                method: 'GET',
            });
        }
    };

    app.post = function (route, ...funs) {
        for (let index = 0; index < funs.length; index++) {
            const fun = funs[index];
            
            middleware.push({
                route,
                fun,
                method: 'POST'
            });
        }
    };

    app.use = function (fun) {
        middleware.push({
            fun,
        })
    }
    return app;
}