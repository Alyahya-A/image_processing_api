# Udacity: Image Processing API

First project.

## Overview

An API project built with Node.js, it's allows you to resize images via URL parameters.

An additional feature of your images, all resized images are saved in the `thumb` folder this means all images are cached, which allows to reduce page loading size. Instead of having to resize and upload multiple copies of the same image to use throughout your site.

## Let's Start

This application is run a node.js site provides a REST endpoints.

### Start the site (Server)

1. To start the site please run the following script to install all needed packages for the project":
   `npm install`

2. After installing packages run the following script to start the site:  
   `npm run start`

### Other Scripts

Here you can find the scripts which may help you. You can run one of the following scripts with the following command `npm run <ScriptName>`

| Script Name  | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| build        | Creates a build directory named `dist` with a production build of your app   |
| jasmine      | Running Jasmine specs                                                        |
| test         | Run both `build` & `jasmine` scripts                                         |
| format:check | Check that all files formatted and match prettier code style                 |
| format:fix   | This rewrites all processed files and formats files in the current directory |
| lint:check   | Checking of your source code for programmatic and stylistic errors           |
| lint:fix     | Automatically fix problems and stylistic errors                              |

### APIs

The site will run on port 3000 (default) you can change it from the `config.env` [Here](/src/config/config.env).  
Base URL is : http://localhost:3000

Now find the available endpoints:

#### **1. [GET] /api/images**

Expected query parameters are:

- imageName
  > Images can found in `assets/images/full` [Here](/assets//images//full/).
- width
- height

All parameters are `required`

#### **2. [GET] /api/images/deleteThumbs**

This endpoint allow you to delete all thumbs images (Cached images).
