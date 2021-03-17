import { get} from '@/plugin/utils/request'

export let getList = params => get("/nalco-rb-rt-dev/his/label_history", params)
