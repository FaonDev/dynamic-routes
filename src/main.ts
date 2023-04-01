import Express, { Application } from 'express';
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
        this.expressApp.listen(value ?? 80, () => console.log(`SERVER: Running on TCP ${value}`));
    };

    /**
    @description Set default ('/') GET route folder.
    @param value Dynamic folder directory.
    */

    setDefault(value: string): void {
        import('../' + value).then((callback) => {
            this.expressApp.get('/', (req: object, res: object) => callback.default(req, res));
        });
    };

    /**
    @description Set default GET routes folder.
    @param value Dynamic folder directory.
    */

    getRoutes(value: string): void {
        readdir('./' + value, (foo, bar) => {
            bar.map(foo => import('../' + value + '/' + foo).then((callback) => {
                this.expressApp.get('/' + foo, (req: object, res: object) => callback.default(req, res));
            })) && console.log(`GET: Successfully loaded ${bar.length} route(s).`);
        });
    };

    /**
    @description Set default POST routes folder.
    @param value Dynamic folder directory.
    */

    postRoutes(value: string): void {
        readdir('./' + value, (foo, bar) => {
            bar.map(foo => import('../' + value + '/' + foo).then((callback) => {
                this.expressApp.post('/' + foo, (req: object, res: object) => callback.default(req, res));
            })) && console.log(`POST: Successfully loaded ${bar.length} route(s).`);
        });
    };
};