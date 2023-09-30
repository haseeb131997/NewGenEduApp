export const VERSION= "3"
export const BUILD= "0"

// ----- Development ----
export const BASE_URL = 'https://test.newgeneducationapp.com/CohesiveGateway/';
export const FILE_URL = 'https://test.newgeneducationapp.com/';

// ---- Production -----
//export const BASE_URL = 'https://web.newgeneducationapp.com/CohesiveGateway/';
//export const FILE_URL = 'https://web.newgeneducationapp.com/';

//export const APIKEY = 'AIzaSyBnRJDqxI1gIWRUEhFT-ZZ7pQzf8r5jZJ4';




class HttpUtils {
  getURL(serviceType,serviceName) {
    return BASE_URL + serviceType + '/' + serviceName
  }
  FILE_URL(){
    return FILE_URL
  }
  DEFAULT_IMAGE_FILE_PATH(){
    return require("../asssets/icons/ic_profile.jpg")
  }
  APIKEY(){
    return APIKEY
  }
  VERSION(){
    return VERSION
  }
  BUILD(){
    return BUILD
  }
  VIDEO_THUMBNAIL(){
    return "../asssets/image/cc6-8264-986665fe3c8a.jpg"
  }
}

export const httpUtils = new HttpUtils();
