import axios from 'axios'

const api = axios.create({
	baseURL: `${ process.env.NEXT_PUBLIC_API_URL }`,
})

export async function requestData(endpoint: string) {
	const { data } = await api.get(endpoint)
	return data
}

export async function requestLogin(endpoint: string, body: object) {
	const { data } = await api.post(endpoint, body)
	return data
}

export default api
