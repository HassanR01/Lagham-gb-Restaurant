import React from 'react'
import AddItem from '../components/Dashboard/AddItem'
import Script from 'next/script'
import ItemsList from '../components/Dashboard/ItemsList'
import OrderList from '../components/Dashboard/OrderList'
import UsersList from '../components/Dashboard/UsersList'

export default function Dashboard() {
    return (
        <section>
            <div className="container w-full border rounded-xl flex flex-col items-center justify-start">
                <div className="partIcons w-full flex flex-col items-center justify-start py-6">
                    <ul className='flex items-center justify-center bg-textColor rounded-full px-12 text-bgColor'>
                        <li data-part='add'><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></li>
                        <li data-part='items'><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></svg></li>
                        <li className='selected' data-part='orders'><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" /></svg></li>
                        <li data-part='users'><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg></li>
                    </ul>
                </div>
                <div className="partitions">
                    {/* Add Items Partition */}
                    <div className="add">
                        <h2>Add Item</h2>
                        <AddItem />
                    </div>
                    {/* Items List Partition */}
                    <div className="items">
                        <h2>Items List</h2>
                        <ItemsList />
                    </div>
                    {/* orders List Partition */}
                    <div className="orders active">
                        <h2>Orders List</h2>
                        <OrderList />
                    </div>
                    {/* Users List Partition */}
                    <div className="users">
                        <h2>Users List</h2>
                        <UsersList />
                    </div>
                </div>
            </div>
            <a className='link my-4' href="/">Home</a>
            <Script src='Js/dashboard.js' />
        </section>
    )
}

