
import Widjet from "./Widjet";


export default function Stats(){
    return(
        <div className="grid grid-cols-4 gap-x-4 py-5 ">
            <Widjet type="users"/>
            <Widjet type="order"/>
            <Widjet type="earning"/>
            <Widjet type="balance"/>
        </div>
    )
}