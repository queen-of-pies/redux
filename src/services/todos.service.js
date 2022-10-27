import httpService from "./http.service";

const url = "todos/"

const todosService = {
    fetch: async () => {
        const {data} = await httpService.get(url, {params: {_page: 1, _limit: 10}})
        return data
    },
    addTask: async (payload) => {
        const {data} = await httpService.post(url, payload)
        return data
    }
}

export default todosService