const download = require('./lib/download.js');

const options = {
    usage: '<url> <title>',
    arguments: [
        {name: 'url', desc: 'HackMD note url.'},
        {name: 'title', desc: 'File name of post, if not specified default "default-title".'}
    ],
    options: [
        {name: '-p', desc: 'Post dir, default "source/_posts".'},
        {name: '-i', desc: 'Image dir, default "source/images".'},
    ]
}


hexo.extend.console.register('hackmd', 'hexo-hackmd plugin', options, async function(args){

    try{
        // usage validation
        if (args._.length < 1){
            throw new Error('Usage: hexo hackmd <url> <title>')
        }

        // url validation
        const url = args._.shift();
        if (url.slice(0, 18) !== 'https://hackmd.io/'){
            throw new Error('URL should start with "https://hackmd.io/".')
        }

        // title validation
        const title = args._.length ? args._.join('-') : 'default-title';

        // post_dir, img_dir validation
        const post_dir = args.p ? args.p : 'source/_posts';
        const img_dir = args.i ? args.i : 'source/images';
        if (post_dir.slice(0, 7) !== 'source/' | img_dir.slice(0, 7) !== 'source/'){
            throw new Error('Dir should start with "source/"')
        }

        // token validation
        const hackmd_token = hexo.config.hackmd_token;
        if (hackmd_token === undefined){
            throw new Error("HackMD token not found, please add it in hexo config.")
        }
        
        // start downloading
        await download(url, title, post_dir, img_dir, hackmd_token)

    }catch(err){
        console.error(err);
    }
})