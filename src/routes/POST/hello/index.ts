import GlobalStyle from '../../../stylesheet/style';
import { Request, Response } from 'express';

export default (request: Request, response: Response) => {
    console.log("JOINED: '/hello'.");

    response.send(`
        <style>${GlobalStyle}</style>

        <h2>POST: '/hello'</h2>
        <h3>Hello World!</h3>
    `);
};