

export default function Footer() {
    return (
        <div className="absolute border-2 w-full md:w-96 bottom-0">
            <div className="flex font-medium justify-around py-5">
                <a href="/p2p">P2P</a>
                <a href="/p2c">P2C</a>
                <a href="/profile">Profile</a>
            </div>
        </div>
    )
}