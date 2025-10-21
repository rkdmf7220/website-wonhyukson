import {useStore} from "../stores/index.js";

/**
 * 현재 언어와 서브 패스를 맞춰주는 함수.
 * history 이동할 때 언어와 패스가 다르다면 덮어쓰기로 수정.
 * @param route route.params.lang
 * @param router router.replace
 * @constructor
 */
function LanguagePathHandler(route, router) {
  const currentLang = useStore().lang;
  if (currentLang !== route.params.lang) {
    router.replace({params: {lang: currentLang}})
  }
}

export {LanguagePathHandler}