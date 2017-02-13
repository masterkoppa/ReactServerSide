# React Serverside Service
NOTE: This is meant as a tech demo, you should not use this as is. There's
plenty of ways to shoot yourself in the foot here.

## Intro
This repository contains a couple things of interest.

### React Client Code
Under `src/client` we have a simple web app that renders an example Material
UI card. Opening `index.html` will simply render an example component. Nothing
special here.

### React Server Code
Under `src/server` we have a simple nodejs server. It responds only to POST calls
to the root. It expects a JSON payload with the following attributes,

 - location
    - Relative path to a pre-configured host, this will point to a built JS bundle.
    - The bundle should export a React component as the default.
 - props
    - A list of props to pass to the component

If the arguments point to a correct location, and no error occurs, the server
returns the HTML code returned by React. If you place this HTML in your app,
and then load the module pointed out you should have a seamless transition.

### Python Flask App
This is a proof of concept integrated the above components. The app
will call out to the React Server, if the connection does not timeout
the page will be served with the output from the server. Otherwise normal
rendering occurs.

If everything works correctly, you should have React Server Side Rendering from
a python app in less than a couple hundred lines of code!

## Note
As mentioned above, this is meant as a tech demo. I wrote this to play
around with the concept of integrating react server side rendering in a context
outside of NodeJS. Do not attempt to use this as is for production or for any
purpose other than experimentation, it's not the safest or cleanest code.
