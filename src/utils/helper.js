// import console = require("console");

export async function mutualFriend(data1,data2,leftOverData){
    // let leftOverData = data1.length > data2.length ? data2: let data1;
    let mutualArray=[];
    // console.log("data .......",data1,data2)
//    for(let i =0;i<data1.length;i++){

//    }
   data1.map(i=> leftOverData.push(i.id))
   data2.map(i=> leftOverData.includes(Number(i.id))?(
             mutualArray.push(i),
             leftOverData.splice(leftOverData.indexOf(i.id))
            ):null)
    console.log("outgoing data",mutualArray)
   return {leftOverData: leftOverData,mutualData:mutualArray}
}