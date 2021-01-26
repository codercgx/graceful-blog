interface ILocalStorage {
  getItem: (key: string) => any;
  setItem: (key: string, value: any, timeLimit: number) => void;
}

export function useLocalStorage(): ILocalStorage {
  const setItem = (key: string, value: any, timeLimit?: number) => {
    let data = value;
    timeLimit=timeLimit||60
    if (
     ( typeof value == "object"||typeof(value)=='function') &&
      value !== null &&
      typeof value !== "string"
    ) {
      data = JSON.stringify(value);
    }

    let endTimeStampStr = (
      new Date().getTime() +
      timeLimit * 60 * 1000
    ).toString();
    data += "|" + endTimeStampStr;
    localStorage.setItem(key, data);
  };

  const getItem = (key: string) => {
      if(!(localStorage.getItem(key) || "")){
        return ''
      }
    let _storageData = localStorage.getItem(key) || "";
    if (_storageData.includes("|")) {
      let _data_arr = _storageData.split("|");
      let data = _data_arr[0];
      let endTime = _data_arr[1];
      let currentTime = new Date().getTime();
      if (parseInt(endTime) <= currentTime) {
        localStorage.removeItem(key);
        console.log(key,'该存储已过期');
        
        return {
          msg: "数据存储过期"
        };
      } else {
        return JSON.parse(data);
      }
    } else {
      return JSON.parse(localStorage.getItem(key) || "");
    }
  };

  return {
    setItem,
    getItem
  };
}
