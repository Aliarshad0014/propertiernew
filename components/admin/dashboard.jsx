import React from 'react';

const Dashboard = () => {
    const statistics = [
        { label: 'Total Property', value: 223, color: 'bg-pink-500' },
        { label: 'Total Post', value: 17, color: 'bg-blue-500' },
        { label: 'Total Comment', value: 9, color: 'bg-green-500' },
        { label: 'Total User', value: 160, color: 'bg-orange-500' }
    ];

    const properties = [
        { sl: 1, title: 'plot for s...', price: '$18000000', city: 'Rawalpindi, Pakistan', manager: 'ezzan' },
        { sl: 2, title: 'house for...', price: '$1600000', city: 'Rawalakot', manager: 'ezzan' },
        { sl: 3, title: 'hdhs', price: '$25', city: 'Pakistan', manager: 'Awais' },
        { sl: 4, title: 'pak', price: '$56', city: 'India', manager: 'Awais' },
        { sl: 5, title: 'dfd', price: '$44', city: 'Pakistan', manager: 'malik' }
    ];

    const posts = [
        { sl: 1, title: "Don't miss out! Watch this vid...", comments: "0", author: 'Super' },
        { sl: 2, title: "Unleash the Power of Propertie...", comments: "0", author: 'Super' },
        { sl: 3, title: "Conflict of Titans: India vers...", comments: "0", author: 'Super' },
        { sl: 4, title: "Pir Chinasi: A Captivating Tou...", comments: "0", author: 'Super' },
        { sl: 5, title: "How do you plan and design a h...", comments: "0", author: 'Super' }
    ];

    const users = [
        { sl: 1, name: 'Super Admin', email: 'admin@propertier.com.pk' },
        { sl: 2, name: 'Agent', email: 'agent@agent.com' },
        { sl: 3, name: 'User', email: 'user@user.com' }
    ];

    const comments = [
        { sl: 1, comment: 'good one', author: 'Anees', time: '7 months ago' },
        { sl: 2, comment: 'nice', author: 'Anees', time: '7 months ago' },
        { sl: 3, comment: 'Fair', author: 'Shahzeb', time: '7 months ago' }
    ];

    return (
        <div className='text-black p-4 min-h-screen'>
            <h2 className="text-base text-gray-600 font-normal mb-4">DASHBOARD</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {statistics.map((stat, index) => (
                    <div key={index} className={`${stat.color} text-white p-4 shadow-md`}>
                        {stat.label}: {stat.value}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 shadow-md">
                    <h3 className="text-lg mb-4">Recent Properties</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className='text-left'>
                                <tr className='text-gray-600'>
                                    <th className="px-2 py-2 text-sm font-semibold">SL</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Title</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Price</th>
                                    <th className="px-2 py-2 text-sm font-semibold">City</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Manager</th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map((property, index) => (
                                    <tr key={index} className='text-sm font-normal text-gray-800'>
                                        <td className="border-b px-2 py-2">{property.sl}</td>
                                        <td className="border-b px-2 py-2">{property.title}</td>
                                        <td className="border-b px-2 py-2">{property.price}</td>
                                        <td className="border-b px-2 py-2">{property.city}</td>
                                        <td className="border-b px-2 py-2">{property.manager}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <h3 className="text-lg mb-4">Recent Posts</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className='text-left'>
                                <tr className='text-gray-600'>
                                    <th className="px-2 py-2 text-sm font-semibold">SL</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Title</th>
                                    <th className="px-2 py-2 text-sm font-semibold">
                                        <div className="flex items-center">
                                            <span className="material-symbols-outlined mr-2 text-base">
                                                comment
                                            </span>
                                            
                                        </div>
                                    </th>
                                    <th className="px-2 py-2 text-sm font-semibold">Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={index} className='text-sm font-normal'>
                                        <td className="border-b px-2 py-2">{post.sl}</td>
                                        <td className="border-b px-2 py-2">{post.title}</td>
                                        <td className="border-b px-2 py-2">{post.comments}</td>
                                        <td className="border-b px-2 py-2">{post.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <h3 className="text-lg mb-4">User List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className='text-left'>
                                <tr className='text-gray-600'>
                                    <th className="px-2 py-2 text-sm font-semibold">SL</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Name</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className='text-sm font-normal'>
                                        <td className="border-b px-2 py-2 text-sm">{user.sl}</td>
                                        <td className="border-b px-2 py-2 text-sm">{user.name}</td>
                                        <td className="border-b px-2 py-2 text-sm">{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-4 shadow-md">
                    <h3 className="text-lg mb-4">Recent Comments</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className='text-left'>
                                <tr className='text-gray-600'>
                                    <th className="px-2 py-2 text-sm font-semibold">SL</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Comment</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Author</th>
                                    <th className="px-2 py-2 text-sm font-semibold">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment, index) => (
                                    <tr key={index} className='text-sm font-normal'>
                                        <td className="border-b px-2 py-2">{comment.sl}</td>
                                        <td className="border-b px-2 py-2">{comment.comment}</td>
                                        <td className="border-b px-2 py-2">{comment.author}</td>
                                        <td className="border-b px-2 py-2">{comment.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
