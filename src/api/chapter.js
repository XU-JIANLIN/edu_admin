import request from '@/utils/request'

export default {
    //根据课程id查询课程所有章节和小节
    getAllChapterVideoList(courseId) {
        return request({
            url: '/online/chapter/getChapterVideoList/'+courseId,
            method: 'get'
        })
    },
    //添加的方法
    addChapter(chapter) {
        return request({
            url: '/online/chapter/addChapter',
            method: 'post',
            data: chapter
        })
    },
    //根据id查询的方法
    getChapterInfo(chapterId) {
        return request({
            url: '/online/chapter/getChapterInfo/'+chapterId,
            method: 'get'
        })
    },
    //修改的方法
    updateChapter(chapter) {
        return request({
            url: '/online/chapter/updateChapter',
            method: 'post',
            data: chapter
        })
    },
    //删除的方法
    deleteChapter(chapterId) {
        return request({
            url: '/online/chapter/'+chapterId,
            method: 'delete'
        })
    }
}