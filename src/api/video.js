import request from '@/utils/request'

export default {
    //添加的方法
    addVideo(video) {
        return request({
            url: '/online/video/addVideo',
            method: 'post',
            data: video
        })
    },
    //根据id查询的方法
    getVideoInfo(videoId) {
        return request({
            url: '/online/video/'+videoId,
            method: 'get'
        })
    },
    //修改的方法
    updateVideo(video) {
        return request({
            url: '/online/video/updateVideo',
            method: 'post',
            data: video
        })
    },
    //删除的方法
    deleteVideo(videoId) {
        return request({
            url: '/online/video/'+videoId,
            method: 'delete'
        })
    },
    //删除阿里云视频的方法
    removeAliyunVideo(videoId){
            return request({
                url: '/vidservice/vod/'+videoId,
                method: 'delete'
            })
    }
}