import {useStore} from "../stores/index.js";

/**
 * 1. workList, reviewList의 텍스트를 flat하게 가공.
 * 2. flat한 목록에서 검색어가 포함된 목록을 필터링.
 * @param keyword
 * @returns {{type: string, id: string, title: string, searchedText: {before: string, highlight: string, after: string}}[]}
 */
function searchData(keyword) {
  if (!keyword) return;
  return filteredWithKeyword(keyword, [...flattenWorkList(), ...flattenReviewList()])
}

/**
 * workList를 가공함.
 * flattenedTexts는 검색이 돼야 할 텍스트를 모아놓음.
 * @returns {{type: string, id: string, title: string, flattenedTexts: string[]}[]}
 */
function flattenWorkList() {
  return useStore().worksList.map(work => {
    switch (work.type) {
      case 'sculpture':
      case 'painting':
      case 'typography':
        return {
          type: work.type,
          id: work.id,
          title: work.title,
          flattenedTexts: [`${work.title} - ${work.caption}`].filter(Boolean)
        };

      case 'news':
      case 'archives':
        let flattenedInfo = work.info.map(item => item.text ? item.text.replace(/\n/g, '') : '').filter(Boolean);
        return {
          type: work.type,
          id: work.id,
          title: work.title,
          flattenedTexts: [work.title, work.caption, ...flattenedInfo].filter(Boolean)
        }
    }
  })
}

/**
 * texts(전 review)를 가공함.
 * flattenedTexts는 검색이 돼야 할 텍스트를 모아놓음.
 * @returns {{type: 'texts', id: title, title: string, flattenedTexts: string[]}[]}
 */
function flattenReviewList() {
  return useStore().review.map(review => {
    let texts = review.contents
        .map(content => {
              if (content.hasOwnProperty('text')) { // text 키가 있을 때만
                return content?.text // content.text: string[]
                    .replace(/<\/?[bi]>/g, '')                        // 1. 문자열 내 태그 제거
                    .split(/\n+/)                                     // 2. 하나 이상 개행 문자를 분리
                    .flatMap(sentence => sentence.split(/(?<=\.\s)/)) // 3. string[]에서 '. '를 기준으로 한 번 더 분리
                    .filter(line => line.trim() !== '')               // 4. 빈 문자열 제거
              } else {
                return [] // text가 없는 경우 빈 배열 return 후 뒤에서 flat()으로 제거
              }
            } // :string[][]
        ).flat(); // 배열 평탄화 및 빈 배열 제거
    return {
      type: 'texts', id: review.title, title: review.title, flattenedTexts: [review.subTitle, ...texts]
    }
  })
}

/**
 * flatten 된 목록에서 검색어가 포함된 배열을 찾아 가공.
 * 검색어 앞 문장, 검색어, 검색어 뒷 문장으로 가공.
 * @param keyword {string}
 * @param list {{ type: string, id: string, title: string, flattenedTexts: string[]}[]}
 * @returns {{type: string, id: string, title: string, searchedText: {before: string, highlight: string, after: string}}[]}
 */
function filteredWithKeyword(keyword, list) {
  let result = [];

  list.forEach(item => {
    let foundIndex = item.flattenedTexts.findIndex(text =>
        text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (foundIndex !== -1) {
      let foundText = item.flattenedTexts[foundIndex];
      // 첫 문장이 아닐 경우 문장 앞에 ... 추가
      let modifyText = foundIndex > 0 ? `...${foundText}` : foundText;

      result.push({
        type: item.type,
        id: item.id,
        title: item.title,
        searchedText: splitTextByKeyword(modifyText, keyword),
      })
    }
  })
  return result;
}

/**
 * 검색어가 포함된 문자을 앞, 검색어, 뒤로 나눠 가공.
 * 검색어와 결과가 대소문자가 다른 경우를 고려해 keyword 대신 해당 index의 글자를 return.
 * @param text
 * @param keyword
 * @returns {{before: string, highlight: string, after: string}}
 */
function splitTextByKeyword(text, keyword) {
  let index = text.toLowerCase().indexOf(keyword.toLowerCase());

  // if (index === -1) {
  //   // 키워드를 찾지 못한 경우
  //   return {
  //     before: text, highlight: "", after: ""
  //   };
  // }

  return {
    before: text.substring(0, index),
    highlight: text.substring(index, index + keyword.length),
    after: text.substring(index + keyword.length)
  };
}


export default searchData;