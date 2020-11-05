/* const tokenAPI = 'https://opentdb.com/api_token.php?command=request';
const avatarGravatar = 'https://www.gravatar.com/avatar/';

export const avatar = hash =>
  fetch(`${avatarGravatar}${hash}`).then(response =>
    response.json().then(result => (result.ok ? Promise.resolve(result) : Promise.reject(result))),
  );

export const token = () =>
  fetch(tokenAPI).then(response =>
    response.json().then(data => (response.ok ? Promise.resolve(data) : Promise.reject(data))),
  );
 */
