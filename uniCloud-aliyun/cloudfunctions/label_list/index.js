'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const labelList = await db.collection('label').get()
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取数据成功',
		data:labelList.data
	}
};
