const { createApp, createServer } = require('yion');

const port = process.env.NODE_PORT || 8080;
const app = createApp();
const server = createServer(app);

app.get('/ping', (req, res) => res.json({ message: 'Hello world!' }));

app.get('/cat', (req, res) => {
    let url = 'https://cataas.com/c';
    let text = req.query.text || '';

    const tagMatch = text.match(/(?:#([\w-_]+))/);
    const paramsMatch = text.match(/(?:@([\w-_]+=[\w-_]+))/g);

    text = text.replace(/(?:#([\w-_]+))/g, '');
    text = text.replace(/(?:@([\w-_]+=[\w-_]+))/g, '');

    if (!!tagMatch) {
        url += `/${tagMatch[1].replace('#', '')}`;
    }

    if (!!text) {
        url += `/s/${text.trim()}`;
    }

    url += '?time=' + Date.now();
    if (!!paramsMatch) {
        paramsMatch.forEach(param => {
            url += '&' + param.replace('@', '');
        });
    }

    res.json({
        response_type: 'in_channel',
        text: 'Meow',
        attachments: [
            { image_url: url }
        ]
    });
});

server.listen(port);
