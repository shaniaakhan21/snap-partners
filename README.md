<br/>
<div align="center">
  <a href='https://dev.snap.devopsteam.info'>
    <img src="https://dev.snap.devopsteam.info/images/logo.svg" alt='Logo' width='150' />
  </a>

<h3 align="center">Snap Delivered</h3>

  <p align="center">
    Backoffice Frontend
    <br />
    <a href="https://snap-delivered.atlassian.net/wiki/spaces/CBOD/pages/5144718/Front-End+Team"><strong>Explore more documentation</strong></a>
    <br />
    <a href="http://dev.snap.devopsteam.info/">View live project in development</a> <br/>
    <span>⚠ This documentation will be constantly updated</span>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#utilities-libraries">Utilities Libraries</a></li>
        <li><a href="#tests-config-in-construction">Tests Config</a></li>
        <li><a href="#eslint-config">Eslint Config</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
      <a href="#-installation">Installation</a>
    </li>
    <li>
      <a href="#-project-structure">Project Structure</a>
      <ul>
        <li><a href="#pages-directory">Pages Directory</a></li>
        <li><a href="#layouts-directory">Layouts Directory</a></li>
        <li><a href="#components-directory">Components Directory</a></li>
        <li><a href="#lib-directory">Lib Directory</a></li>
        <li><a href="#styles-directory">Styles Directory</a></li>
        <li><a href="#config-directory">Config Directory</a></li>
      </ul>
    </li>
    <li><a href="#-tests">Tests</a></li>
    <li>
      <a href="#-contributing-in-a-new-feature">Contributing</a>
      <ul>
        <li><a href="#branch">Branch</a></li>
        <li><a href="#steps">Steps</a></li>
      </ul>
    </li>
    <li><a href="#-important">Important</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## 📄 About The Project

[![Project Screenshot][product-screenshot]](http://dev.snap.devopsteam.info/)

### Built with

* [Typescript](https://www.typescriptlang.org/) - JavaScript With Syntax For Types
* [React](https://reactjs.org/) - Library for building user interfaces
* [Next](https://nextjs.org/) - Framework of React.js
* [Tailwind](https://tailwindcss.com/) - Styles

### Utilities libraries

* [Zustand](https://zustand-demo.pmnd.rs/) - Global State
* [React Hook Form](https://react-hook-form.com/) - Forms with React
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) - Alerts/Notifications with React
* [Recharts](https://recharts.org/) - Charts with React
* [React PDF Viewer](https://react-pdf-viewer.dev/) - PDF Viewer with React (is required **pdfjs-dist**)
* [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist) - **React PDF Viewer** uses the APIs provided by **pdfjs-dist**
* [React Google Recaptcha](https://www.npmjs.com/package/react-google-recaptcha) - Google Recaptcha with React `at the moment it is not being applied`
* [@tanem/react-nprogress](https://www.npmjs.com/package/@tanem/react-nprogress) - Progress bars to routing in React

### Tests config - ⚠  In construction

* [Jest](https://jestjs.io/) - Javascript testing framework
* [Testing Library](https://nextjs.org/docs/basic-features/eslint) - Testing utilities
* [Enzyme](https://enzymejs.github.io/enzyme/) - Testing utilities for React
* [@wojtekmaj/enzyme-adapter-react-17](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17) - Adapter for React 17 for Enzyme

### Eslint config

* [Next Eslint](https://nextjs.org/docs/basic-features/eslint) - Next.js default config eslint
* [Standard.js](https://standardjs.com/rules) - Standard configuration from eslint

## 👨‍💻 👩‍💻 Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm (we use npm as main **package manager**)
    ```sh
    npm install npm@latest -g
    ```

## 🔽 Installation

1. Clone the repo - example with ```HTTPS```
   ```sh
   git clone https://gitlab.worldce.info/snap/snap-website.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3.  Create ```.env``` file - check: [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
    ```
    NEXT_PUBLIC_RECAPTCHA_V2=6Lc2koEdAAAAAIdNcMY0V1E9IPGT3AxX-vlRUDtQ
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-NNQS9S8
    ```
4. Run ```npm run dev``` to run localhost project


<!-- PROJECT STRUCTURE -->
## 📂 Project Structure

### Pages directory

Check: [Next.js Routing](https://nextjs.org/docs/routing/introduction)

* ```/pages/auth/*.tsx``` - Routes to authentications `public routes`
* ```/pages/**/*.tsx``` - Client backoffice routes `private routes`

```
|/src
|-- /pages
|---- /*.tsx
|
|---- /auth
|------ /signup.tsx
|------ /signin.tsx
|
|---- /marketing
|------ /*.tsx
```

### Layouts directory

* ```/layouts/public/*.tsx``` - Layouts for the public pages
* ```/layouts/private/*.tsx``` - Layouts for the private pages

```
|/src
|-- /layouts
|---- /private
|------ /*.tsx

|---- /public
|------ /*.tsx
```

### Components directory

* ```/components/common/**.tsx``` - Components reused multiple times in the website such as a ```Button```
* ```/components/layout/**.tsx``` - Components used for the layout of the backoffice such as the ```Navbar``` and the ```Drawer```
* ```/components/page/**.tsx``` - Components used in specific pages such as the ```SignUpForm``` in the ```/pages/signup```

```
|/src
|-- /components
|---- /common
|------ /*.tsx
|
|---- /layout
|------ /*.tsx
|
|---- /page
|------ /*.tsx
```


### Lib directory

* ```/lib/hooks/**.ts``` - Custom hooks of React
* ```/lib/services/**.ts``` - For the connections, initializations and service management
* ```/lib/stores/**.ts``` - Global states with [Zustand](https://zustand-demo.pmnd.rs/)
* ```/lib/types/**.ts``` - Types, interfaces and models of typescript
* ```/lib/utils/**.ts``` - Utilities for the project

```
|/src
|-- /lib
|---- /hooks
|---- /services
|---- /stores
|---- /types
|---- /utils
```

### Styles directory

* ```/styles/utils/**.css``` - Custom class css with tailwindcss or pure CSS
* ```/styles/tailwind.css``` - Main tailwindcss inject

```
|/src
|-- /styles
|---- /utils
|---- /tailwind.css
```

### Config directory

* ```/config/api.ts``` - Config API's
* ```/config/http.ts``` - Methods HTTP and custom status code naming
* ```/config/pageInfo.ts``` - Info and SEO of the Website
* ```/config/roles.ts``` - Config user roles

```
|/src
|-- /config
|---- /api.ts
|---- /http.ts
|---- /pageInfo.ts
|---- /roles.ts
```


<!-- TESTS -->
## ⚡ Tests

```☕ Comming Soon...```



<!-- CONTRIBUTING -->
## 🤝 Contributing in a new feature

### Branch

* ```feature/dev/master``` - Main branch to develop
* ```master``` - Main branch to production

### Steps

1. Create your feature branch (`git branch feature/-------/master` example: `git branch feature/snap-16/master`)
2. Switch to the new branch (`git checkout feature/-------/master`)
3. Save all you changes and commits
4. Push the new branch (`git push origin feature/-------/master`) This will create a 1 use enviroment to view the progress
5. Open a `Merge Request` into `feature/dev/master` - when creating a new MR please provide your environment link for review `https://gitlab.worldce.info/snap/snap-website/-/environments`


<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: doc/project-capture.png


<!-- WARNINGS -->
## 🛑 IMPORTANT

Do not touch the ```.gitlab-ci.yml``` and ```generate-enviroments.sh```, under any circumstances, updating these settings can have critical consequences for the project.