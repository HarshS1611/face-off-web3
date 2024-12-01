

export default function Footer() {
    return (
        <div className="absolute border-2 w-full md:w-96 bottom-0">
            <div className="flex font-medium justify-around py-5">
                <a href="/">Home</a>
                <a href="/feed">Feed</a>
                <a href="/profile">Profile</a>
            </div>
        </div>
    )
}