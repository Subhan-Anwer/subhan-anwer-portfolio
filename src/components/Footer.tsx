const Footer = () => {
    return (
        <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-300 font-light tracking-wide">
            <div className="max-w-[1200px] mx-auto px-4 group cursor-pointer">
                <p className="">
                    &copy; {new Date().getFullYear()}{' '}
                    <span className="relative inline-block font-medium">
                        Subhan Anwer
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
                    </span>
                    . All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
