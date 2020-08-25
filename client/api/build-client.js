import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    // we want to delgate the routing work to ingress nginx. 
    // Since the main app and nginx are in different namespace, we need to do cross namespace communcation
    // to do so, we need to find out the full path of the namespace.
    // in format of http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};

export default buildClient;
