

export default function MailSection(){
    return(
        <div className="py-20 bg-blue-900 text-white text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl font-bold pb-4">Save time, save money!</h1>
                <p className="pb-3">Sign up and we will send the best deals to you</p>
                <div className="flex justify-center space-x-4 items-stretch">
                    <input className="w-72 p-3" placeholder="Your Email"/>
                    <button className="px-2 py-1 bg-blue-600">Subscribe</button>
                </div>

            </div>
        </div>
    )
}