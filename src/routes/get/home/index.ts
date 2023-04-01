import GlobalStyle from '../../../stylesheet/style';
import { Request, Response } from 'express';

export default (request: Request, response: Response) => {
    console.log("JOINED: '/'.");
    
    response.send(`
        <style>${GlobalStyle}</style>

        <h2>GET: '/'</h2>
        <form action="/hello" method="POST">
            <input type="submit" value="Send POST">
        </form>
    `);
};