
import axios from './utils/request'
import config from './utils/config'


export default {
    data() {
        return {
            ...config,
        }
    },
    methods: {
        $get(url, params) {
            return axios.get(url, { params })
        },
        $post(url, params) {
            return axios.post(url, params)
        },
        $ms(msg, onClose, duration = 1) {
            this.$message.success(msg, duration, onClose);
        },
        $me(msg) {
            this.$message.error(msg);
        },
        $mc(content, onOk) {
            this.$confirm({
                title: "系统提示",
                content,
                okText: "确认",
                cancelText: "取消",
                onOk
            })
        }
    },
}