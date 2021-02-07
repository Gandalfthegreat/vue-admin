const Axios = require('axios');

Axios.get("http://www.baidu.com").then((res) => {
    console.log(res);
});