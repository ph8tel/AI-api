const axios = require('axios')
const getAnswer = async function (question) {
    let answer = await axios({
        method: 'get',
        url: 'http://localhost:3000/ai',
        params: question
      });
      return answer
}
let r = getAnswer({carcost: 'moderate', age: 42, zipcode: 94805, sex: 'male', drivingrecord: 'horrid'})
async () => console.log(await getAnswer({carcost: 'moderate', age: 42, zipcode: 94805, sex: 'male', drivingrecord: 'horrid'}))