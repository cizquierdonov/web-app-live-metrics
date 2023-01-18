[![N|Solid](https://video-react.js.org/assets/logo.png)](https://es.reactjs.org/)
# web-app-live-metrics

React web application that shows and let create metrics.

## Public access to web application in Google Cloud

Live Metrics web application is deployed and published in the following [https://web-app-live-metrics-6rwr6t3zia-uc.a.run.app](https://web-app-live-metrics-6rwr6t3zia-uc.a.run.app)

## Pre-requisites to localhost

If you want to install in localhost, you need the following tools/configurations:

1) Install NodeJS (v18.7.0 or later)

2) Check & install the next dependencies in the project. These steps AREN'T NECCESARY, please omite if you HAVEN'T DELETE `package.json` & `package-lock.json` files

    2.1) Timeline component

    https://www.npmjs.com/package/react-vertical-timeline-component / https://openbase.com/js/react-vertical-timeline-component

    npm i react-vertical-timeline-component
    npm install @material-ui/icons

    2.2) Panels (https://www.npmjs.com/package/mdb-react-ui-kit, https://mdbootstrap.com/docs/react/extended/panels/)

    npm i mdb-react-ui-kit

    2.3) Weather Icons:

    npm install weather-icons-react --save

    2.4) Navbar Tailwind CSS:

    npm install bootstrap
    npm install react-bootstrap bootstrap@5.1.3
    npm install -D tailwindcss
    npx tailwindcss init
    npx tailwindcss -i ./src/css/input.css -o ./dist/css/output.css --watch

    2.5) React Icons:

    npm install react-icons --save

3) Before install web application, please startup [https://gitlab.com/cizquierdonov/live-metrics/ms-livemet-metrics-dal](https://gitlab.com/cizquierdonov/live-metrics/ms-livemet-metrics-dal) backend service in localhost.

## Step by step to install and run web application localhost

If you want to install in localhost, you have to run the following commands to download, install and run the application:

1) `git clone https://gitlab.com/cizquierdonov/live-metrics/web-app-live-metrics.git`

2) `cd web-app-live-metrics/`

3) `npm install react-router-dom --save`

4) `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

NOTE: This application depends on ms-livemet-metrics-dal (backend) to work. You can download these in the following URL:
[https://gitlab.com/cizquierdonov/live-metrics/ms-livemet-metrics-dal](https://gitlab.com/cizquierdonov/live-metrics/ms-livemet-metrics-dal)

## Architecture Diagram

![LiveMetrics - Documentation-Architecture drawio (2)](https://user-images.githubusercontent.com/26800918/213064765-3e73f109-1230-44eb-86e3-219cf6630e71.png)

## E-R Diagram

![LiveMetrics - Documentation-ER Diagram drawio (1)](https://user-images.githubusercontent.com/26800918/213065178-86d213c4-925b-428c-9277-e19a337e4694.png)

