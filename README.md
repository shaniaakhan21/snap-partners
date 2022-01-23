## Boostraping the FrontEnd


create .env 
```
USE_REMOTE_API=TRUE
REACT_APP_RECAPTCHA_V2_PUBLIC=6Lc2koEdAAAAAIdNcMY0V1E9IPGT3AxX-vlRUDtQ
```

`npm install`

`npm start`

IMPORTANT!

make sure you access from `127.0.0.1` and not `localhost`

Otherwise you wont be able to connect use recaptcha correctly.

When creating a merge request make sure the branch name is in the following format

`feature/-------/master`

This will create a 1 use enviroment to view the progress

When creating a new MR please provide your environment link for review

`https://gitlab.worldce.info/snap/snap-website/-/environments`