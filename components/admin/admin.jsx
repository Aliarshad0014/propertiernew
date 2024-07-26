"use client";
import Dashboard from '@/components/admin/dashboard';
import React, { useState } from 'react';
import Sliders from './sliders';
import Features from './features';


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
                return <Sliders/>
            case 'property':
                return <div>Property Content</div>;
            case 'features':
                return <Features/>
            case 'material-rates':
                return <div>Material Rates Content</div>;
            case 'memberships':
                return <div>Memberships Content</div>;
            case 'customer-requests':
                return <div>Customer Requests Content</div>;
            case 'project-offers':
                return <div>Project Offers Content</div>;
            case 'project-queries':
                return <div>Project Queries Content</div>;
            case 'customers':
                return <div>Customers Content</div>;
            case 'services':
                return <div>Services Content</div>;
            case 'packages':
                return <div>Packages Content</div>;
            case 'testimonials':
                return <div>Testimonials Content</div>;
            default:
                return <div>Select an item from the sidebar</div>;
        }
    };

    const getNavItemClasses = (item) => {
        return `p-4 cursor-pointer flex items-center ${
            selectedNavItem === item ? 'bg-yellow-50 text-black' : 'hover:bg-yellow-50 text-black'
        }`;
    };

    const getIconClasses = (item) => {
        return `material-symbols-outlined mr-2 ${
            selectedNavItem === item ? 'text-yellow-500' : 'text-gray-500'
        }`;
    };

    return (
        <div className="flex space-y-10 bg-gray-100 max-h-screen">
            
            <div className="w-80 h-screen bg-white shadow-lg overflow-y-auto pt-10">
                <div className="p-4 text-lg font-medium text-gray-800 bg-gray-100">MAIN NAVIGATION</div>
                <ul className="mt-2">
                    <li className={getNavItemClasses('dashboard')} onClick={() => handleNavItemClick('dashboard')}>
                        <span className={getIconClasses('dashboard')}>
                            space_dashboard
                        </span>
                        Dashboard
                    </li>
                    {/* Uncomment other items as needed */}
                    <li className={getNavItemClasses('sliders')} onClick={() => handleNavItemClick('sliders')}>
                        <span className={getIconClasses('sliders')}>
                            auto_awesome_motion
                        </span>
                        Sliders
                    </li>
                    <li className={getNavItemClasses('property')} onClick={() => handleNavItemClick('property')}>
                        <span className={getIconClasses('property')}>
                            home
                        </span>
                        Property
                    </li>
                    <li className={getNavItemClasses('features')} onClick={() => handleNavItemClick('features')}>
                        <span className={getIconClasses('features')}>
                            star
                        </span>
                        Features
                    </li>
                    <li className={getNavItemClasses('material-rates')} onClick={() => handleNavItemClick('material-rates')}>
                        <span className={getIconClasses('material-rates')}>
                            attach_money
                        </span>
                        Material Rates
                    </li>
                    <li className={getNavItemClasses('memberships')} onClick={() => handleNavItemClick('memberships')}>
                        <span className={getIconClasses('memberships')}>
                            card_membership
                        </span>
                        Memberships
                    </li>
                    <li className={getNavItemClasses('customer-requests')} onClick={() => handleNavItemClick('customer-requests')}>
                        <span className={getIconClasses('customer-requests')}>
                            request_page
                        </span>
                        Customer Requests
                    </li>
                    <li className={getNavItemClasses('project-offers')} onClick={() => handleNavItemClick('project-offers')}>
                        <span className={getIconClasses('project-offers')}>
                            tactic
                        </span>
                        Project Offers
                    </li>
                    <li className={getNavItemClasses('project-queries')} onClick={() => handleNavItemClick('project-queries')}>
                        <span className={getIconClasses('project-queries')}>
                            question_answer
                        </span>
                        Project Queries
                    </li>
                    <li className={getNavItemClasses('customers')} onClick={() => handleNavItemClick('customers')}>
                        <span className={getIconClasses('customers')}>
                            people
                        </span>
                        Customers
                    </li>
                    <li className={getNavItemClasses('services')} onClick={() => handleNavItemClick('services')}>
                        <span className={getIconClasses('services')}>
                            build
                        </span>
                        Services
                    </li>
                    <li className={getNavItemClasses('packages')} onClick={() => handleNavItemClick('packages')}>
                        <span className={getIconClasses('packages')}>
                            package
                        </span>
                        Packages
                    </li>
                    <li className={getNavItemClasses('testimonials')} onClick={() => handleNavItemClick('testimonials')}>
                        <span className={getIconClasses('testimonials')}>
                            feedback
                        </span>
                        Testimonials
                    </li>
                </ul>
                <div className="p-4 font-bold bg-gray-100 text-gray-700">Blog</div>
                <ul className="text-black">
                    <li className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleNavItemClick('categories')}>
                        Categories
                    </li>
                    <li className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleNavItemClick('tags')}>
                        Tags
                    </li>
                    <li className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleNavItemClick('posts')}>
                        Posts
                    </li>
                </ul>
                <div className="p-4 font-bold bg-gray-100 text-gray-700">Gallery</div>
                <ul className="text-black">
                    <li className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleNavItemClick('gallery')}>
                        Gallery
                    </li>
                    <li className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => handleNavItemClick('settings')}>
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
