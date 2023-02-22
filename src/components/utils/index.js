const clearEmptyNode = (data) => {
  return Object.keys(data)
    .filter((key) => data[key] !== null && data[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
};

// 将 key，value对象泛化
export const transformObjectToT = (arg) => {
  const obj = clearEmptyNode(arg);
  return Object.entries(obj).map((item) => {
    return {
      key: item?.[0],
      value: item?.[1],
    };
  });
};

export const transformValueToText = (value, arr) => {
  const text = [];
  arr.forEach((item) => {
    value.forEach((i) => {
      if (item.value === i) {
        text.push(item.text);
      }
    });
  });
  return text.toString();
};

// 获得当前的 url添加参数并返回
const updateQueryStringParameter = (key, value) => {
  var uri = window.location.href;
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
};
// 更新当前的url
export const updateUrl = (key, value) => {
  var path = updateQueryStringParameter(key, value);
  console.log(path, "path");
  //向当前url添加参数，没有历史记录
  window.history.replaceState(
    {
      path,
    },
    "",
    path
  );
};
