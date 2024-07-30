// components/App.js
"use client";
import React, { useState } from 'react';
import Dashboard from '@/components/admin/dashboard';
import Sliders from './sliders';
import Features from './features';
import MaterialRates from './materialrates';
import Membership from './memberships';
import CustomerRequests from './customerrequests';
import ProjectOffers from './projectoffers';
import ProjectQueries from './projectqueries';
import Customers from './customers';
import Testimonials from './testimonials';
import Categories from './category';
import Tags from './tags';
import Posts from './posts';
import AllServices from './services';

function App() {
    const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleNavItemClick = (item) => {
        setSelectedNavItem(item);
        setIsNavOpen(false);
    };

    const renderContent = () => {
        switch (selectedNavItem) {
            case 'dashboard':
                return <Dashboard />;
            case 'sliders':
                return <Sliders />;
            case 'features':
                return <Features />;
            case 'material-rates':
                return <MaterialRates />;
            case 'memberships':
                return <Membership />;
            case 'customer-requests':
                return <CustomerRequests />;
            case 'project-offers':
                return <ProjectOffers />;
            case 'project-queries':
                return <ProjectQueries />;
            case 'customers':
                return <Customers />;
            case 'services':
                return <AllServices />;
            case 'testimonials':
                return <Testimonials />;
            case 'categories':
                return <Categories/>
            case 'tags':
                return <Tags/>
            case 'posts':
                return <Posts/>
            case 'gallery':
                return <div>Gallery Content</div>;
            case 'settings':
                return <div>Settings Content</div>;
            default:
                return <div>Select an item from the sidebar</div>;
        }
    };

    const getNavItemClasses = (item) => {
        return `p-4 cursor-pointer flex items-center ${selectedNavItem === item ? 'bg-yellow-50 text-black' : 'hover:bg-yellow-50 text-black'}`;
    };

    const getIconClasses = (item) => {
        return `material-symbols-outlined mr-3 ${selectedNavItem === item ? 'text-yellow-500' : 'text-gray-500'}`;
    };

    return (
        <div className="flex bg-gray-100 max-h-screen">
            <div className="w-80 h-screen bg-white shadow-lg overflow-y-auto pt-10">
                <div className="p-4 text-lg font-medium text-gray-800 bg-gray-100">MAIN NAVIGATION</div>
                <ul className="mt-2">
                    <li className={getNavItemClasses('dashboard')} onClick={() => handleNavItemClick('dashboard')}>
                        <span className={getIconClasses('dashboard')}>space_dashboard</span>
                        Dashboard
                    </li>
                    <li className={getNavItemClasses('sliders')} onClick={() => handleNavItemClick('sliders')}>
                        <span className={getIconClasses('sliders')}>auto_awesome_motion</span>
                        Sliders
                    </li>
                    <li className={getNavItemClasses('features')} onClick={() => handleNavItemClick('features')}>
                        <span className={getIconClasses('features')}>star</span>
                        Features
                    </li>
                    <li className={getNavItemClasses('material-rates')} onClick={() => handleNavItemClick('material-rates')}>
                        <span className={getIconClasses('material-rates')}>attach_money</span>
                        Material Rates
                    </li>
                    <li className={getNavItemClasses('memberships')} onClick={() => handleNavItemClick('memberships')}>
                        <span className={getIconClasses('memberships')}>card_membership</span>
                        Memberships
                    </li>
                    <li className={getNavItemClasses('customer-requests')} onClick={() => handleNavItemClick('customer-requests')}>
                        <span className={getIconClasses('customer-requests')}>request_page</span>
                        Customer Requests
                    </li>
                    <li className={getNavItemClasses('project-offers')} onClick={() => handleNavItemClick('project-offers')}>
                        <span className={getIconClasses('project-offers')}>tactic</span>
                        Project Offers
                    </li>
                    <li className={getNavItemClasses('project-queries')} onClick={() => handleNavItemClick('project-queries')}>
                        <span className={getIconClasses('project-queries')}>question_answer</span>
                        Project Queries
                    </li>
                    <li className={getNavItemClasses('customers')} onClick={() => handleNavItemClick('customers')}>
                        <span className={getIconClasses('customers')}>people</span>
                        Customers
                    </li>
                    <li className={getNavItemClasses('services')} onClick={() => handleNavItemClick('services')}>
                        <span className={getIconClasses('services')}>build</span>
                        Services
                    </li>
                    <li className={getNavItemClasses('testimonials')} onClick={() => handleNavItemClick('testimonials')}>
                        <span className={getIconClasses('testimonials')}>feedback</span>
                        Testimonials
                    </li>
                </ul>
                <div className="p-4 font-bold bg-gray-100 text-gray-700">Blog</div>
                <ul className="text-black">
                    <li className={getNavItemClasses('categories')} onClick={() => handleNavItemClick('categories')}>
                        <span className={getIconClasses('categories')}>category</span>
                        Categories
                    </li>
                    <li className={getNavItemClasses('tags')} onClick={() => handleNavItemClick('tags')}>
                        <span className={getIconClasses('tags')}>style</span>
                        Tags
                    </li>
                    <li className={getNavItemClasses('posts')} onClick={() => handleNavItemClick('posts')}>
                        <span className={getIconClasses('posts')}>post</span>
                        Posts
                    </li>
                </ul>
                <div className="p-4 font-bold bg-gray-100 text-gray-700">Gallery</div>
                <ul className="text-black">
                    <li className={getNavItemClasses('gallery')} onClick={() => handleNavItemClick('gallery')}>
                        <span className={getIconClasses('gallery')}>gallery_thumbnail</span>
                        Gallery
                    </li>
                    <li className={getNavItemClasses('settings')} onClick={() => handleNavItemClick('settings')}>
                        <span className={getIconClasses('settings')}>settings</span>
                        Settings
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
}

export default App;
