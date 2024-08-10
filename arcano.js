import { parse } from 'url'
import { pathToRegexp } from 'path-to-regexp'


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
        this.send(
            JSON.stringify(content))
    }

    const app =  function next( req, res, init = 0 ) {
        res.send = send;
        res.status = status;
        res.json = json;

        const { method, url } = req;
        const { pathname, query } = parse(url);

        let index = -1;

        for (let i = init; i < middleware.length; i++) {

            if (middleware[i].route) {
                if (middleware[i].method === method){
                    if (middleware[i].route === pathname){
                        req.query = extarctQuery( query || '')
                        index = i;
                        break;
                    } else {
                        const keys = [];
                        const regexp = pathToRegexp(middleware[i].route, keys)
                        const values = regexp.exec(pathname) || []

                        if (values.length > 0 ) {
                            const params = {}
                            keys.forEach(( param, pos) => {
                                Object.defineProperty(params, param.name, {
                                    value: values [pos +1],
                                    enumerable: true
                                  });
                            })

                            req.query = extarctQuery( query || '')
                            res.params = params
                            index = i
                            break;
                        }
                    }
                    
                }
                
            } else {
                index = i;
                break;
            }
        }
        if (index === -1) {
            res.statusCode = 404
            res.send('Route Not Found cabron')
        } else {
            middleware[index].cb(req, res, () => {
                next( req, res, index + 1 )
            })
        }
    }

    app.get = function (route, ...callback) {
        for (let index = 0; index < callback.length; index++) {
            const cb = callback[index];           
            middleware.push({
                route,
                cb,
                method: 'GET',
            });
        }
    };

    app.post = function (route, ...callback) {
        for (let index = 0; index < callback.length; index++) {
            const cb = callback[index];
            
            middleware.push({
                route,
                cb,
                method:'POST'
            });
        }
    };



    app.use = function(cb) {
        middleware.push({
            cb,
        });
    };

    return app;
};