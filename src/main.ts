import Express, { Application, Request, Response } from 'express';
import { readdir } from 'fs';

export default class {
    public expressApp: Application;

    /**
    @description Start a new local application.
    @param value Dynamic TCP port to run server.
    */

    constructor(value?: number) {
        this.expressApp = Express();
        this.expressApp.use(Express.urlencoded({ extended: true }));
        this.expressApp.listen(value ?? 80, () => console.log(`SERVER: Running on TCP ${value}.`));
    };

    /**
    @description Set default ('/') GET route folder.
    @param value Dynamic folder directory.
    */

    setDefault(value: string): void {
        import('../' + value).then((callback) => {
            this.expressApp.get('/', (req: Request, res: Response) => callback.default(req, res));
        });
    };

    /**
    @description Set standard GET/POST routes folder.
    @param value Dynamic folder directory.
    */

    useFolder(value: string): void {
        readdir('./' + value, (a, b) => b.map(c => {
            if ((c).toLowerCase() === 'post') {
                readdir('./' + value + '/' + c, (d, e) => {
                    e.map(f => import('../' + value + '/' + c + '/' + e).then((callback) => {
                        this.expressApp.post('/' + f, (req: Request, res: Response) => callback.default(req, res));
                    })) && console.log(`POST: Successfully loaded ${e.length} route(s).`);
                });
            } else if ((c).toLowerCase() === 'get') readdir('./' + value + '/' + c, (d, e) => {
                e.map(f => import('../' + value + '/' + c + '/' + e).then((callback) => {
                    this.expressApp.get('/' + f, (req: Request, res: Response) => callback.default(req, res));
                })) && console.log(`GET: Successfully loaded ${e.length} route(s).`);
            });
        }));
    };
};