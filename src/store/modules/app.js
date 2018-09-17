
const app = {
    state: {
        uesrInfo: {}
    },
    mutations: {
        SET_USERINFO (state, obj) {
            state.uesrInfo = obj
        }
    },
    actions: {
        setUserInfo ({commit}, obj) {
            commit('SET_USERINFO', obj)
        }
    }
}

export default app
