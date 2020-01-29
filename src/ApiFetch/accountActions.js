import {mutualFriend} from '../utils/helper';
var leftOverData=[];var cursor1 = -1; var cursor2 = -1;

 export async function clearGetCategoriesList(){
  return async dispatch =>{
    leftOverData.length = 0;
    cursor1 = -1;
    cursor2 = -1;
    dispatch({
      payload:undefined,
      type: "LIST_CAT"
    });
  }
 }

 async function friendList(cursor,screen_name){
  const uri = `https://twitter-nodejs.herokuapp.com/mutual`
  let res = await fetch(uri, {
    method: 'GET',
    headers: {
      cursor: cursor,
      screen_name: screen_name,
      skip_status:true,
      include_user_entities: false,
      count:20,
      lang:'en',
    }})
    return await res.json();
  }

  
async function mutualDataFind(screen_name1,screen_name2,lazy){
if (lazy && (cursor1 < 0 || cursor2 < 0)) 
    return [];
else{
  let data1 = await friendList(cursor1,screen_name1)
  let data2 = await friendList(cursor2,screen_name2)
 if(data1 && data1.data && data1.data.users && data2 && data2.data && data2.data.users){
  let mutualObj = await mutualFriend(data1.data.users,data2.data.users,leftOverData)
  leftOverData = await [...mutualObj.leftOverData || leftOverData]
  let mutualData = await mutualObj.mutualData;
  cursor1 = data1.data.next_cursor;
  cursor2 = data2.data.next_cursor;
  console.log("wowowowwowowow",mutualData,cursor1,cursor2)
  if(mutualData.length < 1 && cursor1 > 0 && cursor2 > 0)
      return mutualData.concat(await mutualDataFind(screen_name1,screen_name2))

  else if(mutualData.length > 0 && mutualData.length < 20 && cursor1 > 0 && cursor2 > 0)
      return mutualData.concat(await mutualDataFind(screen_name1,screen_name2))

  else if((mutualData.length < 1) && (cursor1 < 0 || cursor2 < 0))
      return [];

  else
      return mutualData
  }
 }
}
export async function getCategoriesList(screen_name1,screen_name2,lazy){
let data = await mutualDataFind(screen_name1,screen_name2);
return async dispatch =>{
   return dispatch({
      payload: data && data.length > 0 ? data : [],
      type: "LIST_CAT"
    });
 }
}
