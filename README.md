# Hackaton #1

## Implemented modules

[![Random background](https://img.shields.io/npm/v/axios.svg?style=flat-square)]
[![Random sound](https://img.shields.io/cdnjs/v/axios.svg?style=flat-square)]
![Geolocation](https://github.com/axios/axios/actions/workflows/ci.yml/badge.svg)
[![Clicker](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)]
[![Timer](https://img.shields.io/coveralls/mzabriskie/axios.svg?style=flat-square)]
[![Random figure](https://packagephobia.now.sh/badge?p=axios)]
[![Logging](https://img.shields.io/npm/dm/axios.svg?style=flat-square)]package=axios)
[![Get user](https://img.shields.io/gitter/room/mzabriskie/axios.svg?style=flat-square)]
[![Random photo](https://www.codetriage.com/axios/axios/badges/users.svg)]
[![Simple paint](https://snyk.io/test/npm/axios/badge.svg)]
![npm bundle size]

Promise based HTTP client for the browser and node.js

> New axios docs website: [click here](https://axios-http.com/)

## Table of Contents

  - [Features](#features)
  - [Browser Support](#browser-support)
  - [Installing](#installing)
  - [Example](#example)
  - [Axios API](#axios-api)
  - [Request method aliases](#request-method-aliases)
  - [Concurrency 👎](#concurrency-deprecated)
  - [Creating an instance](#creating-an-instance)
  - [Instance methods](#instance-methods)
  - [Request Config](#request-config)
  - [Response Schema](#response-schema)
  - [Config Defaults](#config-defaults)
    - [Global axios defaults](#global-axios-defaults)
    - [Custom instance defaults](#custom-instance-defaults)
    - [Config order of precedence](#config-order-of-precedence)
  - [Interceptors](#interceptors)
    - [Multiple Interceptors](#multiple-interceptors)
  - [Handling Errors](#handling-errors)
  - [Cancellation](#cancellation)
    - [AbortController](#abortcontroller)
    - [CancelToken 👎](#canceltoken-deprecated)
  - [Using application/x-www-form-urlencoded format](#using-applicationx-www-form-urlencoded-format)
    - [URLSearchParams](#urlsearchparams)
    - [Query string](#query-string-older-browsers)
    - [🆕 Automatic serialization](#-automatic-serialization-to-urlsearchparams)        
  - [Using multipart/form-data format](#using-multipartform-data-format)    
    - [FormData](#formdata)
    - [🆕 Automatic serialization](#-automatic-serialization-to-formdata) 
  - [Files Posting](#files-posting)
  - [HTML Form Posting](#-html-form-posting-browser)
  - [Semver](#semver)
  - [Promises](#promises)
  - [TypeScript](#typescript)
  - [Resources](#resources)
  - [Credits](#credits)
  - [License](#license)

## Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](https://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- 🆕 Automatic data object serialization to `multipart/form-data` and `x-www-form-urlencoded` body encodings
- Client side support for protecting against [XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery)