import Client from "./Client"
import Server from "./Server"

export default async function Page() {

    return (
        <div className="flex flex-col gap-y-6">
            <Server />
            <Client />
        </div>
    )
}
