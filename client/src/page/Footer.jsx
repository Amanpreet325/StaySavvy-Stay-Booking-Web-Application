function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 px-4 mt-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">About StaySavvy</h2>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis tincidunt rhoncus.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Contact Us</h2>
                        <p className="text-gray-400">Email: contact@staysavvy.com</p>
                        <p className="text-gray-400">Phone: +123 456 7890</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                        <h2 className="text-xl mb-4">Follow Us</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'twitter']} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center">
                    <p className="text-gray-400">&copy; 2024 StaySavvy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
