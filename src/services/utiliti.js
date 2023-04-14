export const getAuth = () => {
  var nameEQ = 'access_token' + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    // eslint-disable-next-line eqeqeq
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    // eslint-disable-next-line eqeqeq
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
};

export default function getCookie() {
  let name = 'access_token' + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
