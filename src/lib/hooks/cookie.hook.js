'use client'

const useCookie = () => {

    const createCookie = (cookieName, value) => {
        const expiresDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 24 часа
        // const path = '/'
        // const domain = 'http://localhost:3000'

        if (value === undefined) {
          var cookie = document.cookie.split("; ");
          for (var i = 0; i < cookie.length; i++) {
            var cookieItem = cookie[i].split("=");
            if (cookieItem[0] == cookieName) {
              return cookieItem[1];
            }
          }
          return null;
        } else {
          document.cookie = `${cookieName}=${encodeURIComponent(value)}; expires=${expiresDate.toUTCString()}`;
        }
    }

    const getCookies = (cookieName) => {
      if (typeof window == 'undefined') return null
        var cookie = document.cookie.split("; ");
        var cookieObject = {};
        for (var i = 0; i < cookie.length; i++) {
          var cookieItem = cookie[i].split("=");
          cookieObject[cookieItem[0]] = decodeURIComponent(cookieItem[1]);
        }
        if (cookieName) {
          return cookieObject[cookieName];
        } else {
          return cookieObject;
        }
    }

    return{createCookie, getCookies}
};

export default useCookie;