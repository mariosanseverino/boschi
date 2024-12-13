'use client'
import React, {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction
} from 'react'
import { Order } from '../interfaces/orders/Order'
import { UserResponse } from '../interfaces/users/User'

export type UserContextProps = {
    user: UserResponse | null,
    setUser: (user: UserResponse) => void,
    isLoading: boolean,
	orders: Order[],
    setOrders: Dispatch<SetStateAction<Order[]>>,
	getOrdersByUserId: (userId: UserResponse['id']) => Promise<Order[] | undefined>
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

interface UserProviderProps {
	children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<UserResponse | null>(null)
	const [orders, setOrders] = useState<Order[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function getOrdersByUserId(userId: UserResponse['id']): Promise<Order[] | undefined> {
		const token = localStorage.getItem('authToken')

		if (token) {
			const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/orders/user/${ userId }`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${ token }`,
					'Content-Type': 'application/json'
				}
			})

			if (!response.ok) {
				throw new Error('ERROR! Couldn\'t fetch all orders')
			}

			const data: Order[] = await response.json()

			return data
		}
	}

	const userValue = {
		isLoading,
		setIsLoading,
		user,
		setUser,
		orders,
		setOrders,
		getOrdersByUserId
	}

	return (
		<UserContext.Provider value={ userValue }>
			{ children }
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
