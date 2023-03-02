import {defineStore} from 'pinia'
import {useOtherStore} from './other-store'
import { getHupuApiAction } from '@/api/index';

// 第一个参数必须是全局唯一，可以是哟
export const useMainStore = defineStore('main', {
    state: () => ({
        counter: 0,
        name: "张三",
        age: 100,
        sex: "女",
        userData: {
            useName: '-',
            password: '-',
            name: "",
            age: '',
            sex: "",
        },
        hits: [],
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,

        // 获取其他state
        otherGetter(state) {
            const otherStore = useOtherStore()
            return state.name + otherStore.info
        },
        someHits(state) {
            return state.hits.slice(0,5);
        },
    },

    actions: {
        async registerUser(login, password) {
            try {
                // this.userData = await api.post({ login, password })
                setTimeout(() => {
                    this.userData = {
                        useName: login,
                        password: password,
                        name: "张三",
                        age: 100,
                        sex: "女",
                    }
                }, 1000)
            } catch (err) {
            }
        },
        setHits(data) {
            this.hits = data;
        },

        async getHitsApi(params) {
            try {
                if (this.hits?.length > 0) {
                    return this.hits;
                } else {
                    const data = await getHupuApiAction(params);
                    this.setHits(data)
                    return data;
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
    }
})