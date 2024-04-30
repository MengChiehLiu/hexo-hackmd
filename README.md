## hexo-hackmd

This is a Hexo plugin for [HackMD](https://hackmd.io), it helps you simplify downloanding HackMD note to Hexo local environment.

## How hexo-hackmd works
It copies all the content from a HackMD note, noticing that the **title** and **tags** of HackMD note will not be considered, you should write them in the content as mete data if you need.

It also downloads all images found in the content to local dir, where alt will be the file name of image. For example: `![alt text](https://hackmd.io/_uploads/XXX.png)` will be saved as `alt-text.png`, and the url will be revised as `/images/XXX.png` if img_dir is not specified. 

You should noticed that **repetitive alt will cause images to be replaced**.


## How to use
### Install
```shell
npm install hexo-hackmd
```
### Config
Add `hackmd_token` in your hexo config:
```yaml
hackmd_token: your_hackmd_token
```
You can issue your HackMD API token following this guide: [How to issue an API token](https://hackmd.io/@hackmd-api/how-to-issue-an-api-token)
### Usage
```shell
hexo hackmd <url> <title>
```
`url` is the hackmd note url, it should be in the format: `https://hackmd.io/<note_id>`.
`title` is the file name for post, for example, `test title` will be saved as `test-title.md`, this is arg is actually optional, if you do not specify a title, the dafault title is `dafault-title`.
### Options
Default post_dir is `source/_posts` and img_dir is `source/images`, if you want to sepecify dirs, you can use options:
```shell
hexo hackmd <url> <title> -p <post_dir> -i <img_dir>
```
The dir can only start with `source/`.
### Help
You can also find the usage guide with:
```shell
hexo help hackmd
```