
import Express from 'express';

const app = Express();

app.disable('x-powered-by')
app.use(Express.static('app'));

const port = 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));
