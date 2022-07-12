import { Loading } from 'notiflix';

export function notiflixLoading() {
  Loading.pulse({
    svgColor: 'gold',
    svgSize: '100px',
  });
}

export function notiflixLoadingRemove() {
  Loading.remove();
}