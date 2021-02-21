'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		classify,
		page = 1,
		pageSize = 10
	} = event
	let matchObj = {}
	if (classify !== '全部') {
		matchObj = {
			classify
		}
	}
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			content: false
		})
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
