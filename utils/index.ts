// get query params from the window'w URL
export const getHashParams = () => {
  const hashParams = {};
  let e: string[] | null;
  const regex = /([^&;=]+)=?([^&;]*)/g;
  const query = window.location.hash.substring(1);
  while((e = regex.exec(query))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
}