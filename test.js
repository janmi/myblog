function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime()
      setTimeout(() => {
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data )
      }, 500)
    } catch ( err ) {
      reject( err )
    }
  })
}

const asyncReadFile = async function () {
  const f1 = await getSyncTime();
  console.log(1)
  const f2 = await getSyncTime();
  console.log(2)
  console.log(f1.toString());
  console.log(f2.toString());
  return f1
};

asyncReadFile().then((ret) => {
  console.log(ret)
})
